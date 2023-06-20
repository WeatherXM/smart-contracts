// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IWeatherXM is IERC20Metadata {
  //ERC20 operations
  function mint(address mintTarget, uint256 mintAmount) external;

  function burnFrom(address account, uint256 amount) external;

  function burn(uint256 amount) external;

  function setMintingManager(address _mintingManager) external;

  function pause() external;

  function unpause() external;

  function owner() external view returns (address);

  function totalSupply() external view returns (uint256);

  function maxSupply() external view returns (uint256);
}
