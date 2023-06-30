// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { MerkleProof } from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import { IWeatherXM } from "./interfaces/IWeatherXM.sol";
import { IRewardPool } from "./interfaces/IRewardPool.sol";
//solhint-disable-next-line no-console
import { console } from "forge-std/console.sol";

/**
 * @title RewardPool contract.
 *
 * @notice This constract serves as a rewards allocation pool.
 *
 * */

contract RewardPool is
  Initializable,
  UUPSUpgradeable,
  ReentrancyGuardUpgradeable,
  AccessControlEnumerableUpgradeable,
  IRewardPool,
  PausableUpgradeable
{
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;
  using MerkleProof for bytes32[];

  /* ========== STATE VARIABLES ========== */
  IWeatherXM public token;
  mapping(address => uint256) public claims;
  mapping(uint256 => bytes32) public roots;

  uint256 public cycle;
  uint256 private lastRewardRootTs;
  uint256 public claimedRewards;

  /* ========== ROLES ========== */
  bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

  struct RequestedClaim {
    uint amount;
    uint time;
  }
  mapping(address => RequestedClaim) public latestRequestedClaims;
  uint public claimWaitPeriod;

  /**
   * @notice Rate limit for submitting root hashes.
   * @dev Every 24h is the minimum limit for submitting root hashes for rewards
   * due to the fact that every 24h, the minting is going to take place for the first 10ys
   * @param period The period for which to enforce the rate limit
   * */
  modifier rateLimit(uint256 period) {
    if (block.timestamp < lastRewardRootTs) {
      revert RewardsRateLimitingInEffect();
    }
    lastRewardRootTs = lastRewardRootTs.add(period);
    _;
  }

  modifier requestClaimExists() {
    if (latestRequestedClaims[_msgSender()].amount == 0) {
      revert NoRequestClaim();
    }
    _;
  }

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

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address _token) public initializer {
    __UUPSUpgradeable_init();
    __AccessControlEnumerable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(UPGRADER_ROLE, _msgSender());
    token = IWeatherXM(_token);
    lastRewardRootTs = block.timestamp;
    claimWaitPeriod = 30 minutes;
  }

  /**
   * @notice Submit root hash for rewards.
   * @dev The root hash is calculated of chain and submitted every day.
   * The root hash is stored also off chain in order to calculate each
   * recipient's daily proof if requested for withdrawal.
   * The root hashes are stored in a mapping where the cycle is the accessor.
   * For every cycle there is only one root hash.
   * @param root The root hash containing the cumulative rewards plus the daily rewards.
   * */
  function submitMerkleRoot(
    bytes32 root
  ) external override onlyRole(DISTRIBUTOR_ROLE) rateLimit(1440 minutes) whenNotPaused returns (bool) {
    uint256 activeCycle = cycle;
    roots[activeCycle] = root;
    cycle++;
    emit SubmittedRootHash(cycle, root);
    return true;
  }

  /**
   * @notice Get remaining rewards to claim.
   * @param account The account of the recipient
   * @param amount The cumulative amount of rewards up to the selected cycle
   * @param _cycle cycle for which to choose the root hash
   * @param proof The recipient's proof
   * */
  function getRemainingAllocatedRewards(
    address account,
    uint256 amount,
    uint256 _cycle,
    bytes32[] calldata proof
  ) external view override whenNotPaused returns (uint256) {
    return allocatedRewardsForProofMinusRewarded(account, amount, _cycle, proof);
  }

  /**
   * @notice Get available balance of rewards.
   * @dev Calculate available rewards to claim by substracting from cumultaive rewards the already claim.
   * @param account The account of the recipient
   * @param amount The cumulative amount of rewards up to the selected cycle
   * @param _cycle cycle for which to choose the root hash
   * @param proof The recipient's proof
   * */
  function allocatedRewardsForProofMinusRewarded(
    address account,
    uint256 amount,
    uint256 _cycle,
    bytes32[] calldata proof
  ) internal view returns (uint256) {
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    uint256 total = verify(account, amount, _cycle, proof);
    if (claims[account] < total) {
      return total.sub(claims[account]);
    } else {
      return 0;
    }
  }

  /**
   * @notice Transfer rewards to a recipient.
   * @dev Receives the amount and proof for a specific recipient defined by the address and transfers the rewards.
   * The amount should be lower or equal to the available rewards to transfer.
   * @param to The recipient's address
   * @param amount The amount to transfer (in WEI)
   * @param totalRewards The cumulative amount of rewards up to the point of the requested cycle
   * @param _cycle The desired cycle for which to choose the root hash
   * @param proof The _proof that enables the claim of the requested amount of tokens
   * */
  function transferRewards(
    address to,
    uint256 amount,
    uint256 totalRewards,
    uint256 _cycle,
    bytes32[] calldata proof
  ) external override onlyRole(DISTRIBUTOR_ROLE) whenNotPaused nonReentrant validDestination(to) returns (bool) {
    if (totalRewards == 0) {
      revert TotalRewardsAreZero();
    }
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    if (amount > allocatedRewardsForProofMinusRewarded(to, totalRewards, _cycle, proof)) {
      revert AmountIsOverAvailableRewardsToClaim();
    }
    claims[to] = claims[to].add(amount);
    claimedRewards = claimedRewards.add(amount);
    latestRequestedClaims[to].amount = 0;
    if (!token.transfer(to, amount)) {
      revert TransferFailed();
    }
    return true;
  }

  /**
   * @notice Verify proof for the chosen root hash.
   * @param account The account of the recipient
   * @param amount The cumulative amount of tokens
   * @param _cycle The desired cycle for which to choose the root hash
   * @param proof The _proof that enables the claim of the requested amount of tokens
   * */
  function verify(
    address account,
    uint256 amount,
    uint256 _cycle,
    bytes32[] calldata proof
  ) internal view returns (uint256) {
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(account, amount))));
    require(MerkleProof.verify(proof, roots[_cycle], leaf), "INVALID PROOF");
    return amount;
  }

  /**
   * @notice Request Claim Rewards
   * @dev Anyone can claim own rewards by submitting a request amount and a proof.
   * The amount should be lower or equal to the available allocated to withdraw.
   * @param _amount The amount of tokens to claim.
   * @param _totalRewards The cumulative amount of rewards up to the point of the requested cycle.
   * @param _cycle The desired cycle for which to choose the root hash.
   * @param proof The _proof that enables the claim of the requested amount of tokens.
   */
  function requestClaim(uint256 _amount, uint256 _totalRewards, uint256 _cycle, bytes32[] calldata proof) external {
    if (_totalRewards == 0) {
      revert TotalRewardsAreZero();
    }
    if (_amount == 0) {
      revert AmountRequestedIsZero();
    }
    if (_amount > allocatedRewardsForProofMinusRewarded(_msgSender(), _totalRewards, _cycle, proof)) {
      revert AmountIsOverAvailableRewardsToClaim();
    }
    latestRequestedClaims[_msgSender()] = RequestedClaim({ amount: _amount, time: block.timestamp });
    emit RequestClaim(_msgSender(), _amount);
  }

  /**
   * @notice Claim rewards.
   * @dev Anyone can claim own rewards by submitting the amount and a proof.
   * The amount should be lower or equal to the available allocated to withdraw.
   * */
  function claim() external override requestClaimExists whenNotPaused nonReentrant {
    if (block.timestamp > latestRequestedClaims[_msgSender()].time + claimWaitPeriod) {
      uint amountToClaim = latestRequestedClaims[_msgSender()].amount;
      latestRequestedClaims[_msgSender()].amount = 0;
      claims[_msgSender()] = claims[_msgSender()].add(amountToClaim);
      claimedRewards = claimedRewards.add(amountToClaim);
      if (!token.transfer(_msgSender(), amountToClaim)) {
        revert TransferFailed();
      }
      emit Claimed(_msgSender(), amountToClaim);
    } else {
      revert WaitingPeriodInEffect();
    }
  }

  /**
   * @notice Update claim wait period.
   * */
  function updateClaimWaitPeriod(uint _claimWaitPeriod) external override onlyRole(DISTRIBUTOR_ROLE) {
    claimWaitPeriod = _claimWaitPeriod;
  }

  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._pause();
  }

  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._unpause();
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
