// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { RewardPool } from "../../RewardPool.sol";

/**
 * @title RewardPool contract upgrade.
 *
 * @notice This constract serves as the testing suite for upgradeability.
 *
 * */
contract RewardPoolV2 is RewardPool {
  // add this to be excluded from coverage report
  function test() public {}

  function version() public pure returns (string memory) {
    return "V2";
  }
}
