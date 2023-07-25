import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { ethers, upgrades } from 'hardhat';
import { time, mine } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

describe('RewardPool', () => {
  let rewards: [string, BigNumber][];
  async function deployInitialStateFixture() {
    const [
      owner,
      distributor,
      addr2,
      addr3,
      addr4,
      addr5,
      addr6,
      addr7,
      addr8,
      addr9,
      treasury
    ] = await ethers.getSigners();
    const rewardPoolBalance = ethers.utils.parseEther('22446');
    rewards = [
      [await addr2.getAddress(), ethers.utils.parseEther(String(10.0))],
      [await addr3.getAddress(), ethers.utils.parseEther(String(12))],
      [await addr4.getAddress(), ethers.utils.parseEther(String(2))],
      [await addr5.getAddress(), ethers.utils.parseEther(String(1))],
      [await addr6.getAddress(), ethers.utils.parseEther(String(11.78))],
      [await addr7.getAddress(), ethers.utils.parseEther(String(10))],
      [await addr8.getAddress(), ethers.utils.parseEther(String(9))],
      [
        await addr9.getAddress(),
        ethers.utils.parseEther(String(57_000_000)) // this amount is used to test logic when the reward pool doesn't have sufficient funds
      ]
    ];
    const MerkleProofLib = await ethers.getContractFactory('MerkleProof');
    const merkleProofLib = await MerkleProofLib.deploy();
    await merkleProofLib.deployed();
    const Token = await ethers.getContractFactory('WeatherXM');
    const token = await Token.deploy('WeatherXM', 'WXM');
    await token.deployed();
    const RewardsVault = await ethers.getContractFactory('RewardsVault');
    const rewardsVault = await RewardsVault.deploy(
      token.address,
      owner.address
    );
    const RewardPool = await ethers.getContractFactory('RewardPool');
    const rewardPool = await upgrades.deployProxy(
      RewardPool,
      [token.address, rewardsVault.address, treasury.address],
      {
        initializer: 'initialize',
        kind: 'uups'
      }
    );
    await rewardPool.deployed();
    await rewardsVault.connect(owner).setRewardDistributor(rewardPool.address);
    await rewardPool
      .connect(owner)
      .grantRole(
        '0xfbd454f36a7e1a388bd6fc3ab10d434aa4578f811acbbcf33afb1c697486313c',
        await distributor.getAddress()
      );
    mine(2);
    mine(1);
    await token.transfer(
      rewardsVault.address,
      ethers.utils.parseEther(String(56_000_000))
    );
    return {
      rewards,
      rewardPool,
      owner,
      token,
      distributor,
      rewardPoolBalance,
      addr2,
      addr3,
      addr4,
      addr6,
      addr9
    };
  }
  afterEach(async () => {
    /* eslint-disable */
    const [
      owner,
      distributor,
      addr2,
      addr3,
      addr4,
      addr5,
      addr6,
      addr7,
      addr8,
      addr9
    ] = await ethers.getSigners();
    /* eslint-enable */

    rewards[0] = [
      await addr2.getAddress(),
      ethers.utils.parseEther(String(10.0))
    ];
  });
  describe('submitMerkleRoot', () => {
    it('should submit root hash starting from index 0', async () => {
      const { rewards, rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      mine(1);
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      const root = tree.root;
      const cycleNumber = await rewardPool.cycle();
      expect(cycleNumber.toNumber()).to.equal(0);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)));
      const txnGetRoot = await rewardPool.connect(distributor).roots(0);
      expect(txnGetRoot).to.equal(root);
    });

    it('should not allow more than 1 merkle roots to be submitted in the same day/cycle', async () => {
      const { rewards, rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      const root = tree.root;
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)));
      const updatedRewards = rewards.slice();
      updatedRewards[0][1] = ethers.utils.parseEther('20.0');
      const treeUpdated = StandardMerkleTree.of(updatedRewards, [
        'address',
        'uint256'
      ]);
      const updatedRoot = treeUpdated.root;
      const cycleNumber = await rewardPool.cycle();
      expect(cycleNumber.toNumber()).to.equal(1);
      await expect(
        rewardPool
          .connect(distributor)
          .submitMerkleRoot(
            updatedRoot,
            ethers.utils.parseEther(String(14_246))
          )
      ).to.be.revertedWithCustomError(
        rewardPool,
        'RewardsRateLimitingInEffect'
      );
    });

    it('should not allow a non-distributor to submit a merkle root', async () => {
      const { rewards, rewardPool, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      const root = tree.root;
      const distributorRole = await rewardPool.DISTRIBUTOR_ROLE();
      await expect(
        rewardPool
          .connect(addr2)
          .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)))
      ).to.be.revertedWith(
        `AccessControl: account ${addr2.address.toLocaleLowerCase()} is missing role ${distributorRole}`
      );
    });
  });

  describe('getRecipientRewardsBalance', () => {
    async function deployRewardsBalanceFixture() {
      const { rewards, rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const rewardee = rewards[0][0];
      const rewardee2 = rewards[1][0];
      const rewardAmount = rewards[0][1];
      let proof: string[] | undefined;
      let garbageProof: string[] | undefined;
      let updatedProof: string[] | undefined;
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      for (const [i, v] of tree.entries()) {
        if (v[0] === rewardee) {
          proof = tree.getProof(i);
        }
        if (v[0] === rewardee2) {
          garbageProof = tree.getProof(i);
        }
      }
      const root = tree.root;
      const rewardCumulativeAmount = ethers.utils.parseEther(String(10000));
      const rewardCycle = await rewardPool.cycle();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)));
      const updatedRewards = rewards.slice();
      const updatedRewardAmount = ethers.utils.parseEther(String(20));
      updatedRewards[0][1] = updatedRewardAmount;
      const updatedMerkleTree = StandardMerkleTree.of(updatedRewards, [
        'address',
        'uint256'
      ]);
      const updatedRoot = updatedMerkleTree.root;
      for (const [i, v] of updatedMerkleTree.entries()) {
        if (v[0] === rewardee) {
          updatedProof = updatedMerkleTree.getProof(i);
        }
      }
      return {
        rewardCycle,
        rewardee,
        rewardee2,
        rewardAmount,
        updatedRewardAmount,
        proof,
        garbageProof,
        rewardCumulativeAmount,
        updatedProof,
        updatedRoot
      };
    }

    it('should get own available rewards to claim in reward pool', async () => {
      const { rewardPool, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardCycle, rewardAmount, proof } = await loadFixture(
        deployRewardsBalanceFixture
      );
      const remainedTokens = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          rewardCycle,
          proof
        );
      expect(ethers.utils.formatUnits(String(remainedTokens), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
    });

    it('should get another rewardee available rewards in reward pool', async () => {
      const { rewardPool, addr3 } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardCycle, rewardAmount, proof } = await loadFixture(
        deployRewardsBalanceFixture
      );
      const remainedTokens = await rewardPool
        .connect(addr3)
        .getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          rewardCycle,
          proof
        );
      expect(ethers.utils.formatUnits(String(remainedTokens), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
    });

    it('should return 0 remaining tokens when garbage proof is used', async () => {
      const { rewardPool, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardCycle, rewardAmount, garbageProof } =
        await loadFixture(deployRewardsBalanceFixture);
      await expect(
        rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(
            rewardee,
            rewardAmount,
            rewardCycle,
            garbageProof
          )
      ).to.be.reverted;
    });

    it('should handle balance for proofs from different reward cycles', async () => {
      const { rewardPool, distributor, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const {
        rewardee,
        rewardCycle,
        rewardAmount,
        proof,
        updatedRoot,
        updatedProof,
        updatedRewardAmount
      } = await loadFixture(deployRewardsBalanceFixture);
      //rewardCycle = await rewardPool.cycle();
      time.increase(86401);
      //anyone can mint
      const rewardCycleUpdated = await rewardPool.cycle();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, ethers.utils.parseEther(String(14_246)));

      const remainedTokensUpdated =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          updatedRewardAmount,
          rewardCycleUpdated,
          updatedProof
        );
      expect(
        ethers.utils.formatUnits(String(remainedTokensUpdated), 'wei')
      ).to.equal(ethers.utils.formatUnits(String(updatedRewardAmount), 'wei'));
      const remainedTokens = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          rewardCycle,
          proof
        );
      expect(ethers.utils.formatUnits(String(remainedTokens), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
    });

    it('should not be able to get remaining amount when cumulative amount is 0 rewards in the tree', async () => {
      const { rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { updatedRoot, updatedProof } = await loadFixture(
        deployRewardsBalanceFixture
      );
      //rewardCycle = await rewardPool.cycle();
      time.increase(86401);
      const rewardCycleUpdated = await rewardPool.cycle();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, ethers.utils.parseEther(String(14_246)));
      await expect(
        rewardPool
          .connect(distributor)
          .getRemainingAllocatedRewards(
            await distributor.getAddress(),
            0,
            rewardCycleUpdated,
            updatedProof
          )
      ).to.be.reverted;
    });
  });

  describe('claim', () => {
    async function deployClaimFixture() {
      const { rewards, rewardPool, token, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const rewardee = rewards[0][0];
      const rewardee2 = rewards[1][0];
      const rewardAmount = rewards[0][1];
      let proof: string[] | undefined;
      let proof7: string[] | undefined;
      let garbageProof: string[] | undefined;
      let updatedProof: string[] | undefined;
      let decimalRewardsProof: string[] | undefined;
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      for (const [i, v] of tree.entries()) {
        if (v[0] === rewardee) {
          proof = tree.getProof(i);
        }
        if (v[0] === rewardee2) {
          garbageProof = tree.getProof(i);
        }
      }
      const root = tree.root;
      time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)));
      const insufficientFundsRewardee = rewards[7][0];
      const insufficientFundsRewardAmount = rewards[7][1];
      for (const [i, v] of tree.entries()) {
        if (v[0] === insufficientFundsRewardee) {
          proof7 = tree.getProof(i);
        }
      }
      for (const [i, v] of tree.entries()) {
        if (v[0] === rewards[4][0]) {
          decimalRewardsProof = tree.getProof(i);
        }
      }
      const rewardPoolBalance = await token.balanceOf(rewardPool.address);

      return {
        rewardee,
        rewardAmount,
        rewardPoolBalance,
        proof,
        proof7,
        garbageProof,
        updatedProof,
        decimalRewardsProof,
        insufficientFundsRewardee,
        insufficientFundsRewardAmount
      };
    }

    it('should claim up to their allotted amount from pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const remainedTokens = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(
        await ethers.utils.formatUnits(String(remainedTokens), 'wei')
      ).to.equal(await ethers.utils.formatUnits(String(rewardAmount), 'wei'));

      const balanceOfRewardPool = await token.balanceOf(rewardPool.address);
      expect(
        await ethers.utils.formatUnits(String(balanceOfRewardPool), 'wei')
      ).to.equal(
        await ethers.utils.formatUnits(
          String(ethers.utils.parseEther(String(14_246))),
          'wei'
        )
      );
      await rewardPool
        .connect(addr2)
        .requestClaim(rewardAmount, rewardAmount, 0, proof);
      time.increase(1801);
      expect(await rewardPool.connect(addr2).claim())
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, rewardAmount);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(ethers.utils.formatUnits(String(rewardeeBalance), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
      expect(ethers.utils.formatUnits(String(claims), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
      expect(
        ethers.utils.formatUnits(String(proofBalanceAfterClaim), 'wei')
      ).to.equal(ethers.utils.formatUnits(String(0), 'wei'));
    });

    it('should make a claim less than their allotted amount from the pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const withdrawalAmount = ethers.utils.parseEther(String(8));
      // substraction of numbers in WEI should not result to a number with decimals
      // when this happens, substraction is made between Integers and then transform to WEI
      const remainingRewardPoolBalance = ethers.utils.parseEther(
        String(14_246 - 8)
      );
      await rewardPool
        .connect(addr2)
        .requestClaim(withdrawalAmount, rewardAmount, 0, proof);
      time.increase(1801);
      await expect(rewardPool.connect(addr2).claim())
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, withdrawalAmount);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      await rewardPool.getRemainingAllocatedRewards(
        rewardee,
        rewardAmount,
        0,
        proof
      );
      expect(rewardeeBalance).to.be.equal(withdrawalAmount);
      expect(claims).to.be.equal(withdrawalAmount);
      expect(poolBalance).to.be.equal(remainingRewardPoolBalance);
    });

    it('should make multiple claims within his allotted amount from the pool', async () => {
      const { rewards, rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const withdrawalAmount = rewards[0][1];
      await rewardPool
        .connect(addr2)
        .requestClaim(
          ethers.utils.parseEther(String(4)),
          rewardAmount,
          0,
          proof
        );
      time.increase(1801);
      await rewardPool.connect(addr2).claim();
      await rewardPool
        .connect(addr2)
        .requestClaim(
          ethers.utils.parseEther(String(6)),
          rewardAmount,
          0,
          proof
        );
      time.increase(1801);
      await rewardPool.connect(addr2).claim();
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaims =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          proof
        );
      expect(rewardeeBalance).to.be.equal(rewardAmount);

      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(
          String(14_246 - Number(ethers.utils.formatEther(rewardAmount)))
        )
      );
      expect(claims).to.be.equal(withdrawalAmount);
      expect(proofBalanceAfterClaims).to.be.equal(0);
    });

    it('should not be able to claim more than their allotted amount from the pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardPoolBalance, rewardAmount, proof } =
        await loadFixture(deployClaimFixture);
      const withdrawalAmount = ethers.utils.parseEther(String(11));
      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(withdrawalAmount, rewardAmount, 0, proof)
      ).to.be.revertedWithCustomError(
        rewardPool,
        'AmountIsOverAvailableRewardsToClaim'
      );
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          proof
        );
      expect(ethers.utils.formatUnits(String(poolBalance), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardPoolBalance), 'wei')
      );
      expect(rewardeeBalance).to.be.equal(0);
      expect(poolBalance).to.be.equal(rewardPoolBalance);
      expect(claims).to.be.equal(0);
      expect(proofBalanceAfterClaim).to.be.equal(rewardAmount);
    });

    it('should not claim using a proof whose metadata has been tampered with', async () => {
      const { rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardPoolBalance, rewardAmount, proof, garbageProof } =
        await loadFixture(deployClaimFixture);
      const withdrawalAmount = ethers.utils.parseEther(String(11));
      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(withdrawalAmount, rewardAmount, 0, garbageProof)
      ).to.be.revertedWith('INVALID PROOF');
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          proof
        );
      await expect(
        rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, garbageProof)
      ).to.be.revertedWith('INVALID PROOF');
      expect(rewardeeBalance).to.be.equal(0);
      expect(poolBalance).to.be.equal(rewardPoolBalance);
      expect(claims).to.be.equal(0);
      expect(proofBalanceAfterClaim).to.be.equal(rewardAmount);
    });

    it('should not be able to make multiple claims that total to more than their allotted amount from the pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardAmount, proof, garbageProof } = await loadFixture(
        deployClaimFixture
      );
      const withdrawalAmount = ethers.utils.parseEther(String(4));
      await rewardPool
        .connect(addr2)
        .requestClaim(withdrawalAmount, rewardAmount, 0, proof);
      time.increase(1801);
      await rewardPool.connect(addr2).claim();

      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(
            ethers.utils.parseEther(String(7)),
            rewardAmount,
            0,
            garbageProof
          )
      ).to.be.revertedWith('INVALID PROOF');
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          proof
        );
      expect(rewardeeBalance).to.be.equal(withdrawalAmount);
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(
          String(14_246 - Number(ethers.utils.formatEther(withdrawalAmount)))
        )
      );
      expect(claims).to.be.equal(withdrawalAmount);
      expect(proofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(6))
      );
    });

    it('should not claim 0 tokens from reward pool', async () => {
      const { rewardPool, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardAmount, garbageProof } = await loadFixture(
        deployClaimFixture
      );
      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(
            ethers.utils.parseEther(String(0)),
            rewardAmount,
            0,
            garbageProof
          )
      ).to.be.revertedWithCustomError(rewardPool, 'AmountRequestedIsZero');
    });

    it('should not claim rewards from the pool if not in tree', async () => {
      const { rewardPool, owner } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardAmount, garbageProof } = await loadFixture(
        deployClaimFixture
      );
      await expect(
        rewardPool
          .connect(owner)
          .requestClaim(
            ethers.utils.parseEther(String(10)),
            rewardAmount,
            0,
            garbageProof
          )
      ).to.be.revertedWith('INVALID PROOF');
    });

    it('should not claim their allotted tokens from the pool when the pool does not have enough tokens', async () => {
      const { rewardPool, addr9, token } = await loadFixture(
        deployInitialStateFixture
      );
      const {
        rewardPoolBalance,
        proof7,
        insufficientFundsRewardAmount,
        insufficientFundsRewardee
      } = await loadFixture(deployClaimFixture);
      await rewardPool
        .connect(addr9)
        .requestClaim(
          insufficientFundsRewardAmount,
          insufficientFundsRewardAmount,
          0,
          proof7
        );
      time.increase(1801);
      await expect(rewardPool.connect(addr9).claim()).to.be.reverted;
      const rewardeeBalance = await token.balanceOf(insufficientFundsRewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(insufficientFundsRewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          insufficientFundsRewardee,
          insufficientFundsRewardAmount,
          0,
          proof7
        );
      expect(rewardeeBalance).to.be.equal(0);
      expect(poolBalance).to.be.equal(rewardPoolBalance);
      expect(claims).to.be.equal(0);
      expect(proofBalanceAfterClaim).to.be.equal(insufficientFundsRewardAmount);
    });

    it('should claim allotted amount from both an older and new proof', async () => {
      const { rewards, rewardPool, distributor, token, addr2 } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      let updatedProof: string[] | undefined;
      const updatedRewards = rewards.slice();
      const updatedRewardAmount = ethers.utils.parseEther(String(20));
      updatedRewards[0][1] = updatedRewardAmount;
      const updatedMerkleTree = StandardMerkleTree.of(updatedRewards, [
        'address',
        'uint256'
      ]);
      const updatedRoot = updatedMerkleTree.root;
      for (const [i, v] of updatedMerkleTree.entries()) {
        if (v[0] === rewardee) {
          updatedProof = updatedMerkleTree.getProof(i);
        }
      }
      time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, ethers.utils.parseEther(String(14_246)));
      const withdrawalAmount = ethers.utils.parseEther(String(20));
      await rewardPool
        .connect(addr2)
        .requestClaim(
          ethers.utils.parseEther(String(8)),
          rewardAmount,
          0,
          proof
        );
      time.increase(1801);
      await rewardPool.connect(addr2).claim();
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          proof
        );
      const updatedProofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          updatedRewardAmount,
          1,
          updatedProof
        );
      expect(proofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(2))
      );
      expect(updatedProofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(12))
      );
      await rewardPool
        .connect(addr2)
        .requestClaim(
          ethers.utils.parseEther(String(12)),
          updatedRewardAmount,
          1,
          updatedProof
        );
      time.increase(1801);
      await rewardPool.connect(addr2).claim();

      const updatedProofBalanceAfterBothClaims = await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          updatedRewardAmount,
          1,
          updatedProof
        );
      expect(updatedProofBalanceAfterBothClaims).to.be.equal(
        ethers.utils.parseEther(String(0))
      );
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      expect(rewardeeBalance).to.be.equal(withdrawalAmount);
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(String(14_246 * 2 - 20))
      );
      expect(claims).to.be.equal(withdrawalAmount);
    });

    it("should not allow a rewardee to exceed their provided proof's allotted amount when withdrawing from an older proof and a newer proof", async () => {
      const { rewards, rewardPool, distributor, token, addr2 } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      let updatedProof: string[] | undefined;
      const updatedRewards = rewards.slice();
      const updatedRewardAmount = ethers.utils.parseEther(String(20));
      updatedRewards[0][1] = updatedRewardAmount;
      const updatedMerkleTree = StandardMerkleTree.of(updatedRewards, [
        'address',
        'uint256'
      ]);
      const updatedRoot = updatedMerkleTree.root;
      for (const [i, v] of updatedMerkleTree.entries()) {
        if (v[0] === rewardee) {
          updatedProof = updatedMerkleTree.getProof(i);
        }
      }
      time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, ethers.utils.parseEther(String(14_246)));
      await rewardPool
        .connect(addr2)
        .requestClaim(
          ethers.utils.parseEther(String(8)),
          updatedRewardAmount,
          1,
          updatedProof
        );
      time.increase(1801);
      await rewardPool.connect(addr2).claim();
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          proof
        );
      const udpatedProofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          updatedRewardAmount,
          1,
          updatedProof
        );
      expect(proofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(2))
      );
      expect(udpatedProofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(12))
      );
      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(
            ethers.utils.parseEther(String(12)),
            rewardAmount,
            0,
            proof
          )
      ).to.be.revertedWithCustomError(
        rewardPool,
        'AmountIsOverAvailableRewardsToClaim'
      )
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      expect(rewardeeBalance).to.be.equal(ethers.utils.parseEther(String(8)));
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(String(14_246 * 2 - 8))
      );
      expect(claims).to.be.equal(ethers.utils.parseEther(String(8)));
      expect(proofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(2))
      );
      expect(udpatedProofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(12))
      );
    });

    it('should claim up to their allotted amount from pool (working with decimals)', async () => {
      const { rewards, rewardPool, token, addr6 } = await loadFixture(
        deployInitialStateFixture
      );
      const { decimalRewardsProof } = await loadFixture(deployClaimFixture);
      const rewardee = rewards[4][0];
      const rewardAmount = rewards[4][1];
      const remainedTokens = await rewardPool.getRemainingAllocatedRewards(
        rewardee,
        rewardAmount,
        0,
        decimalRewardsProof
      );
      expect(remainedTokens).to.be.equal(rewardAmount);
      const balanceOfRewardPool = await token.balanceOf(rewardPool.address);
      expect(balanceOfRewardPool).to.be.equal(
        ethers.utils.parseEther(String(14_246))
      );
      await rewardPool
        .connect(addr6)
        .requestClaim(rewardAmount, rewardAmount, 0, decimalRewardsProof);
      time.increase(1801);
      await expect(rewardPool.connect(addr6).claim())
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, rewardAmount);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          0,
          decimalRewardsProof
        );

      expect(rewardeeBalance).to.be.equal(rewardAmount);
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(String(14_246 - 11.78))
      );
      expect(claims).to.be.equal(rewardAmount);
      expect(proofBalanceAfterClaim).to.be.equal(0);
    });

    it('should revert if total rewards are 0', async () => {
      const { rewardPool, addr2, token } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const remainedTokens = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(
        await ethers.utils.formatUnits(String(remainedTokens), 'wei')
      ).to.equal(await ethers.utils.formatUnits(String(rewardAmount), 'wei'));

      const balanceOfRewardPool = await token.balanceOf(rewardPool.address);
      expect(
        await ethers.utils.formatUnits(String(balanceOfRewardPool), 'wei')
      ).to.equal(
        await ethers.utils.formatUnits(
          String(ethers.utils.parseEther(String(14_246))),
          'wei'
        )
      );
      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(rewardAmount, 0, 0, proof)
      ).to.be.revertedWithCustomError(rewardPool, 'TotalRewardsAreZero')
    });

    it('should revert if the reward pool is paused', async () => {
      const { rewardPool, addr2, token, owner } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const remainedTokens = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(
        await ethers.utils.formatUnits(String(remainedTokens), 'wei')
      ).to.equal(await ethers.utils.formatUnits(String(rewardAmount), 'wei'));

      const balanceOfRewardPool = await token.balanceOf(rewardPool.address);
      expect(
        await ethers.utils.formatUnits(String(balanceOfRewardPool), 'wei')
      ).to.equal(
        await ethers.utils.formatUnits(
          String(ethers.utils.parseEther(String(14_246))),
          'wei'
        )
      );

      await rewardPool.connect(owner).pause();

      await expect(
        rewardPool
          .connect(addr2)
          .requestClaim(rewardAmount, rewardAmount, 0, proof)
      ).to.be.revertedWith('Pausable: paused');

      await rewardPool.connect(owner).unpause();


      await rewardPool
        .connect(addr2)
        .requestClaim(rewardAmount, rewardAmount, 0, proof);
      time.increase(1801);
      await rewardPool.connect(addr2).claim();

      const rewardeeBalance = await token.balanceOf(rewardee);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(ethers.utils.formatUnits(String(rewardeeBalance), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
      expect(ethers.utils.formatUnits(String(claims), 'wei')).to.equal(
        ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );
      expect(
        ethers.utils.formatUnits(String(proofBalanceAfterClaim), 'wei')
      ).to.equal(ethers.utils.formatUnits(String(0), 'wei'));
    });
  });

  describe('transfer rewards', () => {
    async function deployTransferRewardsState() {
      const { rewards, rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const rewardee = rewards[0][0];
      let proof: string[] | undefined;
      const rewardAmount = rewards[0][1];
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      for (const [i, v] of tree.entries()) {
        if (v[0] === rewardee) {
          proof = tree.getProof(i);
        }
      }
      const root = tree.root;
      time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)));
      return { rewardee, proof, rewardAmount };
    }

    it('should enable admin to transfer tokens to an address', async () => {
      const { rewardPool, token, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      await rewardPool
        .connect(distributor)
        .transferRewards(rewardee, rewardAmount, rewardAmount, 0, proof);
      const rewardeeBalance = await token.balanceOf(rewardee);
      expect(rewardeeBalance).to.be.equal(rewardAmount);
    });

    it('should not transfer tokens to an address if not its proof', async () => {
      const { rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewards[1][0], rewardAmount, rewardAmount, 0, proof)
      ).to.be.reverted;
    });

    it('should not transfer more tokens than available', async () => {
      const { rewardPool, token, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      const withdrawalAmount = ethers.utils.parseEther(String(100000));
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewardee, withdrawalAmount, rewardAmount, 0, proof)
      ).to.be.revertedWithCustomError(
        rewardPool,
        'AmountIsOverAvailableRewardsToClaim'
      );
      const balance = await token.balanceOf(rewardee);
      expect(balance).to.be.equal(0);
    });

    it('distributor cannot transfer 0 rewards from pool', async () => {
      const { rewardPool, token, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      const withdrawalAmount = 0;
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewardee, withdrawalAmount, rewardAmount, 0, proof)
      ).to.be.revertedWithCustomError(rewardPool, 'AmountRequestedIsZero');
      const balance = await token.balanceOf(rewardee);
      expect(balance).to.be.equal(0);
    });

    it('should not transfer tokens from pool if not admin', async () => {
      const { rewardPool, token, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      const withdrawalAmount = ethers.utils.parseEther(String(10));
      await expect(
        rewardPool
          .connect(addr2)
          .transferRewards(rewardee, withdrawalAmount, rewardAmount, 0, proof)
      ).to.be.reverted;
      const balance = await token.balanceOf(rewardee);
      expect(balance).to.be.equal(0);
    });

    it('should revert if to address is 0', async () => {
      const { rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(
            ethers.constants.AddressZero,
            rewardAmount,
            rewardAmount,
            0,
            proof
          )
      ).to.be.revertedWithCustomError(rewardPool, 'TargetAddressIsZero');
    });

    it('should revert if to address is rewardPool address', async () => {
      const { rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(
            rewardPool.address,
            rewardAmount,
            rewardAmount,
            0,
            proof
          )
      ).to.be.revertedWithCustomError(
        rewardPool,
        'TargetAddressIsContractAddress'
      );
    });

    it('should revert if total total rewards are 0', async () => {
      const { rewardPool, distributor } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewardee, rewardAmount, 0, 0, proof)
      ).to.be.revertedWithCustomError(rewardPool, 'TotalRewardsAreZero');
    });

    it('should revert if the rewardPool is paused', async () => {
      const { rewardPool, distributor, owner, token, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      const { rewardee, proof, rewardAmount } = await loadFixture(
        deployTransferRewardsState
      );

      await rewardPool
        .connect(addr2)
        .requestClaim(rewardAmount, rewardAmount, 0, proof);

      const latestRequestedClaims = await rewardPool.latestRequestedClaims(addr2.address);

      expect(latestRequestedClaims.amount).to.be.equal(rewardAmount);
      await rewardPool.connect(owner).pause();

      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewardee, rewardAmount, 0, 0, proof)
      ).to.be.revertedWith('Pausable: paused');

      await rewardPool.connect(owner).unpause();

      await rewardPool
        .connect(distributor)
        .transferRewards(rewardee, rewardAmount, rewardAmount, 0, proof);
      const rewardeeBalance = await token.balanceOf(rewardee);
      expect(rewardeeBalance).to.be.equal(rewardAmount);

      const latestRequestedClaimsAfterTransferRewards = await rewardPool.latestRequestedClaims(addr2.address);
      expect(latestRequestedClaimsAfterTransferRewards.amount).to.be.equal('0');
      await expect(rewardPool.connect(addr2).claim())
        .to.be.revertedWithCustomError(rewardPool, 'NoRequestClaim');
    });
  });

  describe('testing pausability', () => {
    it('should pause rewardpool', async () => {
      const { rewardPool, owner } = await loadFixture(deployInitialStateFixture);

      await rewardPool.connect(owner).pause();

      const isPaused = await rewardPool.paused();

      expect(isPaused).to.be.true;
    });

    it('should unpause rewardpool', async () => {
      const { rewardPool, owner } = await loadFixture(
        deployInitialStateFixture
      );

      await rewardPool.connect(owner).pause();

      const isPaused = await rewardPool.paused();

      expect(isPaused).to.be.true;

      await rewardPool.connect(owner).unpause();

      const isPausedAfterUnpause = await rewardPool.paused();

      expect(isPausedAfterUnpause).to.be.false;
    });
  });
  describe('testing upgradeability', () => {
    it('should upgrade rewardpool to rewardpoolV2', async () => {
      const { rewardPool } = await loadFixture(deployInitialStateFixture);
      mine(1);
      const RewardpoolV2 = await ethers.getContractFactory('RewardPoolV2');
      const rewardPoolV2 = await upgrades.upgradeProxy(
        rewardPool.address,
        RewardpoolV2
      );
      const version = await rewardPoolV2.version();
      expect(version).to.be.equal('V2');
    });
    it('should access variables from rewardpool after upgrading to rewardpoolV2', async () => {
      const { rewardPool } = await loadFixture(deployInitialStateFixture);
      mine(1);
      const RewardpoolV2 = await ethers.getContractFactory('RewardPoolV2');
      const rewardPoolV2 = await upgrades.upgradeProxy(
        rewardPool.address,
        RewardpoolV2
      );
      const distributorRole = await rewardPoolV2.DISTRIBUTOR_ROLE();
      expect(distributorRole).to.be.equal(
        '0xfbd454f36a7e1a388bd6fc3ab10d434aa4578f811acbbcf33afb1c697486313c'
      );
    });
  });
});
