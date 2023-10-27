import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { ethers, upgrades, config } from 'hardhat';
import { time, mine } from '@nomicfoundation/hardhat-network-helpers';
import Web3 from 'web3';
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
      treasury,
      metaTxSender
    ] = await ethers.getSigners();
    const accounts: any = config.networks.hardhat.accounts;
    const addr2Wallet = ethers.Wallet.fromMnemonic(
      accounts.mnemonic,
      accounts.path + '/2'
    );
    const addr2PrivKey = addr2Wallet.privateKey;
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
      treasury,
      metaTxSender,
      addr2,
      addr3,
      addr4,
      addr6,
      addr9,
      addr2PrivKey
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

  function signMessage(
    sender: string,
    amount: string,
    cycle: string,
    fee: string,
    nonce: string,
    privKey: string
  ) {
    const web3 = new Web3();
    const hexAmount = Web3.utils
      .padLeft(Web3.utils.numberToHex(amount), 64)
      .slice(2);
    const hexCycle = Web3.utils
      .padLeft(Web3.utils.numberToHex(cycle), 64)
      .slice(2);
    const hexFee = Web3.utils.padLeft(Web3.utils.numberToHex(fee), 64).slice(2);
    const message = `${sender}${hexAmount}${hexCycle}${hexFee}${nonce.slice(
      2
    )}`;
    const hashedMessage = web3.utils.soliditySha3(message);

    return web3.eth.accounts.sign(hashedMessage!, privKey);
  }

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
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)), '0');
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
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)), '0');
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
            ethers.utils.parseEther(String(14_246)),
            '0'
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
          .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)), '0')
      ).to.be.revertedWith(
        `AccessControl: account ${addr2.address.toLocaleLowerCase()} is missing role ${distributorRole}`
      );
    });

    it('should allow submitting n+1 trees if we did not submit for n days', async () => {
      const { rewardPool, distributor, addr2 } = await loadFixture(
        deployInitialStateFixture
      );
      mine(1);
      const tree1 = StandardMerkleTree.of(
        [[addr2.address, '1']],
        ['address', 'uint256']
      );
      const root1 = tree1.root;
      const cycleNumber1 = await rewardPool.cycle();
      expect(cycleNumber1.toNumber()).to.equal(0);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root1, ethers.utils.parseEther(String(14_246)), '0');
      const root1_actual = await rewardPool.connect(distributor).roots(0);
      expect(root1_actual).to.equal(root1);

      time.increase(86400);

      const tree2 = StandardMerkleTree.of(
        [[addr2.address, '2']],
        ['address', 'uint256']
      );
      const root2 = tree2.root;
      const cycleNumber2 = await rewardPool.cycle();
      expect(cycleNumber2.toNumber()).to.equal(1);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root2, ethers.utils.parseEther(String(14_246)), '0');
      const root2_actual = await rewardPool.connect(distributor).roots(1);
      expect(root2_actual).to.equal(root2);

      time.increase(86400 * 2);

      const tree3 = StandardMerkleTree.of(
        [[addr2.address, '3']],
        ['address', 'uint256']
      );
      const root3 = tree3.root;
      const cycleNumber3 = await rewardPool.cycle();
      expect(cycleNumber3.toNumber()).to.equal(2);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root3, ethers.utils.parseEther(String(14_246)), '0');
      const root3_actual = await rewardPool.connect(distributor).roots(2);
      expect(root3_actual).to.equal(root3);

      const tree4 = StandardMerkleTree.of(
        [[addr2.address, '4']],
        ['address', 'uint256']
      );
      const root4 = tree4.root;
      const cycleNumber4 = await rewardPool.cycle();
      expect(cycleNumber4.toNumber()).to.equal(3);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root4, ethers.utils.parseEther(String(14_246)), '0');
      const root4_actual = await rewardPool.connect(distributor).roots(3);
      expect(root4_actual).to.equal(root4);
    });

    it('should transfer the boost rewards from the rewardsChangeTreasury', async () => {
      const { rewardPool, distributor, addr2, addr3, token, treasury } =
        await loadFixture(deployInitialStateFixture);
      mine(1);
      const tree1 = StandardMerkleTree.of(
        [
          [addr2.address, ethers.utils.parseEther('2000')],
          [addr3.address, ethers.utils.parseEther('3000')]
        ],
        ['address', 'uint256']
      );
      await token.transfer(treasury.address, ethers.utils.parseEther('10000'));
      await token
        .connect(treasury)
        .approve(rewardPool.address, ethers.utils.parseEther('10000'));
      const root1 = tree1.root;
      const poolBalanceBefore = await token.balanceOf(rewardPool.address);
      const treasuryBalanceBefore = await token.balanceOf(treasury.address);
      // Total rewards are 5000. 4000 from the vault and 1000 from the boost treasury
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(root1, ethers.utils.parseEther('4000'), ethers.utils.parseEther('1000'));
      const poolBalanceAfter = await token.balanceOf(rewardPool.address)
      const treasuryBalanceAfter = await token.balanceOf(treasury.address)

      expect(poolBalanceBefore).to.equal('0');
      // Pool balance is 5_000 which is the total rewards
      expect(poolBalanceAfter).to.equal(ethers.utils.parseEther(String(5_000)));
      expect(treasuryBalanceBefore).to.equal(ethers.utils.parseEther('10000'));
      // The new treasury balance is 14_246 - 4_000 which is the change from the daily emissions since we are only giving 4000
      // plus the 10_000 which it initially had minus the 1_000 that we are giving as boost
      expect(treasuryBalanceAfter).to.equal(
        ethers.utils.parseEther(String(14_246 - 4_000 + 10_000 - 1_000))
      );
    });

    it('should revert if it cannot transfer tokens from the rewardsChangeTreasury', async () => {
      const { rewardPool, distributor, addr2, addr3, token, treasury } =
        await loadFixture(deployInitialStateFixture);
      mine(1);
      const tree1 = StandardMerkleTree.of(
        [
          [addr2.address, ethers.utils.parseEther('2000')],
          [addr3.address, ethers.utils.parseEther('3000')]
        ],
        ['address', 'uint256']
      );
      await token.transfer(treasury.address, ethers.utils.parseEther('10000'));
      const root1 = tree1.root;
      await expect(
        rewardPool
          .connect(distributor)
          .submitMerkleRoot(
            root1,
            ethers.utils.parseEther('5000'),
            ethers.utils.parseEther('1000')
          )
      ).to.be.revertedWith('ERC20: insufficient allowance');
    });

    it('should revert if it does not receive enough rewards from the rewards vault', async () => {
      const { rewardPool, distributor, addr2, addr3 } = await loadFixture(
        deployInitialStateFixture
      );
      mine(1);
      const tree1 = StandardMerkleTree.of(
        [
          [addr2.address, ethers.utils.parseEther('20000')],
          [addr3.address, ethers.utils.parseEther('30000')]
        ],
        ['address', 'uint256']
      );
      const root1 = tree1.root;
      // Total rewards are more than the daily emissions from the vault
      await expect(
        rewardPool
          .connect(distributor)
          .submitMerkleRoot(root1, ethers.utils.parseEther('50000'), '0')
      ).to.be.revertedWithCustomError(
        rewardPool,
        'TotalRewardsExceedEmissionFromVault'
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
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)), '0');
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
        .submitMerkleRoot(
          updatedRoot,
          ethers.utils.parseEther(String(14_246)),
          '0'
        );

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
        .submitMerkleRoot(
          updatedRoot,
          ethers.utils.parseEther(String(14_246)),
          '0'
        );
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
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)), '0');
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
      expect(
        await rewardPool
          .connect(addr2)
          .claim(rewardAmount, rewardAmount, 0, proof)
      )
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
      await expect(
        await rewardPool
          .connect(addr2)
          .claim(withdrawalAmount, rewardAmount, 0, proof)
      )
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
        .claim(ethers.utils.parseEther(String(4)), rewardAmount, 0, proof);
      await rewardPool
        .connect(addr2)
        .claim(ethers.utils.parseEther(String(6)), rewardAmount, 0, proof);
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
          .claim(withdrawalAmount, rewardAmount, 0, proof)
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
          .claim(withdrawalAmount, rewardAmount, 0, garbageProof)
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
        .claim(withdrawalAmount, rewardAmount, 0, proof);

      await expect(
        rewardPool
          .connect(addr2)
          .claim(
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
          .claim(
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
          .claim(
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
      await expect(
        rewardPool
          .connect(addr9)
          .claim(
            insufficientFundsRewardAmount,
            insufficientFundsRewardAmount,
            0,
            proof7
          )
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');
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
      await time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(
          updatedRoot,
          ethers.utils.parseEther(String(14_246)),
          '0'
        );
      const withdrawalAmount = ethers.utils.parseEther(String(20));
      await rewardPool
        .connect(addr2)
        .claim(ethers.utils.parseEther(String(8)), rewardAmount, 0, proof);
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
        .claim(
          ethers.utils.parseEther(String(12)),
          updatedRewardAmount,
          1,
          updatedProof
        );

      const updatedProofBalanceAfterBothClaims =
        await rewardPool.getRemainingAllocatedRewards(
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
        .submitMerkleRoot(
          updatedRoot,
          ethers.utils.parseEther(String(14_246)),
          '0'
        );
      await rewardPool
        .connect(addr2)
        .claim(
          ethers.utils.parseEther(String(8)),
          updatedRewardAmount,
          1,
          updatedProof
        );
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
          .claim(ethers.utils.parseEther(String(12)), rewardAmount, 0, proof)
      ).to.be.revertedWithCustomError(
        rewardPool,
        'AmountIsOverAvailableRewardsToClaim'
      );
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
      await expect(
        await rewardPool
          .connect(addr6)
          .claim(rewardAmount, rewardAmount, 0, decimalRewardsProof)
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
        rewardPool.connect(addr2).claim(rewardAmount, 0, 0, proof)
      ).to.be.revertedWithCustomError(rewardPool, 'TotalRewardsAreZero');
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
        rewardPool.connect(addr2).claim(rewardAmount, rewardAmount, 0, proof)
      ).to.be.revertedWith('Pausable: paused');

      await rewardPool.connect(owner).unpause();

      await rewardPool
        .connect(addr2)
        .claim(rewardAmount, rewardAmount, 0, proof);

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

  describe('claimFor', () => {
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
        .submitMerkleRoot(root, ethers.utils.parseEther(String(14_246)), '0');
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

    it('should claim up to the allotted amount from the pool', async () => {
      const { rewardPool, addr2, token, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const claimNonce = Web3.utils.randomHex(32);
      const sig = signMessage(
        metaTxSender.address,
        rewardAmount.toString(),
        '0',
        '0',
        claimNonce,
        addr2PrivKey
      );
      expect(
        await rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            rewardAmount,
            rewardAmount,
            0,
            0,
            proof,
            claimNonce,
            sig.signature
          )
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, rewardAmount);

      const rewardeeBalance = await token.balanceOf(rewardee);
      const txSenderBalance = await token.balanceOf(metaTxSender.address);
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
      expect(txSenderBalance).to.equal('0');
    });

    it('should allow claiming less than the total allotted amount', async () => {
      const { rewardPool, addr2, token, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const withdrawalAmount = ethers.utils.parseEther(String(8));
      // substraction of numbers in WEI should not result to a number with decimals
      // when this happens, substraction is made between Integers and then transform to WEI
      const remainingRewardPoolBalance = ethers.utils.parseEther(
        String(14_246 - 8)
      );
      const claimNonce = Web3.utils.randomHex(32);
      const sig = signMessage(
        metaTxSender.address,
        withdrawalAmount.toString(),
        '0',
        '0',
        claimNonce,
        addr2PrivKey
      );
      await expect(
        await rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            withdrawalAmount,
            rewardAmount,
            0,
            0,
            proof,
            claimNonce,
            sig.signature
          )
      )
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

    it('should correctly send the fee to meta tx sender', async () => {
      const { rewardPool, addr2, token, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const feeAmount = ethers.utils.parseEther(String(3)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const sig = signMessage(
        metaTxSender.address,
        rewardAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      expect(
        await rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            rewardAmount,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, rewardAmount);

      const rewardeeBalance = await token.balanceOf(rewardee);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(rewardeeBalance.toString()).to.equal(rewardAmount.sub(feeAmount));
      expect(claims).to.equal(rewardAmount);
      expect(proofBalanceAfterClaim).to.equal('0');
    });

    it('should allow making multiple claims within the allotted amount', async () => {
      const { rewardPool, addr2, token, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      {
        const claimNonce = Web3.utils.randomHex(32);
        const claimAmount = ethers.utils.parseEther(String(5)).toString();
        const sig = signMessage(
          metaTxSender.address,
          claimAmount.toString(),
          '0',
          '0',
          claimNonce,
          addr2PrivKey
        );
        expect(
          await rewardPool
            .connect(metaTxSender)
            .claimFor(
              addr2.address,
              claimAmount,
              rewardAmount,
              0,
              0,
              proof,
              claimNonce,
              sig.signature
            )
        )
          .to.emit(rewardPool, 'Claimed')
          .withArgs(rewardee, claimAmount);

        const rewardeeBalance = await token.balanceOf(rewardee);
        const txSenderBalance = await token.balanceOf(metaTxSender.address);
        const claims = await rewardPool.claims(rewardee);
        const proofBalanceAfterClaim = await rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
        expect(rewardeeBalance).to.equal(claimAmount);
        expect(claims).to.equal(claimAmount);
        expect(proofBalanceAfterClaim).to.equal(rewardAmount.sub(claimAmount));
        expect(txSenderBalance).to.equal('0');
      }

      {
        const rewardeeBalanceBefore = await token.balanceOf(rewardee);
        const claimNonce = Web3.utils.randomHex(32);
        const claimAmount = ethers.utils.parseEther(String(4));
        const sig = signMessage(
          metaTxSender.address,
          claimAmount.toString(),
          '0',
          '0',
          claimNonce,
          addr2PrivKey
        );
        expect(
          await rewardPool
            .connect(metaTxSender)
            .claimFor(
              addr2.address,
              claimAmount,
              rewardAmount,
              0,
              0,
              proof,
              claimNonce,
              sig.signature
            )
        )
          .to.emit(rewardPool, 'Claimed')
          .withArgs(rewardee, claimAmount);

        const rewardeeBalance = await token.balanceOf(rewardee);
        const txSenderBalance = await token.balanceOf(metaTxSender.address);
        const claims = await rewardPool.claims(rewardee);
        const proofBalanceAfterClaim = await rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
        expect(rewardeeBalance).to.equal(
          claimAmount.add(rewardeeBalanceBefore)
        );
        expect(claims).to.equal(ethers.utils.parseEther(String(9)));
        expect(proofBalanceAfterClaim).to.equal(
          ethers.utils.parseEther(String(1))
        );
        expect(txSenderBalance).to.equal('0');
      }
    });

    it('should not allow claiming more that the total allotted amount', async () => {
      const { rewardPool, addr2, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { proof } = await loadFixture(deployClaimFixture);
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount = ethers.utils.parseEther(String(5)).toString();
      const rewardAmount = ethers.utils.parseEther(String(11));
      const sig = signMessage(
        metaTxSender.address,
        claimAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      ).to.be.revertedWith('INVALID PROOF');
    });
    it('should not allow claiming with a wrong proof', async () => {
      const { rewardPool, addr2, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardAmount, proof7 } = await loadFixture(deployClaimFixture);
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount = ethers.utils.parseEther(String(5)).toString();
      const sig = signMessage(
        metaTxSender.address,
        claimAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            feeAmount,
            proof7,
            claimNonce,
            sig.signature
          )
      ).to.be.revertedWith('INVALID PROOF');
    });

    it('should not allow claiming 0 tokens', async () => {
      const { rewardPool, addr2, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount = '0';
      const sig = signMessage(
        metaTxSender.address,
        claimAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      ).to.be.revertedWithCustomError(rewardPool, 'AmountRequestedIsZero');
    });

    it('should allow claiming using older cycle proofs', async () => {
      const {
        rewardPool,
        addr2,
        token,
        metaTxSender,
        addr2PrivKey,
        distributor
      } = await loadFixture(deployInitialStateFixture);
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
      await time.increase(90000);
      await rewardPool
        .connect(distributor)
        .submitMerkleRoot(
          updatedRoot,
          ethers.utils.parseEther(String(14_246)),
          '0'
        );
      {
        const claimNonce = Web3.utils.randomHex(32);
        const sig = signMessage(
          metaTxSender.address,
          rewardAmount.toString(),
          '0',
          '0',
          claimNonce,
          addr2PrivKey
        );
        expect(
          await rewardPool
            .connect(metaTxSender)
            .claimFor(
              addr2.address,
              rewardAmount,
              rewardAmount,
              0,
              0,
              proof,
              claimNonce,
              sig.signature
            )
        )
          .to.emit(rewardPool, 'Claimed')
          .withArgs(rewardee, rewardAmount);

        const rewardeeBalance = await token.balanceOf(rewardee);
        const txSenderBalance = await token.balanceOf(metaTxSender.address);
        const claims = await rewardPool.claims(rewardee);
        const proofBalanceAfterClaim = await rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
        expect(rewardeeBalance).to.equal(rewardAmount);
        expect(claims).to.equal(rewardAmount);
        expect(proofBalanceAfterClaim).to.equal('0');
        expect(txSenderBalance).to.equal('0');
      }

      {
        const claimNonce = Web3.utils.randomHex(32);
        const sig = signMessage(
          metaTxSender.address,
          ethers.utils.parseEther(String(10)).toString(),
          '1',
          '0',
          claimNonce,
          addr2PrivKey
        );
        expect(
          await rewardPool
            .connect(metaTxSender)
            .claimFor(
              addr2.address,
              ethers.utils.parseEther(String(10)),
              updatedRewardAmount,
              1,
              0,
              updatedProof,
              claimNonce,
              sig.signature
            )
        )
          .to.emit(rewardPool, 'Claimed')
          .withArgs(rewardee, updatedRewardAmount);

        const rewardeeBalance = await token.balanceOf(rewardee);
        const txSenderBalance = await token.balanceOf(metaTxSender.address);
        const claims = await rewardPool.claims(rewardee);
        const proofBalanceAfterClaim = await rewardPool
          .connect(addr2)
          .getRemainingAllocatedRewards(
            rewardee,
            updatedRewardAmount,
            1,
            updatedProof
          );
        expect(rewardeeBalance).to.equal(updatedRewardAmount);
        expect(claims).to.equal(updatedRewardAmount);
        expect(proofBalanceAfterClaim).to.equal('0');
        expect(txSenderBalance).to.equal('0');
      }
    });

    it('should revert if the pool is paused', async () => {
      const { rewardPool, addr2, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const wrongFeeAmount = ethers.utils.parseEther(String(2)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount = ethers.utils.parseEther(String(3));
      const sig = signMessage(
        metaTxSender.address,
        claimAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      await rewardPool.pause();
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            wrongFeeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      ).to.be.revertedWith('Pausable: paused');
    });

    it('should revert if the fee does not match the signatures fee', async () => {
      const { rewardPool, addr2, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardAmount, proof } = await loadFixture(deployClaimFixture);
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const wrongFeeAmount = ethers.utils.parseEther(String(2)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount = ethers.utils.parseEther(String(3));
      const sig = signMessage(
        metaTxSender.address,
        claimAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            wrongFeeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      ).to.be.revertedWithCustomError(rewardPool, 'InvalidSignature');
    });

    it('should revert if the signature has been used before', async () => {
      const { rewardPool, addr2, token, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount = ethers.utils.parseEther(String(3));
      const sig = signMessage(
        metaTxSender.address,
        claimAmount.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      expect(
        await rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, claimAmount);

      const rewardeeBalance = await token.balanceOf(rewardee);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(rewardeeBalance.toString()).to.equal(claimAmount.sub(feeAmount));
      expect(claims).to.equal(claimAmount);
      expect(proofBalanceAfterClaim).to.equal(rewardAmount.sub(claimAmount));
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig.signature
          )
      ).to.be.revertedWithCustomError(
        rewardPool,
        'SignatureNonceHasAlreadyBeenUsed'
      );
    });

    it('should revert if the nonce has been used before', async () => {
      const { rewardPool, addr2, token, metaTxSender, addr2PrivKey } =
        await loadFixture(deployInitialStateFixture);
      const { rewardee, rewardAmount, proof } = await loadFixture(
        deployClaimFixture
      );
      const feeAmount = ethers.utils.parseEther(String(1)).toString();
      const claimNonce = Web3.utils.randomHex(32);
      const claimAmount1 = ethers.utils.parseEther(String(3));
      const claimAmount2 = ethers.utils.parseEther(String(4));
      const sig1 = signMessage(
        metaTxSender.address,
        claimAmount1.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      expect(
        await rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount1,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig1.signature
          )
      )
        .to.emit(rewardPool, 'Claimed')
        .withArgs(rewardee, claimAmount1);

      const rewardeeBalance = await token.balanceOf(rewardee);
      const claims = await rewardPool.claims(rewardee);
      const proofBalanceAfterClaim = await rewardPool
        .connect(addr2)
        .getRemainingAllocatedRewards(rewardee, rewardAmount, 0, proof);
      expect(rewardeeBalance.toString()).to.equal(claimAmount1.sub(feeAmount));
      expect(claims).to.equal(claimAmount1);
      expect(proofBalanceAfterClaim).to.equal(rewardAmount.sub(claimAmount1));

      const sig2 = signMessage(
        metaTxSender.address,
        claimAmount2.toString(),
        '0',
        feeAmount,
        claimNonce,
        addr2PrivKey
      );
      await expect(
        rewardPool
          .connect(metaTxSender)
          .claimFor(
            addr2.address,
            claimAmount2,
            rewardAmount,
            0,
            feeAmount,
            proof,
            claimNonce,
            sig2.signature
          )
      ).to.be.revertedWithCustomError(
        rewardPool,
        'SignatureNonceHasAlreadyBeenUsed'
      );
    });
  });

  describe('testing pausability', () => {
    it('should pause rewardpool', async () => {
      const { rewardPool, owner } = await loadFixture(
        deployInitialStateFixture
      );

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
