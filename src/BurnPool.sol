// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import { AccessControlEnumerableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { IWeatherXM } from "./interfaces/IWeatherXM.sol";
import { IBurnPool } from "./interfaces/IBurnPool.sol";
import { IWeatherStationXM } from "./interfaces/IWeatherStationXM.sol";

/**
 * @title BurnPool contract.
 *
 * @notice This contract accounts burning WXM tokens for getting services.
 *
 * @dev The owner of the contract can view who burnt already and for which service.
 * Anyone can burn tokens from his account based upon previous approval.
 * */
contract BurnPool is
  Initializable,
  UUPSUpgradeable,
  ReentrancyGuardUpgradeable,
  AccessControlEnumerableUpgradeable,
  PausableUpgradeable,
  IBurnPool
{
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;
  /* ========== STATE VARIABLES ========== */
  IWeatherXM private token;
  IWeatherStationXM private weatherStation;

  /* ========== ROLES ========== */
  bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
  bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  /**
   * @notice Initialize called on deployment, initiates the contract and its proxy.
   * @dev On deployment, some addresses for interacting contracts should be passed.
   * @param _token The address of WXM contract to be used for burning.
   * @param _weatherstation The address for WeatherStation contract to mint NFT per station when burning onboarding fee.
   * */
  function initialize(address _token, address _weatherstation) public initializer {
    __UUPSUpgradeable_init();
    __AccessControlEnumerable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(UPGRADER_ROLE, _msgSender());
    token = IWeatherXM(_token);
    weatherStation = IWeatherStationXM(_weatherstation);
  }

  /**
   * @notice Burn tokens and store info about the transaction.
   * @dev ERC-20 tokens require approval to be spent by third parties.
   * The user should first approve an amount of WXM to be used by this contract.
   * Then the following fuction transfers tokens on its address and burns them.
   * @param amountWXM The amount to be burned.
   * @param service The service identifier that the end user will receive from the billing system.
   * */
  function burnForService(uint256 amountWXM, string memory service) external override whenNotPaused nonReentrant {
    if (amountWXM == 0) {
      revert AmountRequestedIsZero();
    }
    // prior to this op is required that the user approves the _amount to be burned
    // by invoking the approve function of ERC20 contract
    token.burnFrom(_msgSender(), amountWXM);
    // the price corresponds to the WXM/USD pair
    emit BurnedForService(_msgSender(), amountWXM, service);
  }

  /**
   * @notice Burn onboarding fee.
   * @dev ERC-20 tokens require approval to be spent by third parties.
   * The user should first approve an amount of WXM to be used by this contract.
   * Then the following fuction transfers tokens on its address, burns them and mints an NFT for the weather station.
   * @param amount The amount to burn for onboarding.
   * @param uri The ipfs URI for the weather station's metadata.
   * */
  function burnOnboardingFee(
    uint256 amount,
    string memory uri
  ) external override onlyRole(MANUFACTURER_ROLE) whenNotPaused nonReentrant returns (bool) {
    //TODO should check the WXM price through oracles when burning and register it in the Struct
    if (amount == 0) {
      revert AmountRequestedIsZero();
    }
    token.burnFrom(_msgSender(), amount);
    bool onboarded = weatherStation.mintWeatherStation(_msgSender(), uri);
    if (!onboarded) {
      revert DeviceWasNotOnboarded();
    }
    emit BurnedOnboardingFee(_msgSender(), amount);
    return true;
  }

  /**
   * @notice Pause all ops in BurnPool.
   * @dev Only the Admin can pause the smart contract.
   * */
  function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._pause();
  }

  /**
   * @notice Unpause all ops in BurnPool.
   * @dev Only the Admin can unpause the smart contract..
   * */
  function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
    super._unpause();
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
