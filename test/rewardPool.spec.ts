import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { ethers, upgrades } from 'hardhat';
import { time, mine } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

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
      addr9
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
        ethers.utils.parseEther(String(101000)) // this amount is used to test logic when the reward pool doesn't have sufficient funds
      ]
    ];

    const MerkleProofLib = await ethers.getContractFactory('MerkleProof');
    const merkleProofLib = await MerkleProofLib.deploy();
    await merkleProofLib.deployed();
    const Token = await ethers.getContractFactory('WeatherXM');
    const WeatherXMMintingManager = await ethers.getContractFactory('WeatherXMMintingManager');
    const mintingManager = await WeatherXMMintingManager.deploy()
    const token = await Token.deploy('WeatherXM', 'WXM', mintingManager.address);
    await token.deployed();
    await mintingManager.setToken(token.address);
    const RewardPool = await ethers.getContractFactory('RewardPool');
    const rewardPool = await upgrades.deployProxy(
      RewardPool,
      [token.address, mintingManager.address],
      {
        initializer: 'initialize',
        kind: 'uups'
      }
    );
    await rewardPool.deployed();
    await rewardPool
      .connect(owner)
      .grantRole(
        '0xfbd454f36a7e1a388bd6fc3ab10d434aa4578f811acbbcf33afb1c697486313c',
        await distributor.getAddress()
      );
    mine(2);
    await mintingManager.connect(owner).setMintTarget(rewardPool.address);
    await mintingManager.connect(distributor).mintDaily();
    mine(1);
    return { rewards, rewardPool, owner, token, mintingManager, distributor, rewardPoolBalance, addr2, addr3, addr4, addr6, addr9}
  }
  afterEach(async() => {
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
    rewards[0] = [await addr2.getAddress(), ethers.utils.parseEther(String(10.0))]
  })
  describe('submitMerkleRoot', () => {
    const rewardAmount = ethers.utils.parseEther('10000');
    it('should submit root hash in the cycle already set by minting', async () => {
      const { rewards, rewardPool, distributor, mintingManager } = await loadFixture(deployInitialStateFixture);
      mine(1);
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      const root = tree.root;
      const cycleNumber = await mintingManager.getCycle();
      expect(cycleNumber.toNumber()).to.equal(1);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, rewardAmount);
      const txnGetRoot = await rewardPool.connect(distributor).roots(1);
      expect(txnGetRoot).to.equal(root);
    });

    it('should not allow 2 merkle roots to be submitted in the same day/cycle', async () => {
      const { rewards, rewardPool, distributor, mintingManager } = await loadFixture(deployInitialStateFixture);
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      const root = tree.root;
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, rewardAmount);
      const updatedRewards = rewards.slice();
      updatedRewards[0][1] = ethers.utils.parseEther('20.0');
      const treeUpdated = StandardMerkleTree.of(updatedRewards, [
        'address',
        'uint256'
      ]);
      const updatedRoot = treeUpdated.root;
      const cycleNumber = await mintingManager.getCycle();
      expect(cycleNumber.toNumber()).to.equal(1);
      await expect(
        rewardPool
          .connect(distributor)
          .submitMerkleRoot(updatedRoot, ethers.utils.parseEther('1000.0'))
      ).to.be.reverted;
    });

    it('should not allow a non-distributor to submit a merkle root', async () => {
      const { rewards, rewardPool, addr2 } = await loadFixture(deployInitialStateFixture);
      const tree = StandardMerkleTree.of(rewards, ['address', 'uint256']);
      const root = tree.root;
      await expect(
        rewardPool.connect(addr2).submitMerkleRoot(root, rewardAmount)
      ).to.be.reverted;
    });
  });

  describe('getRecipientRewardsBalance', () => {
    async function deployRewardsBalanceFixture() {
      const { rewards, rewardPool, mintingManager, distributor } = await loadFixture(deployInitialStateFixture);
      const rewardee = rewards[0][0];
      const rewardee2 = rewards[1][0];
      const rewardAmount = rewards[0][1];
      let proof: string[]|undefined;
      let garbageProof: string[]|undefined;
      let updatedProof: string[]|undefined;
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
      const rewardCycle = await mintingManager.getCycle();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, rewardCumulativeAmount);
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
      return{
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
          }
    }

    it('should get own available rewards to claim in reward pool', async () => {
      const { rewardPool, addr2 } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardCycle, rewardAmount, proof } = await loadFixture(deployRewardsBalanceFixture)
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
      const { rewardPool, addr3 } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardCycle, rewardAmount, proof } = await loadFixture(deployRewardsBalanceFixture)
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
      const { rewardPool, addr2 } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardCycle, rewardAmount, garbageProof } = await loadFixture(deployRewardsBalanceFixture)
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
      const { rewardPool, distributor, addr2, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardCycle, rewardAmount, proof, updatedRoot, updatedProof, rewardCumulativeAmount, updatedRewardAmount } = await loadFixture(deployRewardsBalanceFixture)
      //rewardCycle = await mintingManager.getCycle();
      time.increase(86401);
      //anyone can mint
      await mintingManager.connect(addr2).mintDaily();
      const rewardCycleUpdated = await mintingManager.getCycle();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, rewardCumulativeAmount);

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
      const { rewardPool, distributor, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { updatedRoot, updatedProof, rewardCumulativeAmount } = await loadFixture(deployRewardsBalanceFixture)
      //rewardCycle = await mintingManager.getCycle();
      time.increase(86401);
      await mintingManager.connect(distributor).mintDaily();
      const rewardCycleUpdated = await mintingManager.getCycle();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, rewardCumulativeAmount);
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
      const { rewards, rewardPool, token, distributor } = await loadFixture(deployInitialStateFixture);
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
      const rewardCumulativeAmount = ethers.utils.parseEther(String(10000));
      time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, rewardCumulativeAmount);
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
        rewardCumulativeAmount,
        proof, 
        proof7, 
        garbageProof, 
        updatedProof, 
        decimalRewardsProof, 
        insufficientFundsRewardee, 
        insufficientFundsRewardAmount 
      }
    }

    it('should claim up to their allotted amount from pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const remainedTokens = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 1, proof);
      expect(await ethers.utils.formatUnits(String(remainedTokens), 'wei')).to.equal(
        await ethers.utils.formatUnits(String(rewardAmount), 'wei')
      );

      const balanceOfRewardPool = await token.balanceOf(rewardPool.address);
      expect(
        await ethers.utils.formatUnits(String(balanceOfRewardPool), 'wei')
      ).to.equal(
        await ethers.utils.formatUnits(
          String(ethers.utils.parseEther(String(22446))),
          'wei'
        )
      );
      expect(
        await rewardPool.connect(addr2).claim(rewardAmount, rewardAmount, 1, proof)
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, rewardAmount);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 1, proof);
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
      const { rewardPool, addr2, token } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const withdrawalAmount = ethers.utils.parseEther(String(8));
      // substraction of numbers in WEI should not result to a number with decimals
      // when this happens, substraction is made between Integers and then transform to WEI
      const remainingRewardPoolBalance = ethers.utils.parseEther(
        String(22446 - 8)
      );
      await expect(
        rewardPool
          .connect(addr2)
          .claim(withdrawalAmount, rewardAmount, 1, proof)
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, withdrawalAmount);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      await rewardPool.getRemainingAllocatedRewards(
        rewardee,
        rewardAmount,
        1,
        proof
      );
      expect(rewardeeBalance).to.be.equal(withdrawalAmount);
      expect(claims).to.be.equal(withdrawalAmount);
      expect(poolBalance).to.be.equal(remainingRewardPoolBalance);
    });

    it('should make mulitple claims within his allotted amount from the pool', async () => {
      const { rewards, rewardPool, addr2, token } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const withdrawalAmount = rewards[0][1];
      await rewardPool
        .connect(addr2)
        .claim(ethers.utils.parseEther(String(4)), rewardAmount, 1, proof);
      await rewardPool
        .connect(addr2)
        .claim(ethers.utils.parseEther(String(6)), rewardAmount, 1, proof);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaims =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
          proof
        );
      expect(rewardeeBalance).to.be.equal(rewardAmount);
      expect(poolBalance).to.be.equal(ethers.utils.parseEther(String(22436)));
      expect(claims).to.be.equal(withdrawalAmount);
      expect(proofBalanceAfterClaims).to.be.equal(0);
    });

    it('should not be able to claim more than their allotted amount from the pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardPoolBalance, rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const withdrawalAmount = ethers.utils.parseEther(String(11));
      await expect(
        rewardPool
          .connect(addr2)
          .claim(withdrawalAmount, rewardAmount, 1, proof)
      ).to.be.revertedWithCustomError(rewardPool, "AmountIsOverAvailableRewardsToWithdraw");
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
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
      const { rewardPool, addr2, token } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardPoolBalance, rewardAmount, proof, garbageProof } = await loadFixture(deployClaimFixture);
      const withdrawalAmount = ethers.utils.parseEther(String(11));
      await expect(
        rewardPool
          .connect(addr2)
          .claim(withdrawalAmount, rewardAmount, 1, garbageProof)
      ).to.be.reverted;
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
          proof
        );
      await expect(
        rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(rewardee, rewardAmount, 1, garbageProof)
      ).to.be.reverted;
      expect(rewardeeBalance).to.be.equal(0);
      expect(poolBalance).to.be.equal(rewardPoolBalance);
      expect(claims).to.be.equal(0);
      expect(proofBalanceAfterClaim).to.be.equal(rewardAmount);
    });

    it('should not be able to make mulitple claims that total to more than their allotted amount from the pool', async () => {
      const { rewardPool, addr2, token } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardPoolBalance, rewardAmount, proof, garbageProof } = await loadFixture(deployClaimFixture);
      const withdrawalAmount = ethers.utils.parseEther(String(4));
      await rewardPool
        .connect(addr2)
        .claim(withdrawalAmount, rewardAmount, 1, proof);
      await expect(
        rewardPool
          .connect(addr2)
          .claim(
            ethers.utils.parseEther(String(7)),
            rewardAmount,
            1,
            garbageProof
          )
      ).to.be.reverted;
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
          proof
        );
      expect(rewardeeBalance).to.be.equal(withdrawalAmount);
      expect(poolBalance).to.be.equal(ethers.utils.parseEther(String(22442)));
      expect(claims).to.be.equal(withdrawalAmount);
      expect(proofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(6))
      );
    });

    it('should not claim 0 tokens from reward pool', async () => {
      const { rewardPool, addr2 } = await loadFixture(deployInitialStateFixture);
      const { rewardAmount, garbageProof } = await loadFixture(deployClaimFixture);
      await expect(
        rewardPool
          .connect(addr2)
          .claim(
            ethers.utils.parseEther(String(0)),
            rewardAmount,
            1,
            garbageProof
          )
      ).to.be.reverted;
    });

    it('should not claim rewards from the pool if not in tree', async () => {
      const { rewardPool, owner } = await loadFixture(deployInitialStateFixture);
      const { rewardAmount, garbageProof } = await loadFixture(deployClaimFixture);
      await expect(
        rewardPool
          .connect(owner)
          .claim(
            ethers.utils.parseEther(String(10)),
            rewardAmount,
            1,
            garbageProof
          )
      ).to.be.reverted;
    });

    it('should not claim their allotted tokens from the pool when the pool does not have enough tokens', async () => {
      const { rewardPool, addr9, token } = await loadFixture(deployInitialStateFixture);
      const { rewardPoolBalance, proof7, insufficientFundsRewardAmount, insufficientFundsRewardee } = await loadFixture(deployClaimFixture);
      await expect(
        rewardPool
          .connect(addr9)
          .claim(
            insufficientFundsRewardAmount,
            insufficientFundsRewardAmount,
            1,
            proof7
          )
      ).to.be.reverted;
      const rewardeeBalance = await token.balanceOf(insufficientFundsRewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(insufficientFundsRewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          insufficientFundsRewardee,
          insufficientFundsRewardAmount,
          1,
          proof7
        );
      expect(rewardeeBalance).to.be.equal(0);
      expect(poolBalance).to.be.equal(rewardPoolBalance);
      expect(claims).to.be.equal(0);
      expect(proofBalanceAfterClaim).to.be.equal(insufficientFundsRewardAmount);
    });

    it('should claim allotted amount from both an older and new proof', async () => {
      const { rewards, rewardPool, distributor, token, addr4, addr2, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, rewardCumulativeAmount, proof } = await loadFixture(deployClaimFixture);
      let updatedProof: string[]|undefined;
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
      await mintingManager.connect(addr4).mintDaily();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, rewardCumulativeAmount);
      const withdrawalAmount = ethers.utils.parseEther(String(20));
      await rewardPool
        .connect(addr2)
        .claim(ethers.utils.parseEther(String(8)), rewardAmount, 1, proof);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
          proof
        );
      const udpatedProofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          updatedRewardAmount,
          2,
          updatedProof
        );
      expect(proofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(2))
      );
      expect(udpatedProofBalanceAfterClaim).to.be.equal(
        ethers.utils.parseEther(String(12))
      );
      await rewardPool
        .connect(addr2)
        .claim(
          ethers.utils.parseEther(String(12)),
          updatedRewardAmount,
          2,
          updatedProof
        );

      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      expect(rewardeeBalance).to.be.equal(withdrawalAmount);
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(String(44892 - 20))
      );
      expect(claims).to.be.equal(withdrawalAmount);
    });

    it("should not allow a rewardee to exceed their provided proof's allotted amount when withdrawing from an older proof and a newer proof", async () => {
      const { rewards, rewardPool, distributor, token, addr4, addr2, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, rewardCumulativeAmount, proof } = await loadFixture(deployClaimFixture);
      let updatedProof: string[]|undefined;
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
      await mintingManager.connect(addr2).mintDaily();
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(updatedRoot, rewardCumulativeAmount);
      await rewardPool
        .connect(addr2)
        .claim(
          ethers.utils.parseEther(String(8)),
          updatedRewardAmount,
          2,
          updatedProof
        );

      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
          proof
        );
      const udpatedProofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          updatedRewardAmount,
          2,
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
          .claim(ethers.utils.parseEther(String(12)), rewardAmount, 1, proof)
      ).to.be.reverted;
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      expect(rewardeeBalance).to.be.equal(ethers.utils.parseEther(String(8)));
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(String(44892 - 8))
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
      const { rewards, rewardPool, token, addr6 } = await loadFixture(deployInitialStateFixture);
      const { decimalRewardsProof } = await loadFixture(deployClaimFixture);
      const rewardee = rewards[4][0];
      const rewardAmount = rewards[4][1];
      const remainedTokens = await rewardPool.getRemainingAllocatedRewards(
        rewardee,
        rewardAmount,
        1,
        decimalRewardsProof
      );
      expect(remainedTokens).to.be.equal(rewardAmount);
      const balanceOfRewardPool = await token.balanceOf(rewardPool.address);
      expect(balanceOfRewardPool).to.be.equal(
        ethers.utils.parseEther(String(22446))
      );
      await expect(
        rewardPool
          .connect(addr6)
          .claim(rewardAmount, rewardAmount, 1, decimalRewardsProof)
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, rewardAmount);
      const rewardeeBalance = await token.balanceOf(rewardee);
      const poolBalance = await token.balanceOf(rewardPool.address);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim =
        await rewardPool.getRemainingAllocatedRewards(
          rewardee,
          rewardAmount,
          1,
          decimalRewardsProof
        );

      expect(rewardeeBalance).to.be.equal(rewardAmount);
      expect(poolBalance).to.be.equal(
        ethers.utils.parseEther(String(22446 - 11.78))
      );
      expect(claims).to.be.equal(rewardAmount);
      expect(proofBalanceAfterClaim).to.be.equal(0);
    });
  });

  describe('transfer rewards', () => {
    async function deployTransferRewardsState() {
      const { rewards, rewardPool, token, distributor } = await loadFixture(deployInitialStateFixture);
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
      const rewardCumulativeAmount = ethers.utils.parseEther(String(10000));
      time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root, rewardCumulativeAmount);
      return {rewardee, proof, rewardAmount, rewardCumulativeAmount}
      
    }

    it('should enable admin to transfer tokens to an address', async () => {
      const { rewardPool, token, distributor } = await loadFixture(deployInitialStateFixture);
      const { rewardee, proof, rewardAmount } = await loadFixture(deployTransferRewardsState);
      await rewardPool
        .connect(distributor)
        .transferRewards(rewardee, rewardAmount, rewardAmount, 1, proof);
      const rewardeeBalance = await token.balanceOf(rewardee);
      expect(rewardeeBalance).to.be.equal(rewardAmount);
    });

    it('should not transfer tokens to an address if not its proof', async () => {
      const { rewardPool, distributor } = await loadFixture(deployInitialStateFixture);
      const { proof, rewardAmount } = await loadFixture(deployTransferRewardsState);
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewards[1][0], rewardAmount, rewardAmount, 1, proof)
      ).to.be.reverted;
    });

    it('should not transfer more tokens than minted', async () => {
      const { rewardPool, token, distributor } = await loadFixture(deployInitialStateFixture);
      const { rewardee, proof, rewardAmount } = await loadFixture(deployTransferRewardsState);
      const withdrawalAmount = ethers.utils.parseEther(String(100000));
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewardee, withdrawalAmount, rewardAmount, 1, proof)
      ).to.be.reverted;
      const balance = await token.balanceOf(rewardee);
      expect(balance).to.be.equal(0);
    });

    it('distributor cannot transfer 0 rewards from pool', async () => {
      const { rewardPool, token, distributor } = await loadFixture(deployInitialStateFixture);
      const { rewardee, proof, rewardAmount } = await loadFixture(deployTransferRewardsState);
      const withdrawalAmount = 0;
      await expect(
        rewardPool
          .connect(distributor)
          .transferRewards(rewardee, withdrawalAmount, rewardAmount, 1, proof)
      ).to.be.reverted;
      const balance = await token.balanceOf(rewardee);
      expect(balance).to.be.equal(0);
    });

    it('should not transfer tokens from pool if not admin', async () => {
      const { rewardPool, token, addr2 } = await loadFixture(deployInitialStateFixture);
      const { rewardee, proof, rewardAmount } = await loadFixture(deployTransferRewardsState);
      const withdrawalAmount = ethers.utils.parseEther(String(10));
      await expect(
        rewardPool
          .connect(addr2)
          .transferRewards(rewardee, withdrawalAmount, rewardAmount, 1, proof)
      ).to.be.reverted;
      const balance = await token.balanceOf(rewardee);
      expect(balance).to.be.equal(0);
    });
  });

  describe('transfer company and investors tokens', () => {
    async function deployTransferCompanyInvestorsTokensState() {
      const { rewards, rewardPool, token, owner, mintingManager } = await loadFixture(deployInitialStateFixture);
      const companyTarget = rewards[0][0];
      const rewardCycle = await mintingManager.getCycle();
      await time.increase(90000);
      await rewardPool.connect(owner).setCompanyTarget(companyTarget);
      return { companyTarget, rewardCycle }
    }
    it('should enable distributor to transfer company tokens to an address', async () => {
      const { rewardPool, token, mintingManager, distributor } = await loadFixture(deployInitialStateFixture);
      const { companyTarget, rewardCycle } = await loadFixture(deployTransferCompanyInvestorsTokensState);
      const companyMint = await mintingManager.dailyCompanyMint(rewardCycle);
      await expect(rewardPool.connect(distributor).transferCompanyTokens())
        .to.emit(rewardPool, 'CompanyTokensTransferred')
        .withArgs(companyTarget, companyMint);
      const withdrawals = await rewardPool.companyWithdrawals();
      const balance = await token.balanceOf(companyTarget);
      expect(balance).to.be.equal(withdrawals);
      expect(balance).to.be.equal(companyMint);
    });

    it('should not permit non-distributor to transfer company tokens to an address', async () => {
      const { rewardPool, addr4 } = await loadFixture(deployInitialStateFixture);
      await expect(rewardPool.connect(addr4).transferCompanyTokens()).to.be
        .reverted;
    });

    it('should transfer 6000000 tokens by the end of the 2nd year', async () => {
      const { rewardPool, token, distributor, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { companyTarget } = await loadFixture(deployTransferCompanyInvestorsTokensState);
      for (let i = 1; i < 732; i++) {
        await time.increase(90000);
        await mintingManager.mintDaily();
      }
      await expect(rewardPool.connect(distributor).transferCompanyTokens())
        .to.emit(rewardPool, 'CompanyTokensTransferred')
        .withArgs(companyTarget, ethers.utils.parseEther(String(6000000)));
      const balance = await token.balanceOf(companyTarget);
      expect(balance).to.be.equal(ethers.utils.parseEther(String(6000000)));
    });

    it('should transfer 30000000 tokens by the end of the 3rd year', async () => {
      const { rewardPool, token, distributor, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { companyTarget } = await loadFixture(deployTransferCompanyInvestorsTokensState);
      for (let i = 1; i < 1098; i++) {
        await time.increase(90000);
        await mintingManager.mintDaily();
      }
      await expect(rewardPool.connect(distributor).transferCompanyTokens())
        .to.emit(rewardPool, 'CompanyTokensTransferred')
        .withArgs(companyTarget, ethers.utils.parseEther(String(30000000)));
      const balance = await token.balanceOf(companyTarget);
      expect(balance).to.be.equal(ethers.utils.parseEther(String(30000000)));
    });

    it('should revert after 30000000 tokens are already requested', async () => {
      const { rewardPool, token, distributor, mintingManager } = await loadFixture(deployInitialStateFixture);
      const { companyTarget } = await loadFixture(deployTransferCompanyInvestorsTokensState);
      for (let i = 1; i < 1098; i++) {
        await time.increase(90000);
        await mintingManager.mintDaily();
      }
      await expect(rewardPool.connect(distributor).transferCompanyTokens())
        .to.emit(rewardPool, 'CompanyTokensTransferred')
        .withArgs(companyTarget, ethers.utils.parseEther(String(30000000)));
      const balance = await token.balanceOf(companyTarget);
      expect(balance).to.be.equal(ethers.utils.parseEther(String(30000000)));
      await time.increase(90000);
      await mintingManager.mintDaily();
      await expect(rewardPool.connect(distributor).transferCompanyTokens()).to
        .be.reverted;
    });
  });
  describe('testing pausability', () => {
    async function deployPausabilityState() {
      const { rewards, rewardPool, owner, mintingManager } = await loadFixture(deployInitialStateFixture);
      const companyTarget = rewards[0][0];
      const rewardCycle = await mintingManager.getCycle();
      await time.increase(90000);
      await rewardPool.connect(owner).setCompanyTarget(companyTarget);
      return { companyTarget, rewardCycle }
    }
    it('should pause rewardpool', async () => {
      const { rewardPool, addr2, owner } = await loadFixture(deployInitialStateFixture);
      await time.increase(90000);
      if (await rewardPool.connect(owner).pause()) {
        await expect(rewardPool.connect(addr2).transferCompanyTokens()).to.be
          .reverted;
      }
    });
    it('should unpause rewardpool', async () => {
      const { rewardPool, mintingManager, distributor, owner } = await loadFixture(deployInitialStateFixture);
      const { companyTarget, rewardCycle } = await loadFixture(deployPausabilityState);
      const companyMint = await mintingManager.dailyCompanyMint(rewardCycle);
      await time.increase(90000);
      await rewardPool.connect(owner).pause();
      if (await rewardPool.connect(owner).unpause()) {
        await expect(rewardPool.connect(distributor).transferCompanyTokens())
          .to.emit(rewardPool, 'CompanyTokensTransferred')
          .withArgs(companyTarget, companyMint);
      }
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
