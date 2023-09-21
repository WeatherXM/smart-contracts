// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC721 } from "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { IERC165 } from "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol";
import { AccessControl } from "lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";

contract WeatherXMLicense is ERC721, ERC721Enumerable, AccessControl {
  /* ========== STATE VARIABLES ========== */
  mapping(uint256 => string) public metadata;

  /* ========== CONSTRUCTOR ========== */
  bytes32 public constant LICENSE_MANAGER_ROLE = keccak256("LICENSE_MANAGER_ROLE");

  constructor(string memory name, string memory symbol) ERC721(name, symbol) {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(LICENSE_MANAGER_ROLE, _msgSender());
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    _requireMinted(tokenId);

    return
      string(abi.encodePacked("data:application/json;base64,", Base64.encode(abi.encodePacked(metadata[tokenId]))));
  }

  function mintLicense(string memory _metadata, address to) public onlyRole(LICENSE_MANAGER_ROLE) {
    uint256 newItemId = totalSupply();
    super._safeMint(to, newItemId);
    metadata[newItemId] = _metadata;
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }
}
