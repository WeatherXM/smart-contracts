const USDC = "0x2e668Bb88287675e34c8dF82686dfd0b7F0c0383";
const WXM_DAO_TREASURY = "0x64251043A35ab5D11f04111B8BdF7C03BE9cF0e7";
const DAILY_REWARDS_CHANGE_TREASURY =
	"0x64251043A35ab5D11f04111B8BdF7C03BE9cF0e7";
const REWARDS_AMOUNT = "50000000";
const MULTISIG = "0xC7FC933eA660B318EbB0f6a08d57DE6f96aDe511";
const REWARD_DISTRIBUTOR = "0xC8a8d74984DE34428A52A8F6b0F29E321a8E0824";

module.exports = async ({ deployments }) => {
	const { deploy, execute, read } = deployments;
	const [deployer] = await ethers.getSigners();

	const token = await deploy("WeatherXM", {
		from: deployer.address,
		args: ["WeatherXM", "WXM"],
		log: true,
	});

	await deploy("WeatherXMLicense", {
		from: deployer.address,
		args: ["WeatherXM Data License", "WXM Data License"],
		log: true,
	});

	await deploy("WeatherXMStation", {
		from: deployer.address,
		args: ["WeatherXM Station", "WXM Station"],
		log: true,
	});

	const rewardVault = await deploy("RewardsVault", {
		from: deployer.address,
		args: [token.address, deployer.address],
		log: true,
	});

	const rewardPool = await deploy("RewardPool", {
		from: deployer.address,
		log: true,
		proxy: {
			deployer: deployer.address,
			proxyContract: "OpenZeppelinTransparentProxy",
			execute: {
				init: {
					methodName: "initialize",
					args: [
						token.address,
						rewardVault.address,
						DAILY_REWARDS_CHANGE_TREASURY,
					],
				},
			},
		},
	});

	await deploy("ServicePool", {
		from: deployer.address,
		log: true,
		proxy: {
			deployer: deployer.address,
			proxyContract: "OpenZeppelinTransparentProxy",
			execute: {
				init: {
					methodName: "initialize",
					args: [token.address, USDC, WXM_DAO_TREASURY],
				},
			},
		},
	});

	const stationsRegistry = await deploy("WeatherXMStationsRegistry", {
		from: deployer.address,
		log: true,
		proxy: {
			deployer: deployer.address,
			proxyContract: "OpenZeppelinTransparentProxy",
			execute: {
				init: {
					methodName: "initialize",
					args: [],
				},
			},
		},
	});

	await execute(
		"RewardsVault",
		{ from: deployer.address, log: true },
		"setRewardDistributor",
		rewardPool.address
	);

	await execute(
		"WeatherXM",
		{ from: deployer.address, log: true },
		"transfer",
		rewardVault.address,
		ethers.utils.parseUnits(REWARDS_AMOUNT, "ether")
	);

	await execute(
		"WeatherXMStation",
		{ from: deployer.address, log: true },
		"setStationRegistry",
		stationsRegistry.address
	);

	const DEFAULT_ADMIN_ROLE = await read("RewardPool", "DEFAULT_ADMIN_ROLE");
	const rewardPool_DISTRIBUTOR_ROLE = await read(
		"RewardPool",
		"DISTRIBUTOR_ROLE"
	);
	const servicePool_SERVICE_MANAGER_ROLE = await read(
		"ServicePool",
		"SERVICE_MANAGER_ROLE"
	);
	const stationRegistry_STATIONS_MANAGER_ROLE = await read(
		"WeatherXMStationsRegistry",
		"STATIONS_MANAGER_ROLE"
	);
	const weatherXmStation_STATIONS_MANAGER_ROLE = await read(
		"WeatherXMStation",
		"PROVISIONER_ROLE"
	);
	const weatherXmLicense_LICENSE_MANAGER_ROLE = await read(
		"WeatherXMLicense",
		"LICENSE_MANAGER_ROLE"
	);

	// Transfer ownership of ERC20
	await execute(
		"WeatherXM",
		{ from: deployer.address, log: true },
		"transferOwnership",
		MULTISIG
	);

	// Transfer ownership of rewards vault
	await execute(
		"RewardsVault",
		{ from: deployer.address, log: true },
		"transferOwnership",
		MULTISIG
	);

	/** ========= Set reward pool access ========= **/

	// Grant distributor role
	await execute(
		"RewardPool",
		{ from: deployer.address, log: true },
		"grantRole",
		rewardPool_DISTRIBUTOR_ROLE,
		REWARD_DISTRIBUTOR
	);

	// Give multisig default admin role
	await execute(
		"RewardPool",
		{ from: deployer.address, log: true },
		"grantRole",
		DEFAULT_ADMIN_ROLE,
		MULTISIG
	);

	// Renounce default admin role
	await execute(
		"RewardPool",
		{ from: deployer.address, log: true },
		"renounceRole",
		DEFAULT_ADMIN_ROLE,
		deployer.address
	);

	/** ========================================== **/

	/** ========= Set service pool access ========= **/

	// Grant service manager role
	await execute(
		"ServicePool",
		{ from: deployer.address, log: true },
		"grantRole",
		servicePool_SERVICE_MANAGER_ROLE,
		MULTISIG
	);

	// Give multisig default admin role
	await execute(
		"ServicePool",
		{ from: deployer.address, log: true },
		"grantRole",
		DEFAULT_ADMIN_ROLE,
		MULTISIG
	);

	// Renounce default admin role
	await execute(
		"ServicePool",
		{ from: deployer.address, log: true },
		"renounceRole",
		DEFAULT_ADMIN_ROLE,
		deployer.address
	);

	/** ========================================== **/

	/** ========= Set station registry access ========= **/

	// Grant stations manager role
	await execute(
		"WeatherXMStationsRegistry",
		{ from: deployer.address, log: true },
		"grantRole",
		stationRegistry_STATIONS_MANAGER_ROLE,
		MULTISIG
	);

	// Give multisig default admin role
	await execute(
		"WeatherXMStationsRegistry",
		{ from: deployer.address, log: true },
		"grantRole",
		DEFAULT_ADMIN_ROLE,
		MULTISIG
	);

	// Renounce default admin role
	await execute(
		"WeatherXMStationsRegistry",
		{ from: deployer.address, log: true },
		"renounceRole",
		DEFAULT_ADMIN_ROLE,
		deployer.address
	);

	/** ========================================== **/

	/** ========= Set station NFT access ========= **/

	// Grant station manager role
	await execute(
		"WeatherXMStation",
		{ from: deployer.address, log: true },
		"grantRole",
		weatherXmStation_STATIONS_MANAGER_ROLE,
		MULTISIG
	);

	// Give multisig default admin role
	await execute(
		"WeatherXMStation",
		{ from: deployer.address, log: true },
		"grantRole",
		DEFAULT_ADMIN_ROLE,
		MULTISIG
	);

	// Renounce default admin role
	await execute(
		"WeatherXMStation",
		{ from: deployer.address, log: true },
		"renounceRole",
		DEFAULT_ADMIN_ROLE,
		deployer.address
	);

	/** ========================================== **/

	/** ========= Set license NFT access ========= **/

	// Grant license manager role
	await execute(
		"WeatherXMLicense",
		{ from: deployer.address, log: true },
		"grantRole",
		weatherXmLicense_LICENSE_MANAGER_ROLE,
		MULTISIG
	);

	// Give multisig default admin role
	await execute(
		"WeatherXMLicense",
		{ from: deployer.address, log: true },
		"grantRole",
		DEFAULT_ADMIN_ROLE,
		MULTISIG
	);

	// Renounce default admin role
	await execute(
		"WeatherXMLicense",
		{ from: deployer.address, log: true },
		"renounceRole",
		DEFAULT_ADMIN_ROLE,
		deployer.address
	);

	/** ========================================== **/
};

module.exports.tags = ["mainnet"];
