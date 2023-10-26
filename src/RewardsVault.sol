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
  uint256 public lastRewardDistributionDayIndex = 0;
  uint256 public firstRewardTs = 0;

  /* ========== CONSTANTS ========== */
  uint256 public constant maxDailyEmission = 14246 * 10 ** 18;
  uint256 public constant rewardDistributionPeriod = 1440 minutes;

  /**
   * @notice Rate limit for reward distribution.
   * @dev Every 24h is the minimum limit for pulling rewards.
   * */
  modifier emissionsRateLimit() {
    // This is the first time we pull rewards
    if (firstRewardTs == 0) {
      firstRewardTs = block.timestamp;
    } else {
      uint256 currIndex = getCurrIndex();

      if (lastRewardDistributionDayIndex >= currIndex) {
        revert EmissionsRateLimitingInEffect();
      }
    }
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
   * Returnes the current index for the emission schedule based on the current block timestamp
   * and the first time we pulled rewards. The return value is valid only after the first time we pull rewards
   */
  function getCurrIndex() public view returns (uint256) {
    uint256 currIndex = ((block.timestamp - firstRewardTs) / rewardDistributionPeriod) + 1;

    return currIndex;
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

    lastRewardDistributionDayIndex = lastRewardDistributionDayIndex + 1;
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
