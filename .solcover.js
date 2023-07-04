module.exports = {
	measureStatementCoverage: true,
	measureFunctionCoverage: true,
	measureModifierCoverage: false,
	skipFiles: [
		"interfaces",
		"mocks",
		"test",
		"ServicePool.sol",
		"WeatherXM.sol",
		"WeatherStationXM.sol",
	],
};
