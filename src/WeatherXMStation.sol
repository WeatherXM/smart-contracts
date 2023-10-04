// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ArbSys } from "lib/nitro-contracts/src/precompiles/ArbSys.sol";
import { IWeatherXMStation } from "./interfaces/IWeatherXMStation.sol";
import { IWeatherXMStationsRegistry } from "./interfaces/IWeatherXMStationsRegistry.sol";
import { ECDSA } from "lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import { AccessControl } from "lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import { Base64 } from "lib/openzeppelin-contracts/contracts/utils/Base64.sol";
import { ERC721 } from "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import { IERC721 } from "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";
import { ERC721Enumerable } from "lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { IERC165 } from "lib/openzeppelin-contracts/contracts/utils/introspection/IERC165.sol";
import { Strings } from "lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract WeatherXMStation is AccessControl, ERC721, ERC721Enumerable, IWeatherXMStation {
  using ECDSA for bytes32;

  /**
   * @notice The PROVISIONER_ROLE is assigned to the BurnPool Contract.
   *  */
  bytes32 public constant PROVISIONER_ROLE = keccak256("PROVISIONER_ROLE");

  uint256 public signatureBlockValidityWindow;
  IWeatherXMStationsRegistry public stationRegistry;

  struct NFTMetadata {
    string serialNum;
    string model;
    address pubKey;
    bool decomissioned;
    string image;
    string stationMetadata;
  }

  mapping(uint256 => NFTMetadata) public tokenMetadata;
  mapping(address => uint256) public tokenByPubKey;
  mapping(string => uint256) public tokenBySerialNum;

  ArbSys public arbSys;

  /* ========== CONSTRUCTOR ========== */
  constructor(string memory name, string memory symbol, address arbSysAddress) ERC721(name, symbol) {
    super._setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    super._setupRole(PROVISIONER_ROLE, _msgSender());

    arbSys = ArbSys(arbSysAddress);
  }

  function getMaxBlockhashValidWindow() public view virtual returns (uint256) {
    return signatureBlockValidityWindow;
  }

  function _baseURI() internal pure override returns (string memory) {
    return "";
  }

  function mintWeatherStation(
    address recipient,
    string memory serialNum,
    string memory model,
    address pubKey,
    string memory image,
    string memory stationMetadata
  ) external override onlyRole(PROVISIONER_ROLE) returns (bool) {
    if (tokenByPubKey[pubKey] != 0 || (tokenByPubKey[pubKey] == 0 && tokenMetadata[0].pubKey == pubKey)) {
      revert PubKeyAlreadyExists();
    }
    if (
      (tokenBySerialNum[serialNum]) != 0 ||
      (tokenBySerialNum[serialNum] == 0 &&
        keccak256(abi.encodePacked(tokenMetadata[0].serialNum)) == keccak256(abi.encodePacked(serialNum)))
    ) {
      revert SerialNumAlreadyExists();
    }
    _checkValidStationModel(model);

    uint256 newItemId = totalSupply();
    tokenMetadata[newItemId].serialNum = serialNum;
    tokenMetadata[newItemId].model = model;
    tokenMetadata[newItemId].pubKey = pubKey;
    tokenMetadata[newItemId].decomissioned = false;
    tokenMetadata[newItemId].image = image;
    tokenMetadata[newItemId].stationMetadata = stationMetadata;
    tokenByPubKey[pubKey] = newItemId;
    tokenBySerialNum[serialNum] = newItemId;

    super._safeMint(recipient, newItemId);
    emit WeatherStationOnboarded(recipient, newItemId);

    return true;
  }

  function _checkValidStationModel(string memory model) internal view {
    if(!stationRegistry.stationExists(model)) {
      revert InvalidStationModel();
    }

    (,,bool decommissioned) = stationRegistry.stations(model);

    if(decommissioned) {
      revert StationModelIsDecommissioned();
    }
  }

  function _getNFTAttributes(uint256 tokenId) internal view returns (bytes memory) {
    return
      abi.encodePacked(
        "{",
        "\"trait_type\": \"serialNum\",",
        "\"value\": \"",
        tokenMetadata[tokenId].serialNum,
        "\"",
        "},",
        "{",
        "\"trait_type\": \"model\",",
        "\"value\": \"",
        tokenMetadata[tokenId].model,
        "\"",
        "},",
        "{",
        "\"trait_type\": \"pubKey\",",
        "\"value\": \"",
        Strings.toHexString(tokenMetadata[tokenId].pubKey),
        "\"",
        "},",
        "{",
        "\"trait_type\": \"decomissioned\",",
        "\"value\": \"",
        tokenMetadata[tokenId].decomissioned ? "true" : "false",
        "\"",
        "}"
      );
  }

  function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
    if (tokenId >= totalSupply()) {
      revert TokenDoesNotExist();
    }

    bytes memory dataURI = abi.encodePacked(
      "{",
      "\"name\": \"WeatherXM Station #",
      Strings.toString(tokenId),
      "\",",
      "\"image\": \"",
      tokenMetadata[tokenId].image,
      "\",",
      "\"stationMetadata\": \"",
      tokenMetadata[tokenId].stationMetadata,
      "\",",
      "\"attributes\": [",
      _getNFTAttributes(tokenId),
      "]",
      "}"
    );

    return string(abi.encodePacked("data:application/json;base64,", Base64.encode(dataURI)));
  }

  function setSignatureValidityWindow(uint256 _signatureBlockValidityWindow) public onlyRole(DEFAULT_ADMIN_ROLE) {
    if(_signatureBlockValidityWindow > 256) {
      revert BlockValidityWindowTooBig();
    }

    signatureBlockValidityWindow = _signatureBlockValidityWindow;
  }

  function decommissionStation(uint256 stationId) public onlyRole(DEFAULT_ADMIN_ROLE) {
    if(stationId >= totalSupply()) {
      revert TokenDoesNotExist();
    }

    tokenMetadata[stationId].decomissioned = true;
  }

  function transferTokenWithChip(
    bytes calldata signatureFromChip,
    uint256 blockNumberUsedInSig,
    bool useSafeTransferFrom
  ) public {
    _transferTokenWithChip(signatureFromChip, blockNumberUsedInSig, useSafeTransferFrom);
  }

  function transferTokenWithChip(bytes calldata signatureFromChip, uint256 blockNumberUsedInSig) public {
    transferTokenWithChip(signatureFromChip, blockNumberUsedInSig, false);
  }

  function setStationRegistry(IWeatherXMStationsRegistry _stationRegistry) public onlyRole(PROVISIONER_ROLE) {
    stationRegistry = _stationRegistry;
  }

  function updateTokenMetadataAndImage(uint256 stationId, string memory image, string memory metadata) public onlyRole(PROVISIONER_ROLE) {
    if(stationId >= totalSupply()) {
      revert TokenDoesNotExist();
    }

    tokenMetadata[stationId].image = image;
    tokenMetadata[stationId].stationMetadata = metadata;
  }

  function _transferTokenWithChip(
    bytes calldata signatureFromChip,
    uint256 blockNumberUsedInSig,
    bool useSafeTransferFrom
  ) internal {
    uint256 tokenId = _getTokenIdFromSignature(signatureFromChip, blockNumberUsedInSig);
    if (useSafeTransferFrom) {
      _safeTransfer(ownerOf(tokenId), _msgSender(), tokenId, "");
    } else {
      _transfer(ownerOf(tokenId), _msgSender(), tokenId);
    }
  }

  function _getTokenIdFromSignature(
    bytes calldata signatureFromChip,
    uint256 blockNumberUsedInSig
  ) internal view returns (uint256) {
    if (arbSys.arbBlockNumber() <= blockNumberUsedInSig) {
      revert InvalidBlockNumber();
    }

    unchecked {
      if (arbSys.arbBlockNumber() - blockNumberUsedInSig > getMaxBlockhashValidWindow()) {
        revert BlockNumberTooOld();
      }
    }

    bytes32 blockHash = arbSys.arbBlockHash(blockNumberUsedInSig);
    bytes32 signedHash = keccak256(abi.encodePacked(_msgSender(), blockHash)).toEthSignedMessageHash();
    address chipAddr = signedHash.recover(signatureFromChip);

    if (tokenByPubKey[chipAddr] != 0 || (tokenByPubKey[chipAddr] == 0 && tokenMetadata[0].pubKey == chipAddr)) {
      return tokenByPubKey[chipAddr];
    }

    revert InvalidSignature();
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
  }

  function approve(address, uint256) public virtual override(ERC721, IERC721) {
    revert("ERC721 public approve not allowed");
  }

  function getApproved(uint256) public view virtual override(ERC721, IERC721) returns (address) {
    return address(0);
  }

  function setApprovalForAll(address, bool) public virtual override(ERC721, IERC721) {
    revert("ERC721 public setApprovalForAll not allowed");
  }

  function isApprovedForAll(address, address) public view virtual override(ERC721, IERC721) returns (bool) {
    return false;
  }

  function transferFrom(address, address, uint256) public virtual override(ERC721, IERC721) {
    revert("ERC721 public transferFrom not allowed");
  }

  function safeTransferFrom(address, address, uint256) public virtual override(ERC721, IERC721) {
    revert("ERC721 public safeTransferFrom not allowed");
  }

  function safeTransferFrom(address, address, uint256, bytes memory) public virtual override(ERC721, IERC721) {
    revert("ERC721 public safeTransferFrom not allowed");
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable, IERC165, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
