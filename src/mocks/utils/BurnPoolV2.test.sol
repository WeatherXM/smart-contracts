// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { BurnPool } from "../../BurnPool.sol";

/**
 * @title RewardPool contract upgrade.
 *
 * @notice This constract serves as the testing suite for upgradeability.
 *
 * */
contract BurnPoolV2 is BurnPool {
  // add this to be excluded from coverage report
  function test() public {}

  function version() public pure returns (string memory) {
    return "V2";
  }
}
