// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IServicePool {
  /* ========== CUSTOM ERRORS ========== */
  error AmountRequestedIsZero();
  /**
   * @dev Emitted when `from` burns a specific amount of WXM in order to receive the `service`
   * This event will serve as a proof of burn in order to provision the `service` to the `recipient`
   */
  event PurchasedService(address from, uint256 amount, string service);
  event AddedService(string service);
  event UpdatedService(string service, uint256 index, string name, uint256 vpu);
  event DeletedService(string service, uint256 index)

  function purchaseService(uint256 amount, uint256 duration, string memory serviceID) external;
  function getServiceAtIndex(uint index) external returns(string serviceID);
  function getServiceByUUID(string uuid) external returns (string, string, uint256, uint256);
  function addService(string _serviceID, string _name, string _description, uint256 _moq, uint256 _vpu) external returns(uint index);
  function removeService(string serviceID) external returns(bool success)
  function getServiceCount() external returns(uint count)
}
