// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Capped } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IWeatherXMMintingManager } from "./interfaces/IWeatherXMMintingManager.sol";

contract WeatherXM is Pausable, ERC20, ERC20Capped, Ownable {
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;

  /* ========== STATE VARIABLES ========== */
  IWeatherXMMintingManager public immutable mintingManager;

  /* ========== CONSTANTS ========== */
  uint256 public initialAmount = 18000000;
  uint256 public maxSupply = 1e8 * 10 ** 18;

  /* ========== CUSTOM ERRORS ========== */
  error TotalSupplyShouldNotSurpass100M();
  error TokenTransferWhilePaused();
  error MintingRateLimitingInEffect();
  error TargetAddressIsZero();
  error TargetAddressIsContractAddress();
  error OnlyMintingManager();

  modifier validDestination(address _address) {
    if (_address == address(0x0)) {
      revert TargetAddressIsZero();
    }
    if (_address == address(this)) {
      revert TargetAddressIsContractAddress();
    }
    _;
  }

  modifier onlyMintingManager() {
    if (_msgSender() != address(mintingManager)) {
      revert OnlyMintingManager();
    }
    _;
  }

  constructor(
    string memory _name,
    string memory _symbol,
    address _mintingManager
  ) ERC20(_name, _symbol) ERC20Capped(maxSupply) {
    _mint(_msgSender(), initialAmount * 10 ** uint256(decimals()));
    mintingManager = IWeatherXMMintingManager(_mintingManager);
  }

  function mint(address mintTarget, uint256 mintAmount) public whenNotPaused onlyMintingManager {
    return _mint(mintTarget, mintAmount);
  }

  function burn(uint256 amount) external {
    super._burn(_msgSender(), amount);
  }

  function burnFrom(address account, uint256 amount) external {
    super._spendAllowance(account, _msgSender(), amount);
    super._burn(account, amount);
  }

  function pause() external onlyOwner {
    super._pause();
  }

  function unpause() external onlyOwner {
    super._unpause();
  }

  function _mint(address account, uint256 amount) internal override(ERC20, ERC20Capped) {
    return ERC20Capped._mint(account, amount);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
    super._beforeTokenTransfer(from, to, amount);
    if (paused()) {
      revert TokenTransferWhilePaused();
    }
  }
}
