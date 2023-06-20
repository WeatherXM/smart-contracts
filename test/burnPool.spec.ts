import { ethers, upgrades } from 'hardhat';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe('BurnPool', () => {
  async function deployInitialStateFixture() {
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('WeatherXM');
    const WeatherXMMintingManager = await ethers.getContractFactory('WeatherXMMintingManager');
    const mintingManager = await WeatherXMMintingManager.deploy()
    const token = await Token.deploy('WeatherXM', 'WXM', mintingManager.address);
    await token.deployed();
    await mintingManager.setToken(token.address);
    const WeatherStationXM = await ethers.getContractFactory(
      'WeatherStationXM'
    );
    const weatherStationXM = await WeatherStationXM.deploy(
      'WeatherStationXM',
      'WSWXM'
    );
    await weatherStationXM.deployed();

    const BurnPool = await ethers.getContractFactory('BurnPool');
    const burnPool = await upgrades.deployProxy(
      BurnPool,
      [
        token.address,
        weatherStationXM.address
      ],
      {
        initializer: 'initialize',
        kind: 'uups'
      }
    );
    const burnAmount = ethers.utils.parseEther(String(10.0));
    await burnPool.deployed();
    await time.increase(90000);
    // Fixtures can return anything you consider useful for your tests
    return { burnPool, burnAmount, weatherStationXM, mintingManager, token, owner, addr1, addr2, addr3, addr4 };
  }

  describe('burnForService', () => {
    it('burn for service (expected behavior)', async () => {
      const { burnPool, burnAmount, token, addr2, mintingManager, owner } = await loadFixture(deployInitialStateFixture);
      await mintingManager.connect(owner).setMintTarget(await addr2.getAddress());
      await mintingManager.mintDaily();
      await token.connect(addr2).approve(burnPool.address, burnAmount);
      await expect(
        burnPool
          .connect(addr2)
          .burnForService(burnAmount, 'weather predictions')
      ).to.emit(burnPool, 'BurnedForService');
    });
    it('burn for service when amount approved is less', async () => {
      const { burnPool, burnAmount, token, addr2 } = await loadFixture(deployInitialStateFixture);
      await token
        .connect(addr2)
        .approve(burnPool.address, ethers.utils.parseEther(String(5.0)));
      await expect(
        burnPool
          .connect(addr2)
          .burnForService(burnAmount, 'weather predictions')
      ).to.be.reverted;
    });
  });
  describe('burnOnboardingFee', () => {
    it('burnOnboardingFee', async () => {
      const { burnPool, owner, weatherStationXM, token, addr3, mintingManager } = await loadFixture(deployInitialStateFixture);
      const manufacturer = await addr3.getAddress();
      await time.increase(90000);
      await burnPool
        .connect(owner)
        .grantRole(
          '0xeefb95e842a3287179d933b4460be539a1d5af11aa8b325bb45c5c8dc92de4ed',
          manufacturer
        );
      await weatherStationXM
        .connect(owner)
        .grantRole(
          '0x7670093c8396cecff5862296425346d7a6801611a244bd9f8f5b7132e94d46df',
          burnPool.address
        );
      // the manufacturer is set as target for mint instead of the rewardPool
      // for the purpose of funding this account in order to complete the tests
      await mintingManager.connect(owner).setMintTarget(manufacturer);
      await mintingManager.mintDaily();
      await token
        .connect(addr3)
        .approve(burnPool.address, ethers.utils.parseEther(String(100.0)));
      await expect(
        burnPool
          .connect(addr3)
          .burnOnboardingFee(
            ethers.utils.parseEther(String(100.0)),
            'bafybeic3ui4dj5dzsvqeiqbxjgg3fjmfmiinb3iyd2trixj2voe4jtefgq'
          )
      ).to.emit(burnPool, 'BurnedOnboardingFee');
    });
  });

  describe('testing pausability', () => {
    it('should pause burnPool', async () => {
      const { burnPool, burnAmount, owner, token, addr2, mintingManager } = await loadFixture(deployInitialStateFixture);
      await time.increase(90000);
      await mintingManager.connect(owner).setMintTarget(await addr2.getAddress());
      await mintingManager.mintDaily();
      await token.connect(addr2).approve(burnPool.address, burnAmount);
      await time.increase(90000);
      if (await burnPool.connect(owner).pause()) {
        await expect(
          burnPool
            .connect(addr2)
            .burnForService(burnAmount, 'weather predictions')
        ).to.be.reverted;
      }
    });
    it('should unpause burnPool', async () => {
      const { burnPool, burnAmount, owner, token, addr2, mintingManager } = await loadFixture(deployInitialStateFixture);
      await time.increase(90000);
      await mintingManager.connect(owner).setMintTarget(await addr2.getAddress());
      await mintingManager.mintDaily();
      await token.connect(addr2).approve(burnPool.address, burnAmount);
      await time.increase(90000);
      await burnPool.connect(owner).pause();
      if (await burnPool.connect(owner).unpause()) {
        await expect(
          burnPool
            .connect(addr2)
            .burnForService(burnAmount, 'weather predictions')
        ).to.emit(burnPool, 'BurnedForService');
      }
    });
  });
});
