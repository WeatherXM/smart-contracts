// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { AccessControlEnumerable } from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import { IWeatherXM } from "./interfaces/IWeatherXM.sol";
import { IWeatherXMMintingManager } from "./interfaces/IWeatherXMMintingManager.sol";

//solhint-disable-next-line no-console
import { console } from "forge-std/console.sol";

contract WeatherXMMintingManager is AccessControlEnumerable, IWeatherXMMintingManager {
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;

  /* ========== STATE VARIABLES ========== */
  IWeatherXM public token;
  address public mintTarget;
  uint256 public cycle;
  uint256 private mintingLimit;
  mapping(uint256 => uint256) public dailyCompanyMint;
  mapping(uint256 => uint256) public dailyRewardMint;
  uint256 public mintedCompanyTokens;
  uint256 public mintedRewardTokens;

  /* ========== CONSTANTS ========== */
  uint256 public constant company2yDailyMint = 8200 * 10 ** 18;
  uint256 public constant company3yDailyMint = 65753 * 10 ** 18;
  uint256 public constant rewardCapDailyMint = 14246 * 10 ** 18;
  uint256 public constant companyCap2y = 6000000 * 10 ** 18;
  uint256 public constant companyCap3y = 30000000 * 10 ** 18;
  uint256 public constant rewardCap = 52000000 * 10 ** 18;

  /* ========== ROLES ========== */
  bytes32 public constant MINT_MANAGER_ROLE = keccak256("MINT_MANAGER_ROLE");
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

  /* ========== CUSTOM ERRORS ========== */
  error MintingRateLimitingInEffect();
  error TargetAddressIsZero();
  error TargetAddressIsContractAddress();
  error MintTargetIsAlreadySet();
  error TokenIsAlreadySet();

  /**
   * @dev Emitted when a cycle is initiated with every mint
   * This event contains the new cycle
   */
  event CycleBegan(uint256 cycle);

  /**
   * @notice Check target address for token transfer or withdrawal.
   * @dev Prevent the transfer of tokens to the same address of the smart contract
   * @param to The target address
   * */
  modifier validDestination(address to) {
    if (to == address(0x0)) {
      revert TargetAddressIsZero();
    }
    if (to == address(this)) {
      revert TargetAddressIsContractAddress();
    }
    _;
  }

  /**
   * @notice Rate limit for minting.
   * @dev Every 24h is the minimum limit for minting tokens
   * @param period The period for which to enforce the rate limit
   * */
  modifier mintingRateLimit(uint256 period) {
    if (block.timestamp < mintingLimit) {
      revert MintingRateLimitingInEffect();
    }
    mintingLimit = mintingLimit.add(period);
    _;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINT_MANAGER_ROLE, _msgSender());
    mintingLimit = block.timestamp;
  }

  function mintDaily() external mintingRateLimit(1440 minutes) {
    uint256 mintAmount;
    uint256 companyAmount;
    uint256 rewardAmount;
    if (mintedCompanyTokens < companyCap2y) {
      companyAmount = companyCap2y.sub(mintedCompanyTokens);
      if (companyAmount > company2yDailyMint) {
        companyAmount = company2yDailyMint;
      }
    } else if (mintedCompanyTokens < companyCap3y) {
      companyAmount = companyCap3y.sub(mintedCompanyTokens);
      if (companyAmount > company3yDailyMint) {
        companyAmount = company3yDailyMint;
      }
    }
    rewardAmount = token.maxSupply().sub(token.totalSupply()).sub(companyAmount);
    if (rewardAmount > rewardCapDailyMint) {
      rewardAmount = rewardCapDailyMint;
    }
    mintAmount = companyAmount.add(rewardAmount);
    if (mintAmount > 0) {
      mintedCompanyTokens = mintedCompanyTokens.add(companyAmount);
      mintedRewardTokens = mintedRewardTokens.add(rewardAmount);
      _startCycle();
      dailyCompanyMint[cycle] = companyAmount;
      dailyRewardMint[cycle] = rewardAmount;
      return token.mint(mintTarget, mintAmount);
    }
  }

  function setMintTarget(address target) external override onlyRole(MINT_MANAGER_ROLE) validDestination(target) {
    if (mintTarget != address(0x0)) {
      revert MintTargetIsAlreadySet();
    }
    mintTarget = target;
  }

  function getCycle() external view override returns (uint256) {
    return cycle;
  }

  function _startCycle() internal {
    cycle = cycle.add(1);
    emit CycleBegan(cycle);
  }

  function getMintedTokens() external view returns (uint256, uint256) {
    return (mintedRewardTokens, mintedCompanyTokens);
  }

  function setToken(address _token) external onlyRole(MINT_MANAGER_ROLE) {
    if (address(token) != address(0x0)) {
      revert TokenIsAlreadySet();
    }
    token = IWeatherXM(_token);
  }
}
