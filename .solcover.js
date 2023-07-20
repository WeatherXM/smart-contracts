module.exports = {
	measureStatementCoverage: true,
	measureFunctionCoverage: true,
	measureModifierCoverage: false,
	skipFiles: [
		"interfaces",
		"mocks",
		"test",
		"ServicePool.sol",
		"WeatherStationXM.sol",
		"WeatherXMLicense.sol",
		"RewardsVault.sol",
		"WeatherXMStationsRegistry"
	],
};
