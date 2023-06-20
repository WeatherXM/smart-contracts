// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IWeatherXMMintingManager {
  function getCycle() external returns (uint256);

  function setMintTarget(address target) external;

  function dailyCompanyMint(uint256 cycle) external returns (uint256);

  function dailyRewardMint(uint256 cycle) external returns (uint256);

  function getMintedTokens() external view returns (uint256, uint256);
}
