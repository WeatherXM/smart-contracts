// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import { Ownable } from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import { SafeERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract RewardsVault is Ownable {
  /* ========== LIBRARIES ========== */
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  /* ========== CUSTOM ERRORS ========== */
  error EmissionsRateLimitingInEffect();
  error OnlyRewardDistributor();

  /* ========== STATE VARIABLES ========== */
  IERC20 public token;
  address public rewardDistributor;
  uint256 public lastRewardTs = 0;

  /* ========== CONSTANTS ========== */
  uint256 public constant maxDailyEmission = 14246 * 10 ** 18;
  uint256 public constant rewardDistributionPeriod = 1440 minutes;

  /**
   * @notice Rate limit for reward distribution.
   * @dev Every 24h is the minimum limit for pulling rewards.
   * */
  modifier emissionsRateLimit() {
    if (block.timestamp < lastRewardTs) {
      revert EmissionsRateLimitingInEffect();
    }
    lastRewardTs = lastRewardTs.add(rewardDistributionPeriod);
    _;
  }

  /**
   * @notice Access control to allow only the reward distributor to pull the rewards.
   * */
  modifier onlyRewardDistributor() {
    if (_msgSender() != rewardDistributor) {
      revert OnlyRewardDistributor();
    }
    _;
  }

  constructor(IERC20 _token, address _rewardDistributor) {
    token = _token;
    rewardDistributor = _rewardDistributor;
  }

  /**
   * @notice Sends the dialy emissions to the rewards distributor.
   * @dev Reverts if called again within less that 24 hours.
   * */
  function pullDailyEmissions() public onlyRewardDistributor emissionsRateLimit {
    if (token.balanceOf(address(this)) >= maxDailyEmission) {
      token.safeTransfer(rewardDistributor, maxDailyEmission);
    } else {
      token.safeTransfer(rewardDistributor, token.balanceOf(address(this)));
    }
  }

  /**
   * @notice Sets the reward distributor address.
   * @dev Can only be called by the owner.
   * @param _rewardDistributor The new reward distributor address
   * */
  function setRewardDistributor(address _rewardDistributor) public onlyOwner {
    rewardDistributor = _rewardDistributor;
  }
}
