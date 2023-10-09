// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import { IERC20Metadata } from "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";

interface IWeatherXM is IERC20Metadata {
  function burnFrom(address account, uint256 amount) external;

  function burn(uint256 amount) external;

  function owner() external view returns (address);

  function totalSupply() external view returns (uint256);

  function maxSupply() external view returns (uint256);
}
