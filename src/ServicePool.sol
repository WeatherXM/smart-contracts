// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import { Initializable } from "lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/security/ReentrancyGuardUpgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/access/AccessControlEnumerableUpgradeable.sol";
import { PausableUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/security/PausableUpgradeable.sol";
import { SafeERC20Upgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/token/ERC20/utils/SafeERC20Upgradeable.sol";
import { IERC20Upgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/token/ERC20/IERC20Upgradeable.sol";
import { IServicePool } from "./interfaces/IServicePool.sol";

/**
 * @title ServicePool contract.
 *
 * @notice This contract accounts for transferring WXM or another ERC20 tokens for getting services.
 *
 * */
contract ServicePool is
  Initializable,
  UUPSUpgradeable,
  ReentrancyGuardUpgradeable,
  AccessControlEnumerableUpgradeable,
  PausableUpgradeable,
  IServicePool
{
  using SafeERC20Upgradeable for IERC20Upgradeable;

  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;
  /* ========== STATE VARIABLES ========== */
  IERC20Upgradeable public wxm;
  IERC20Upgradeable public basePaymentToken;
  address public treasury;

  /* ========== ROLES ========== */
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
  bytes32 public constant SERVICE_MANAGER_ROLE = keccak256("SERVICE_MANAGER_ROLE");

  modifier validService(string memory serviceId) {
    if (!_isService(serviceId)) {
      revert InvalidServiceId();
    }
    _;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  struct Service {
    uint256 index;
    string name;
    uint256 moq;
    uint256 vpu;
  }

  mapping(string => Service) public serviceCatalog;
  string[] public serviceIndex;

  /**
   * @notice Initialize called on deployment, initiates the contract and its proxy.
   * @dev On deployment, some addresses for interacting contracts should be passed.
   * @param _wxm The address of WXM contract to be used for burning.
   * */
  function initialize(address _wxm, address _basePaymentToken, address _treasury) public initializer {
    __UUPSUpgradeable_init();
    __AccessControlEnumerable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(UPGRADER_ROLE, _msgSender());
    _setupRole(SERVICE_MANAGER_ROLE, _msgSender());
    wxm = IERC20Upgradeable(_wxm);
    basePaymentToken = IERC20Upgradeable(_basePaymentToken);
    treasury = _treasury;
  }

  /**
   * @notice Purchase a service from the DAO Service Catalog
   * @dev ERC-20 tokens require approval to be transfered.
   * The user should first approve an amount of WXM to be used by this contract.
   * Then the following fuction transfers tokens into the DAO revenue pool.
   * When paying with WXM its up to the caller to specify the correct payment amount.
   * Sending the wrong amount will consider the payment invalid
   * @param amount The amount to be transferred.
   * @param duration The duration for the service to purchase.
   * @param serviceId The service identifier for the service to purchase.
   * */
  function purchaseService(
    uint256 amount,
    uint256 duration,
    string memory serviceId
  ) external override whenNotPaused nonReentrant validService(serviceId) {
    if (duration < serviceCatalog[serviceId].moq) {
      revert BelowMOQ();
    }
    // prior to this op is required that the user approves the _amount to be transferred
    // by invoking the approve function of ERC20 contract
    wxm.safeTransferFrom(_msgSender(), treasury, amount);
    emit PurchasedService(_msgSender(), amount, serviceId, duration, address(wxm));
  }

  /**
   * @notice Transfer tokens and store info about the transaction.
   * @dev ERC-20 tokens require approval to be transfered.
   * The user should first approve an amount of WXM to be used by this contract.
   * Then the following fuction transfers tokens into the DAO revenue pool.
   * When paying with a stablecoin the amount is calculated on the contract
   * @param duration The duration for the service to purchase.
   * @param serviceId The service identifier for the service to purchase.
   * */
  function purchaseService(
    uint256 duration,
    string memory serviceId
  ) external override whenNotPaused nonReentrant validService(serviceId) {
    if (duration < serviceCatalog[serviceId].moq) {
      revert BelowMOQ();
    }
    uint256 amount = duration * serviceCatalog[serviceId].vpu;
    // prior to this op is required that the user approves the _amount to be burned
    // by invoking the approve function of ERC20 contract
    basePaymentToken.safeTransferFrom(_msgSender(), treasury, amount);
    emit PurchasedService(_msgSender(), amount, serviceId, duration, address(basePaymentToken));
  }

  /**
   * @notice Evaluate whether the service exists in the catalog or not.
   * @param _serviceId The service identifier for the service to be evaluated.
   */
  function _isService(string memory _serviceId) internal view returns (bool) {
    if (serviceIndex.length == 0) return false;
    return (keccak256(abi.encodePacked(serviceIndex[serviceCatalog[_serviceId].index])) ==
      keccak256(abi.encodePacked(_serviceId)));
  }

  /**
   * @notice Get a service identifier by using its index.
   * @param _index THe service's index into the serviceIndex array.
   *
   */
  function getServiceAtIndex(uint _index) external view returns (string memory serviceId) {
    return serviceIndex[_index];
  }

  /**
   * @notice Get the service info (index, name, moq, vpu) by using its identifier.
   * @param _serviceId The service intefier.
   */
  function getServiceByID(string memory _serviceId) external view returns (uint256, string memory, uint256, uint256) {
    return (
      serviceCatalog[_serviceId].index,
      serviceCatalog[_serviceId].name,
      serviceCatalog[_serviceId].moq,
      serviceCatalog[_serviceId].vpu
    );
  }

  /**
   * @notice Add a new service into the service catalog.
   * @param _serviceId The service identifier.
   * @param _name The service name.
   * @param _moq The minimum order quantity which can be charged.
   * @param _vpu The value per unit which is charged. The unit is the moq.
   */
  function addService(
    string memory _serviceId,
    string memory _name,
    uint256 _moq,
    uint256 _vpu
  ) external override onlyRole(SERVICE_MANAGER_ROLE) returns (uint256 index) {
    if (_isService(_serviceId)) {
      revert ServiceIdAlreadyExists();
    }
    serviceIndex.push(_serviceId);
    serviceCatalog[_serviceId].name = _name;
    serviceCatalog[_serviceId].moq = _moq;
    serviceCatalog[_serviceId].vpu = _vpu;
    serviceCatalog[_serviceId].index = serviceIndex.length - 1;
    emit AddedService(_serviceId);
    return serviceIndex.length - 1;
  }

  /**
   * @notice Update the value per unit in a specific service.
   * @param _serviceId The service identifier.
   * @param _vpu The new value per unit for the service.
   */
  function updateServiceVPU(
    string memory _serviceId,
    uint256 _vpu
  ) external onlyRole(SERVICE_MANAGER_ROLE) validService(_serviceId) returns (bool success) {
    serviceCatalog[_serviceId].vpu = _vpu;
    emit UpdatedService(
      _serviceId,
      serviceCatalog[_serviceId].index,
      serviceCatalog[_serviceId].name,
      serviceCatalog[_serviceId].vpu
    );
    return true;
  }

  /**
   * @notice Update the minimum order quantity in a specific service.
   * @param _serviceId The service identifier.
   * @param _moq The new minimum order quantity for the service.
   */
  function updateServiceMOQ(
    string memory _serviceId,
    uint256 _moq
  ) external onlyRole(SERVICE_MANAGER_ROLE) validService(_serviceId) returns (bool success) {
    serviceCatalog[_serviceId].moq = _moq;
    emit UpdatedService(
      _serviceId,
      serviceCatalog[_serviceId].index,
      serviceCatalog[_serviceId].name,
      serviceCatalog[_serviceId].moq
    );
    return true;
  }

  /**
   * @notice Delete a service from the catalog.
   * @param _serviceId The service identifier of the service to delete.
   */
  function deleteService(
    string memory _serviceId
  ) external override onlyRole(SERVICE_MANAGER_ROLE) validService(_serviceId) returns (uint256 index) {
    uint indexToDelete = serviceCatalog[_serviceId].index;
    serviceIndex[indexToDelete] = serviceIndex[serviceIndex.length - 1];
    serviceCatalog[serviceIndex[indexToDelete]].index = indexToDelete;
    serviceIndex.pop();
    delete serviceCatalog[_serviceId];
    emit DeletedService(_serviceId, indexToDelete);

    // If array length is 0 it means it only had one element
    if (serviceIndex.length > 0) {
      emit UpdatedService(
        serviceIndex[indexToDelete],
        indexToDelete,
        serviceCatalog[serviceIndex[indexToDelete]].name,
        serviceCatalog[serviceIndex[indexToDelete]].vpu
      );
    }
    return indexToDelete;
  }

  /**
   * @notice Get the number of services existing in the catalog.
   */
  function getServiceCount() external view override returns (uint256 count) {
    return serviceIndex.length;
  }

  /**
   * @notice Set the base ERC20 token.
   * @param _basePaymentToken The contract address of the chosen ERC20 token.
   */
  function setBasePaymentToken(address _basePaymentToken) external onlyRole(SERVICE_MANAGER_ROLE) {
    basePaymentToken = IERC20Upgradeable(_basePaymentToken);
  }

  /**
   * @notice Pause all ops in ServicePool.
   * @dev Only the Admin can pause the smart contract.
   * */
  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._pause();
  }

  /**
   * @notice Unpause all ops in ServicePool.
   * @dev Only the Admin can unpause the smart contract..
   * */
  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._unpause();
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
