// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { IWeatherStationXM } from "./interfaces/IWeatherStationXM.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract WeatherStationXM is
  ERC721,
  ERC721Enumerable,
  ERC721URIStorage,
  Pausable,
  AccessControl,
  ReentrancyGuard,
  IWeatherStationXM
{
  /* ========== LIBRARIES ========== */
  using SafeMath for uint256;

  /**
   * @notice The PROVISIONER_ROLE is assigned to the BurnPool Contract.
   *  */
  bytes32 public constant PROVISIONER_ROLE = keccak256("PROVISIONER_ROLE");
  bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");

  /* ========== CONSTRUCTOR ========== */
  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    super._setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  function _baseURI() internal pure override returns (string memory) {
    return "ipfs://";
  }

  function mintWeatherStation(
    address recipient,
    string memory uri
  ) external override whenNotPaused onlyRole(PROVISIONER_ROLE) returns (bool) {
    if (recipient == address(this)) {
      revert RecipientIsContractAddress();
    }
    uint256 newItemId = totalSupply();
    super._safeMint(recipient, newItemId);
    super._setTokenURI(newItemId, uri);
    emit WeatherStationOnboarded(recipient, newItemId);
    return true;
  }

  function burn(uint256 tokenId) external override whenNotPaused onlyRole(MANUFACTURER_ROLE) {
    if (!_isApprovedOrOwner(_msgSender(), tokenId)) {
      revert CallerIsNotTokenOwner();
    }
    _burn(tokenId);
  }

  function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
    super._pause();
  }

  function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
    super._unpause();
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  // The following functions are overrides required by Solidity.
  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    ERC721URIStorage._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return ERC721URIStorage.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721URIStorage, ERC721Enumerable, IERC165, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
