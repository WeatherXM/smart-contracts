// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IBurnPool {
  /* ========== CUSTOM ERRORS ========== */
  error AmountRequestedIsZero();
  error SenderAllowanceIsNotEnough();
  error DeviceWasNotOnboarded();
  /**
   * @dev Emitted when `from` burns a specific amount of WXM in order to receive the `service`
   * This event will serve as a proof of burn in order to provision the `service` to the `recipient`
   */
  event BurnedForService(address from, uint256 amount, string service);
  /**
   * @dev Emitted when `from` burns the onboarding fee in order to oboard weatherXM stations and mint NFTs for each one
   * This event will serve as a proof of burn in order to add the WeatherXM stations into the network
   */
  event BurnedOnboardingFee(address from, uint256 amount);

  function burnForService(uint256 _amount, string memory service) external;

  function burnOnboardingFee(uint256 amount, string memory uri) external returns (bool);
}
