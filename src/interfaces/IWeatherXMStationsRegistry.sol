// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IWeatherXMStationsRegistry {
  /**
   * @dev Custom errors
   */
  error InvalidStation();
  error StationAlreadyExists();

  function stationExists(string memory) external view returns (bool);

  function stations(string memory) external view returns (uint256, string memory, bool);
}
