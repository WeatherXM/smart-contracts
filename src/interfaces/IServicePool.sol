// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IServicePool {
  /**
   * @dev Custom errors
   */
  error AmountRequestedIsZero();
  error InvalidServiceId();
  error ServiceIdAlreadyExists();
  error BelowMOQ();

  /**
   * @dev Emitted when `from` burns a specific amount of WXM in order to receive the `service`
   * This event will serve as a proof of burn in order to provision the `service` to the `recipient`
   */
  event PurchasedService(address from, uint256 amount, string service, uint256 duration, address paymentToken);
  event AddedService(string service);
  event UpdatedService(string service, uint256 index, string name, uint256 vpu);
  event DeletedService(string service, uint256 index);

  function purchaseService(uint256 amount, uint256 duration, string memory serviceID) external;

  function purchaseService(uint256 duration, string memory serviceID) external;

  function getServiceAtIndex(uint index) external returns (string memory serviceID);

  function getServiceByID(string memory uuid) external returns (uint256, string memory, uint256, uint256);

  function addService(
    string memory _serviceId,
    string memory _name,
    uint256 _moq,
    uint256 _vpu
  ) external returns (uint index);

  function deleteService(string memory serviceId) external returns (uint256 index);

  function getServiceCount() external returns (uint count);
}
