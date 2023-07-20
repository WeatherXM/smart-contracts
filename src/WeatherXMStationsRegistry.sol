// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { Initializable } from "lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "lib/openzeppelin-contracts-upgradeable/contracts/access/AccessControlEnumerableUpgradeable.sol";
import { IWeatherXMStationsRegistry } from "src/interfaces/IWeatherXMStationsRegistry.sol";

contract WeatherXMStationsRegistry is
  Initializable,
  UUPSUpgradeable,
  AccessControlEnumerableUpgradeable,
  IWeatherXMStationsRegistry
{
  /* ========== ROLES ========== */
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
  bytes32 public constant STATIONS_MANAGER_ROLE = keccak256("STATIONS_MANAGER_ROLE");

  struct WeatherXMStation {
    uint256 index;
    string metadataURI;
    bool decommissioned;
  }

  mapping(string => WeatherXMStation) public stations;
  string[] public stationIndex;

  modifier validStation(string memory model) {
    if (!stationExists(model)) {
      revert InvalidStation();
    }
    _;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() public initializer {
    __UUPSUpgradeable_init();
    __AccessControlEnumerable_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(STATIONS_MANAGER_ROLE, _msgSender());
    _setupRole(UPGRADER_ROLE, _msgSender());
  }

  /**
   * @notice Add a new station model in the registry.
   * @dev The station model must not already exist
   * @param model The model for the station to add
   * @param metadataURI The uri pointing to the station model metadata
   */
  function addStation(string memory model, string memory metadataURI) public onlyRole(STATIONS_MANAGER_ROLE) {
    if (stationExists(model)) {
      revert StationAlreadyExists();
    }

    stationIndex.push(model);
    stations[model].metadataURI = metadataURI;
    stations[model].decommissioned = false;
    stations[model].index = stationIndex.length - 1;
  }

  /**
   * @notice Set the value of decommission for the specified station model.
   * Only the STATIONS_MANAGER_ROLE can call.
   * @param model The station model to set decommissioned for
   * @param decommissioned The value to set for decommissioned
   */
  function setDecommissioned(
    string memory model,
    bool decommissioned
  ) public onlyRole(STATIONS_MANAGER_ROLE) validStation(model) {
    stations[model].decommissioned = decommissioned;
  }

  /**
   * @notice Set the URI for the specified station model.
   * Only the STATIONS_MANAGER_ROLE can call.
   * @param model The station model to set the URI for
   * @param metadataURI The URI to set
   */
  function setURI(
    string memory model,
    string memory metadataURI
  ) public onlyRole(STATIONS_MANAGER_ROLE) validStation(model) {
    stations[model].metadataURI = metadataURI;
  }

  /**
   * @notice Returns the number of stations in the registry
   */
  function getStationsLength() public view returns (uint256) {
    return stationIndex.length;
  }

  /**
   * @notice Evaluate whether the station or not.
   * @param _model The stations identifier for the station to be evaluated.
   */
  function stationExists(string memory _model) public view returns (bool) {
    if (stationIndex.length == 0) return false;
    return (keccak256(abi.encodePacked(stationIndex[stations[_model].index])) == keccak256(abi.encodePacked(_model)));
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
