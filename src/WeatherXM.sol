// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "lib/openzeppelin-contracts/contracts/utils/math/SafeMath.sol";
import { ERC20 } from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import { ERC20Capped } from "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract WeatherXM is ERC20, ERC20Capped {
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;

  /* ========== CONSTANTS ========== */
  uint256 public constant maxSupply = 1e8 * 10 ** 18;

  /* ========== CUSTOM ERRORS ========== */
  error TokenTransferWhilePaused();

  constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) ERC20Capped(maxSupply) {
    _mint(_msgSender(), maxSupply);
  }

  function burn(uint256 amount) external {
    super._burn(_msgSender(), amount);
  }

  function burnFrom(address account, uint256 amount) external {
    super._spendAllowance(account, _msgSender(), amount);
    super._burn(account, amount);
  }

  function _mint(address account, uint256 amount) internal override(ERC20, ERC20Capped) {
    ERC20Capped._mint(account, amount);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
    super._beforeTokenTransfer(from, to, amount);
  }
}
