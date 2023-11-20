const { ethers, upgrades } = require('hardhat')
const { abi } = require('../artifacts/src/WeatherXM.sol/WeatherXM.json')

const DAILY_REWARDS_CHANGE_TREASURY = "";
const REWARDS_AMOUNT = "50000000";
const MULTISIG = "";
const REWARD_DISTRIBUTOR = "";

const WXM = "";

module.exports = async ({ deployments }) => {
	const { deploy, execute } = deployments;
	const [deployer] = await ethers.getSigners();

	const token = await new ethers.Contract(WXM, abi, deployer);

	const rewardVault = await deploy("RewardsVault", {
		from: deployer.address,
		args: [token.address, deployer.address],
		log: true,
	});

	const rewardPoolFactory = await ethers.getContractFactory("RewardPool");
	const rewardPool = await upgrades.deployProxy(
		rewardPoolFactory,
		[token.address, rewardVault.address, DAILY_REWARDS_CHANGE_TREASURY],
		{
			kind: "uups",
		}
	);

	await execute(
		"RewardsVault",
		{ from: deployer.address, log: true },
		"setRewardDistributor",
		rewardPool.address
	);

	await token.transfer(
		rewardVault.address,
		ethers.utils.parseUnits(REWARDS_AMOUNT, "ether")
	);


	const DEFAULT_ADMIN_ROLE = await rewardPool.DEFAULT_ADMIN_ROLE();
	const rewardPool_DISTRIBUTOR_ROLE = await rewardPool.DISTRIBUTOR_ROLE();

	// Transfer ownership of rewards vault
	await execute(
		"RewardsVault",
		{ from: deployer.address, log: true },
		"transferOwnership",
		MULTISIG
	);

	/** ========= Set reward pool access ========= **/

	// Grant distributor role
	await rewardPool.grantRole(rewardPool_DISTRIBUTOR_ROLE, REWARD_DISTRIBUTOR);

	// Give multisig default admin role
	await rewardPool.grantRole(DEFAULT_ADMIN_ROLE, MULTISIG);

	// Renounce default admin role
	await rewardPool.renounceRole(DEFAULT_ADMIN_ROLE, deployer.address);

	/** ========================================== **/
};

module.exports.tags = ["rewarding"];
