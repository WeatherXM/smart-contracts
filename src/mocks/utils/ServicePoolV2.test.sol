// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ServicePool } from "../../ServicePool.sol";

/**
 * @title RewardPool contract upgrade.
 *
 * @notice This constract serves as the testing suite for upgradeability.
 *
 * */
contract ServicePoolV2 is ServicePool {
  // add this to be excluded from coverage report
  function test() public {}

  function version() public pure returns (string memory) {
    return "V2";
  }
}
