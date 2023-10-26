// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IRewardPool {
  /**
   * @dev Custom errors
   */
  error RewardsRateLimitingInEffect();
  error CallerShouldNotBeThisContract();
  error AmountRequestedIsZero();
  error TotalRewardsAreZero();
  error AmountIsOverAvailableRewardsToClaim();
  error TransferFailed();
  error TargetAddressIsZero();
  error TargetAddressIsContractAddress();
  error TotalRewardsExceedEmissionFromVault();
  error SignatureNonceHasAlreadyBeenUsed();
  error InvalidSignature();

  /**
   * @dev Emitted when root hash is submitted
   * This event contains the root hash and the cycle indicated when it was submitted
   */
  event SubmittedRootHash(uint256 cycle, bytes32 root);
  /**
   * @dev Emitted when rewards are claimed by user
   * This event contains user's address and the amount which was claimed
   */
  event Claimed(address indexed account, uint256 amount);
  /**
   * @dev Emitted when company tokens are transferred
   * This event contains the target address for company tokens and the amount
   */
  event CompanyTokensTransferred(address indexed to, uint256 amount);
  /**
   * @dev Emitted when business development are transferred
   * This event contains the target address for business development tokens and the amount
   */
  event BusinessDevTokensTransferred(address indexed to, uint256 amount);

  /**
   @dev Emitted when a user wants to claim rewards
   * This event contains the address of the requester and the amount
   */
  event RequestClaim(address indexed from, uint256 amount);

  //root hash submission
  function submitMerkleRoot(bytes32 root, uint256 totalRewards, uint256 boostRewards) external returns (bool);

  function claim(uint256 _amount, uint256 _totalRewards, uint256 _cycle, bytes32[] calldata proof) external;

  function getRemainingAllocatedRewards(
    address account,
    uint256 amount,
    uint256 cycle,
    bytes32[] calldata proof
  ) external view returns (uint256);

  function cycle() external returns (uint256);

  // ops
  function pause() external;

  function unpause() external;
}
