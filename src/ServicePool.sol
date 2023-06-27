// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IWeatherXM } from "./interfaces/IWeatherXM.sol";
import { IServicePool } from "./interfaces/IServicePool.sol";

/**
 * @title ServicePool contract.
 *
 * @notice This contract accounts burning WXM tokens for getting services.
 *
 * @dev The owner of the contract can view who burnt already and for which service.
 * Anyone can burn tokens from his account based upon previous approval.
 * */
contract ServicePool is
  Initializable,
  UUPSUpgradeable,
  ReentrancyGuardUpgradeable,
  AccessControlEnumerableUpgradeable,
  PausableUpgradeable,
  IServicePool
{
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;
  /* ========== STATE VARIABLES ========== */
  IWeatherXM public wxm;
  IERC20 public basePaymentToken;
  address public treasury;

  /* ========== ROLES ========== */
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
  bytes32 public constant SERVICE_MANAGER_ROLE = keccak256("SERVICE_MANAGER_ROLE");

  /* ========== CUSTOM ERRORS ========== */
  error AmountRequestedIsZero();
  error InvalidServiceId();
  error ServiceIdAlreadyExists();

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
    string description;
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
    wxm = IWeatherXM(_wxm);
    basePaymentToken = IERC20(_basePaymentToken);
    treasury = _treasury;
  }

  /**
   * @notice Transfer tokens and store info about the transaction.
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
    // prior to this op is required that the user approves the _amount to be burned
    // by invoking the approve function of ERC20 contract
    wxm.transferFrom(_msgSender(), treasury, amount);
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
    uint256 amount = duration * serviceCatalog[serviceId].vpu;
    // prior to this op is required that the user approves the _amount to be burned
    // by invoking the approve function of ERC20 contract
    basePaymentToken.transferFrom(_msgSender(), treasury, amount);
    emit PurchasedService(_msgSender(), amount, serviceId, duration, address(basePaymentToken));
  }

  function _isService(string memory _serviceId) internal view returns (bool) {
    if (serviceIndex.length == 0) return false;
    return (keccak256(abi.encodePacked(serviceIndex[serviceCatalog[_serviceId].index])) ==
      keccak256(abi.encodePacked(_serviceId)));
  }

  function getServiceAtIndex(uint _index) external view returns (string memory serviceId) {
    return serviceIndex[_index];
  }

  function getServiceByID(
    string memory _serviceId
  ) external view returns (uint256, string memory, string memory, uint256, uint256) {
    return (
      serviceCatalog[_serviceId].index,
      serviceCatalog[_serviceId].name,
      serviceCatalog[_serviceId].description,
      serviceCatalog[_serviceId].moq,
      serviceCatalog[_serviceId].vpu
    );
  }

  function addService(
    string memory _serviceId,
    string memory _name,
    string memory _description,
    uint256 _moq,
    uint256 _vpu
  ) external override onlyRole(SERVICE_MANAGER_ROLE) returns (uint256 index) {
    if (_isService(_serviceId)) {
      revert ServiceIdAlreadyExists();
    }
    serviceIndex.push(_serviceId);
    serviceCatalog[_serviceId].name = _name;
    serviceCatalog[_serviceId].description = _description;
    serviceCatalog[_serviceId].moq = _moq;
    serviceCatalog[_serviceId].vpu = _vpu;
    serviceCatalog[_serviceId].index = serviceIndex.length - 1;
    emit AddedService(_serviceId);
    return serviceIndex.length - 1;
  }

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

  function deleteService(
    string memory _serviceId
  ) external override onlyRole(SERVICE_MANAGER_ROLE) validService(_serviceId) returns (uint256 index) {
    uint indexToDelete = serviceCatalog[_serviceId].index;
    serviceIndex[indexToDelete] = serviceIndex[serviceIndex.length - 1];
    serviceCatalog[serviceIndex[indexToDelete]].index = indexToDelete;
    serviceIndex.pop();
    emit DeletedService(_serviceId, indexToDelete);

    // If array length is 0 it means it only had one elemnt
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

  function getServiceCount() external view override returns (uint256 count) {
    return serviceIndex.length;
  }

  function setBasePaymentToken(address _basePaymentToken) external onlyRole(SERVICE_MANAGER_ROLE) {
    basePaymentToken = IERC20(_basePaymentToken);
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
