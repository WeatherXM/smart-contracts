import { ethers, config, upgrades } from 'hardhat';
import { expect } from 'chai';
import Web3 from 'web3'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { mine } from '@nomicfoundation/hardhat-network-helpers';

describe('WeatherXMStation', () => {
  async function loadWeatherXMStationFixture() {
    const [
      owner,
      manufacturer,
      alice,
      bob,
      station1,
      station2
    ] = await ethers.getSigners();

    const accounts: any  = config.networks.hardhat.accounts;
    const station1Wallet = ethers.Wallet.fromMnemonic(accounts.mnemonic, accounts.path + '/4');
    const station1PrivKey = station1Wallet.privateKey

    const station2Wallet = ethers.Wallet.fromMnemonic(accounts.mnemonic, accounts.path + '/5');
    const station2PrivKey = station2Wallet.privateKey

    const WeatherXMStationsRegistry = await ethers.getContractFactory('WeatherXMStationsRegistry');
    const stationRegistry = await upgrades.deployProxy(
      WeatherXMStationsRegistry,
      [],
      {
        initializer: 'initialize',
        kind: 'uups'
      }
    );
    await stationRegistry.deployed();

    const WeatherXMStation = await ethers.getContractFactory(
      'WeatherXMStation'
    );
    const weatherXMStation = await WeatherXMStation.deploy(
      'WeatherXMStation',
      'WXM_STATION'
    );
    await weatherXMStation.setStationRegistry(stationRegistry.address);
    await stationRegistry.addStation("model1", "meta-1");

    return {
      weatherXMStation,
      owner,
      manufacturer,
      alice,
      bob,
      station1,
      station2,
      station1PrivKey,
      station2PrivKey
    };
  }

  function signMessage(address: string, hash: string, privKey: string) {
    const web3 = new Web3()
    const message = `${address}${hash.slice(2)}`
    const hashedMessage = web3.utils.soliditySha3(message);

    return web3.eth.accounts.sign(hashedMessage!, privKey)
  }

  describe('transferTokenWithChip', () => {
    it('should correctly transfer the token', async () => {
      const { weatherXMStation, manufacturer, station1, station1PrivKey } = await loadFixture(
        loadWeatherXMStationFixture
      );
      await weatherXMStation.setSignatureValidityWindow(10);

      await weatherXMStation.mintWeatherStation(
        manufacturer.address,
        'serNum1',
        'model1',
        station1.address,
        'ipfs://img-1',
        'ipfs://meta-1'
      );

      const owner = await weatherXMStation.ownerOf(0);

      expect(owner).to.be.equal(manufacturer.address);

      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const sig = signMessage(station1.address, block.hash, station1PrivKey);

      await weatherXMStation.connect(station1)['transferTokenWithChip(bytes,uint256)'](
        sig.signature,
        block.number
      )

      const ownerAfterTransfer = await weatherXMStation.ownerOf(0);

      expect(ownerAfterTransfer).to.be.equal(station1.address);
    });

    it('should revert if the provided block is in the current block', async () => {
      const { weatherXMStation, manufacturer, station1, station1PrivKey } = await loadFixture(
        loadWeatherXMStationFixture
      );
      await weatherXMStation.setSignatureValidityWindow(10);

      await weatherXMStation.mintWeatherStation(
        manufacturer.address,
        'serNum1',
        'model1',
        station1.address,
        'ipfs://img-1',
        'ipfs://meta-1'
      );

      const owner = await weatherXMStation.ownerOf(0);

      expect(owner).to.be.equal(manufacturer.address);

      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const sig = signMessage(station1.address, block.hash, station1PrivKey);

      await expect(
        weatherXMStation.connect(station1)['transferTokenWithChip(bytes,uint256)'](
          sig.signature,
          block.number + 1
        )
      ).to.be.revertedWithCustomError(weatherXMStation, 'InvalidBlockNumber')
    })

    it('should revert if the provided block is in the future', async () => {
      const { weatherXMStation, manufacturer, station1, station1PrivKey } = await loadFixture(
        loadWeatherXMStationFixture
      );
      await weatherXMStation.setSignatureValidityWindow(10);

      await weatherXMStation.mintWeatherStation(
        manufacturer.address,
        'serNum1',
        'model1',
        station1.address,
        'ipfs://img-1',
        'ipfs://meta-1'
      );

      const owner = await weatherXMStation.ownerOf(0);

      expect(owner).to.be.equal(manufacturer.address);

      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const sig = signMessage(station1.address, block.hash, station1PrivKey);

      await expect(
        weatherXMStation.connect(station1)['transferTokenWithChip(bytes,uint256)'](
          sig.signature,
          block.number + 2
        )
      ).to.be.revertedWithCustomError(weatherXMStation, 'InvalidBlockNumber')
    })
  
    it('should revert if the provided block is too far in the past', async () => {
      const { weatherXMStation, manufacturer, station1, station1PrivKey } = await loadFixture(
        loadWeatherXMStationFixture
      );
      await weatherXMStation.setSignatureValidityWindow(10);

      await weatherXMStation.mintWeatherStation(
        manufacturer.address,
        'serNum1',
        'model1',
        station1.address,
        'ipfs://img-1',
        'ipfs://meta-1'
      );

      const owner = await weatherXMStation.ownerOf(0);

      expect(owner).to.be.equal(manufacturer.address);

      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const sig = signMessage(station1.address, block.hash, station1PrivKey);

      await mine(20);

      await expect(
        weatherXMStation.connect(station1)['transferTokenWithChip(bytes,uint256)'](
          sig.signature,
          block.number
        )
      ).to.be.revertedWithCustomError(weatherXMStation, 'BlockNumberTooOld')
    })
    
    it('should revert if the sender is not the address in the signature', async () => {
      const { weatherXMStation, manufacturer, station1, station1PrivKey, station2 } = await loadFixture(
        loadWeatherXMStationFixture
      );
      await weatherXMStation.setSignatureValidityWindow(10);

      await weatherXMStation.mintWeatherStation(
        manufacturer.address,
        'serNum1',
        'model1',
        station1.address,
        'ipfs://img-1',
        'ipfs://meta-1'
      );

      const owner = await weatherXMStation.ownerOf(0);

      expect(owner).to.be.equal(manufacturer.address);

      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const sig = signMessage(station1.address, block.hash, station1PrivKey);

      await expect(
        weatherXMStation.connect(station2)['transferTokenWithChip(bytes,uint256)'](
          sig.signature,
          block.number
        )
      ).to.be.revertedWithCustomError(weatherXMStation, 'InvalidSignature')
    })
  });
});
