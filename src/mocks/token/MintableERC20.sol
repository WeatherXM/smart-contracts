// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC20Burnable } from "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

/**
 * @title ERC20Mintable
 * @dev ERC20 minting logic
 */
contract MintableERC20 is ERC20Burnable {
  // add this to be excluded from coverage report
  function test() public {}

  uint256 cycle;

  constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    cycle = cycle + 1;
  }

  function getCycle() external view returns (uint256) {
    return cycle;
  }

  /**
   * @dev Function to mint tokens
   * @param value The amount of tokens to mint.
   * @return A boolean that indicates if the operation was successful.
   */
  function mint(uint256 value) public returns (bool) {
    _mint(msg.sender, value);
    return true;
  }
}
