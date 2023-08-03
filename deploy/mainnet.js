const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const WXM_DAO_TREASURY = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const DAILY_REWARDS_CHANGE_TREASURY = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const REWARDS_AMOUNT = '55000'

module.exports = async ({deployments}) => {
  const {deploy, execute} = deployments
  const [deployer] = await ethers.getSigners()

  const token = await deploy('WeatherXM', {
    from: deployer.address,
    args: ['WeatherXM', 'WXM'],
    log: true,
  })

  const rewardVault = await deploy('RewardsVault', {
    from: deployer.address,
    args: [token.address, deployer.address],
    log: true,
  })


  const rewardPool = await deploy('RewardPool', {
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
            rewardVault.address,
            DAILY_REWARDS_CHANGE_TREASURY
          ]
        }
      }
    }
  })

  await execute(
    'RewardsVault',
    {from: deployer.address, log: true},
    'setRewardDistributor',
    rewardPool.address
  )
  await execute(
    'WeatherXM',
    {from: deployer.address, log: true},
    'transfer',
    rewardVault.address,
    ethers.utils.parseUnits(REWARDS_AMOUNT, 'ether')
  )

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
  })
}

module.exports.tags = ['mainnet']