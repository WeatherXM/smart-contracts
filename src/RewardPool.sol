// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import { MerkleProof } from "lib/openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";
import { Initializable } from "lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/security/ReentrancyGuardUpgradeable.sol";
import { PausableUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/security/PausableUpgradeable.sol";
import { SafeERC20Upgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/token/ERC20/utils/SafeERC20Upgradeable.sol";
import { IERC20Upgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/token/ERC20/IERC20Upgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/access/AccessControlEnumerableUpgradeable.sol";
import { IRewardPool } from "./interfaces/IRewardPool.sol";
import { IRewardsVault } from "./interfaces/IRewardsVault.sol";
import { ECDSA } from "lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";

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
  using SafeERC20Upgradeable for IERC20Upgradeable;
  using ECDSA for bytes32;

  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;
  using MerkleProof for bytes32[];

  /* ========== STATE VARIABLES ========== */
  IERC20Upgradeable public token;
  mapping(address => uint256) public claims;
  mapping(uint256 => bytes32) public roots;
  mapping(bytes32 => bool) public nonces;

  uint256 public cycle;
  uint256 public lastRewardRootTs;
  uint256 public claimedRewards;
  IRewardsVault public rewardsVault;
  address public rewardsChangeTreasury;
  uint256 public firstRewardCycleTs;

  /* ========== ROLES ========== */
  bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

  /* ========== CONSTANTS ========== */
  uint256 public constant merkleRootSubmissionPeriod = 1440 minutes;

  /**
   * @notice Rate limit for submitting root hashes.
   * @dev Every 24h is the minimum limit for submitting root hashes for rewards
   * due to the fact that every 24h, the minting is going to take place for the first 10ys
   * */
  modifier rateLimit() {
    if (firstRewardCycleTs == 0) {
      firstRewardCycleTs = block.timestamp;
    } else {
      uint256 currCycle = getCurrCycle();

      if (cycle >= currCycle) {
        revert RewardsRateLimitingInEffect();
      }
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

  function initialize(address _token, address _rewardsVault, address _rewardsChangeTreasury) public initializer {
    __UUPSUpgradeable_init();
    __AccessControlEnumerable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(UPGRADER_ROLE, _msgSender());
    _setupRole(DISTRIBUTOR_ROLE, _msgSender());
    token = IERC20Upgradeable(_token);
    lastRewardRootTs = block.timestamp;
    rewardsVault = IRewardsVault(_rewardsVault);
    rewardsChangeTreasury = _rewardsChangeTreasury;
  }

  /**
   * Calculate and return the current cycle based on the current timestamp and the first time we submitted a Merkle root
   */
  function getCurrCycle() public view returns (uint256) {
    uint256 currCycle = ((block.timestamp - firstRewardCycleTs) / merkleRootSubmissionPeriod) + 1;

    return currCycle;
  }

  /**
   * @notice Submit root hash for rewards.
   * @dev The root hash is calculated of chain and submitted every day.
   * The root hash is stored also off chain in order to calculate each
   * recipient's daily proof if requested for withdrawal.
   * The root hashes are stored in a mapping where the cycle is the accessor.
   * For every cycle there is only one root hash.
   * @param root The root hash containing the cumulative rewards plus the daily rewards.
   * @param baseRewards The rewards being allocated based on the daily emissions. Not including any rewards coming from boosts
   * @param boostRewards The amount of rewards that are being allocated as part of a boost.
   * */
  function submitMerkleRoot(
    bytes32 root,
    uint256 baseRewards,
    uint256 boostRewards
  ) external override onlyRole(DISTRIBUTOR_ROLE) rateLimit whenNotPaused returns (bool) {
    uint256 activeCycle = cycle;
    roots[activeCycle] = root;

    uint256 balanceBefore = token.balanceOf(address(this));
    rewardsVault.pullDailyEmissions();
    uint256 balanceAfter = token.balanceOf(address(this));
    uint256 delta = balanceAfter - balanceBefore;

    // The rewards vault will always send as much as it has up to the daily emissions amount.
    // If are distributing less than the daily emission send the change to the treasury.
    // The boost is coming from a different pool so it doesnt count again the change
    if (delta > baseRewards) {
      token.safeTransfer(rewardsChangeTreasury, delta - baseRewards);
    } else if (delta < baseRewards) {
      revert TotalRewardsExceedEmissionFromVault();
    }

    if (boostRewards > 0) {
      token.safeTransferFrom(rewardsChangeTreasury, address(this), boostRewards);
    }

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
    return _allocatedRewardsForProofMinusRewarded(account, amount, _cycle, proof);
  }

  /**
   * @notice Get available balance of rewards.
   * @dev Calculate available rewards to claim by substracting from cumultaive rewards the already claim.
   * @param account The account of the recipient
   * @param amount The cumulative amount of rewards up to the selected cycle
   * @param _cycle cycle for which to choose the root hash
   * @param proof The recipient's proof
   * */
  function _allocatedRewardsForProofMinusRewarded(
    address account,
    uint256 amount,
    uint256 _cycle,
    bytes32[] calldata proof
  ) internal view returns (uint256) {
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    uint256 total = _verify(account, amount, _cycle, proof);
    if (claims[account] < total) {
      return total.sub(claims[account]);
    } else {
      return 0;
    }
  }

  /**
   * @notice Verify proof for the chosen root hash.
   * @param account The account of the recipient
   * @param amount The cumulative amount of tokens
   * @param _cycle The desired cycle for which to choose the root hash
   * @param proof The _proof that enables the claim of the requested amount of tokens
   * */
  function _verify(
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
   * @param amount The amount of tokens to claim.
   * @param _totalRewards The cumulative amount of rewards up to the point of the requested cycle.
   * @param _cycle The desired cycle for which to choose the root hash.
   * @param proof The _proof that enables the claim of the requested amount of tokens.
   */
  function claim(
    uint256 amount,
    uint256 _totalRewards,
    uint256 _cycle,
    bytes32[] calldata proof
  ) external whenNotPaused nonReentrant {
    if (_totalRewards == 0) {
      revert TotalRewardsAreZero();
    }
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    if (amount > _allocatedRewardsForProofMinusRewarded(_msgSender(), _totalRewards, _cycle, proof)) {
      revert AmountIsOverAvailableRewardsToClaim();
    }

    claims[_msgSender()] = claims[_msgSender()].add(amount);
    claimedRewards = claimedRewards.add(amount);
    token.safeTransfer(_msgSender(), amount);

    emit Claimed(_msgSender(), amount);
  }

  /**
   * @notice Claim rewads on behalf of a user by providing a signature from them.
   * @dev Anyone can claim rewards on behalf of a user by providing a signature from that user.
   * The signature contains a fee field which the sender can take from the claime rewards for sending the transaction.
   * The fee cannot me more than the rewards being claimed.
   * @param rewardReceiver The address of the user that provided the signature and is claiming rewards
   * @param amount The amount of rewards to be claimed
   * @param totalRewards The total amount of rewards that have been allocated to the user in that cycle
   * @param _cycle The cycle from which the user is claiming rewards
   * @param claimForFee The fee that the transaction sender is taking
   * @param proof The _proof that enables the claim of the requested amount of tokens.
   * @param nonce The nonce used in the signature
   * @param signature The signature from the user that is claiming the rewards
   */
  function claimFor(
    address rewardReceiver,
    uint256 amount,
    uint256 totalRewards,
    uint256 _cycle,
    uint256 claimForFee,
    bytes32[] calldata proof,
    bytes32 nonce,
    bytes calldata signature
  ) external whenNotPaused nonReentrant {
    _verifySignatureForClaimFor(_msgSender(), rewardReceiver, amount, _cycle, claimForFee, nonce, signature);
    if (totalRewards == 0) {
      revert TotalRewardsAreZero();
    }
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    if (amount > _allocatedRewardsForProofMinusRewarded(rewardReceiver, totalRewards, _cycle, proof)) {
      revert AmountIsOverAvailableRewardsToClaim();
    }

    claims[rewardReceiver] = claims[rewardReceiver].add(amount);
    claimedRewards = claimedRewards.add(amount);
    // The user that is claiming gets the claimed amount minus the fee
    token.safeTransfer(rewardReceiver, amount - claimForFee);
    // The sender of the meta transaction gets the fee
    token.safeTransfer(_msgSender(), claimForFee);

    emit Claimed(rewardReceiver, amount);
  }

  function _verifySignatureForClaimFor(
    address txSender,
    address rewardReceiver,
    uint256 amount,
    uint256 _cycle,
    uint256 claimForFee,
    bytes32 nonce,
    bytes calldata signature
  ) internal {
    if (nonces[nonce]) {
      revert SignatureNonceHasAlreadyBeenUsed();
    }
    bytes32 DOMAIN_SEPARATOR;
    string memory MESSAGE_TYPE = "ClaimRewards(address sender,uint256 amount,uint256 cycle,uint256 fee,bytes32 nonce)";

    {
      string memory name = "RewardPool";
      address verifyingContract = address(this);

      uint256 chainId;
      assembly {
        chainId := chainid()
      }
      string memory EIP712_DOMAIN_TYPE = "EIP712Domain(string name,uint256 chainId,address verifyingContract)";

      DOMAIN_SEPARATOR = keccak256(
        abi.encode(
          keccak256(abi.encodePacked(EIP712_DOMAIN_TYPE)),
          keccak256(abi.encodePacked(name)),
          chainId,
          verifyingContract
        )
      );
    }

    bytes32 signedHash = keccak256(
      abi.encodePacked(
        "\x19\x01", // backslash is needed to escape the character
        DOMAIN_SEPARATOR,
        keccak256(abi.encode(keccak256(abi.encodePacked(MESSAGE_TYPE)), txSender, amount, _cycle, claimForFee, nonce))
      )
    );

    address signer = signedHash.recover(signature);

    if (signer != rewardReceiver) {
      revert InvalidSignature();
    }

    nonces[nonce] = true;
  }

  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._pause();
  }

  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._unpause();
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
