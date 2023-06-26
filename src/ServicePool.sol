// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
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
  IWeatherXM private token;

  /* ========== ROLES ========== */
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

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

  mapping(string  => Service) private serviceCatalog;
  string[] private serviceIndex;
  /**
   * @notice Initialize called on deployment, initiates the contract and its proxy.
   * @dev On deployment, some addresses for interacting contracts should be passed.
   * @param _token The address of WXM contract to be used for burning.
   * */
  function initialize(address _token) public initializer {
    __UUPSUpgradeable_init();
    __AccessControlEnumerable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(UPGRADER_ROLE, _msgSender());
    token = IWeatherXM(_token);
  }

  /**
   * @notice Transfer tokens and store info about the transaction.
   * @dev ERC-20 tokens require approval to be transfered.
   * The user should first approve an amount of WXM to be used by this contract.
   * Then the following fuction transfers tokens into the DAO revenue pool.
   * @param amount The amount to be transferred.
   * @param duration The duration for the service to purchase.
   * @param serviceID The service identifier for the service to purchase.
   * */
  function purchaseService(uint256 amount, uint256 duration, string memory serviceID) external override whenNotPaused nonReentrant {
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    // prior to this op is required that the user approves the _amount to be burned
    // by invoking the approve function of ERC20 contract
    token.transferFrom(_msgSender(), address(this), amount);
    emit PurchasedService(_msgSender(), amount, serviceID, duration);
  }

  function isService(string _serviceID) internal constant returns(bool) 
  {
    if(serviceIndex.length == 0) return false;
    return (serviceIndex[serviceCatalog[_serviceID].index] == _serviceID);
  }

  function getServiceAtIndex(uint _index) external returns(string serviceID){
    return serviceIndex[_index];
  }

  function getServiceByID(string _serviceID) external override returns (string, string, uint256, uint256) {
    return (serviceCatalog[_serviceID].index,
            serviceCatalog[_serviceID].name, 
            serviceCatalog[_serviceID].description, 
            serviceCatalog[_serviceID].moq, 
            serviceCatalog[_serviceID].vpu);
  }

  function addService(string _serviceID, string _name, string _description, uint256 _moq, uint256 _vpu) external override onlyRole(DEFAULT_ADMIN_ROLE) returns(uint256 index){
    if(isService(_serviceID)) throw;
    serviceCatalog[serviceID].name = _name;
    serviceCatalog[serviceID].description = _description;
    serviceCatalog[serviceID].moq = _moq;
    serviceCatalog[serviceID].vpu = _vpu;
    serviceCatalog[serviceID].index = serviceIndex.push(serviceID)-1
    emit AddedService(_serviceID)
    return serviceIndex.length-1;
  }

  function updateServiceVPU(string _serviceID, uint256 _vpu) external override onlyRole(DEFAULT_ADMIN_ROLE) returns(bool success) {
    if(!isService(_serviceID)) throw; 
    serviceCatalog[_serviceID].vpu = _vpu;
    emit UpdatedService(
      _serviceID, 
      serviceCatalog[_serviceID].index,
      serviceCatalog[_serviceID].name,
      serviceCatalog[_serviceID].vpu
      );
    return true;
  }

  function deleteService(string _serviceID) external override onlyRole(DEFAULT_ADMIN_ROLE) returns(uint256 index){
    if(!isService(_serviceID)) throw; 
    uint indexToDelete = serviceCatalog[_serviceID].index;
    address key = serviceIndex[serviceIndex.length-1];
    serviceIndex[indexToDelete] = key;
    serviceCatalog[key].index = indexToDelete; 
    serviceIndex.length--;
    emit DeleteService(_serviceID, indexToDelete);
    emit UpdatedService(
        key, 
        indexToDelete, 
        serviceCatalog[key].name, 
        serviceCatalog[key].vpu);
    return rowToDelete;
  }
  
  function getServiceCount() external override returns(uint256 count){
    return serviceIndex.length;
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
