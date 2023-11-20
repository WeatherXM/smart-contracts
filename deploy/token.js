module.exports = async ({ deployments }) => {
	const { deploy } = deployments;
	const [deployer] = await ethers.getSigners();

	await deploy("WeatherXM", {
		from: deployer.address,
		args: ["WeatherXM", "WXM"],
		log: true,
	});
};

module.exports.tags = ["token"];
