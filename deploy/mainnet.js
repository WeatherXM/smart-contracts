const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const WXM_DAO_TREASURY = ''

module.exports = async ({deployments}) => {
  const {deploy} = deployments;
  const [deployer] = await ethers.getSigners();

  const token = await deploy('WeatherXM', {
    from: deployer.address,
    args: ['WeatherXM', 'WXM'],
    log: true,
  });

  await deploy('RewardPool', {
    from: deployer.address,
    log: true,
    proxy: {
      deployer: deployer.address,
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [
            token.address
          ]
        }
      }
    }
  });

  await deploy('ServicePool', {
    from: deployer.address,
    log: true,
    proxy: {
      deployer: deployer.address,
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [
            token.address,
            USDC,
            WXM_DAO_TREASURY
          ]
        }
      }
    }
  });
};

module.exports.tags = ['mainnet'];