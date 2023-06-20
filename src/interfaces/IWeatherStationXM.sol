// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import { IAccessControl } from "@openzeppelin/contracts/access/IAccessControl.sol";
import { IERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface IWeatherStationXM is IAccessControl, IERC721Enumerable {
  /**
   * @dev Custom errors
   */
  error RecipientIsContractAddress();
  error CantTransferWSWhenNotOwning();
  error CantExchangeWSWhenNotOwning();
  error CallerIsNotTokenOwner();

  /**
   * @dev Emitted when manufacturer burns onboarding fee and mints an NFT per station
   * This event contains the origin caller address and the token ID for the NFT
   */
  event WeatherStationOnboarded(address indexed from, uint256 tokenId);
  /**
   * @dev Emitted when a user claims a weather station and its NFT
   * This event contains the origin caller address and the token ID for the NFT in focus
   */
  event WeatherStationClaimed(address indexed from, uint256 tokenId);
  /**
   * @dev Emitted when a user transfers ownership of a weather station and its NFT
   * This event contains the origin caller address and the token ID for the NFT in focus
   */
  event WeatherStationTransfered(address indexed from, address to, uint256 tokenId);
  /**
   * @dev Emitted when a user burns the NFT and this actions is triggered when the weather station is removed from network
   * This event contains the origin caller address and the token ID for the NFT in focus
   */
  event WeatherStationBurned(address indexed from, uint256 tokenId);

  //NFTs actions
  function mintWeatherStation(address recipient, string memory uri) external returns (bool);

  function burn(uint256 tokenId) external;

  function transferWeatherStation(address to, uint256 tokenId) external returns (bool);

  function exchangeWeatherStations(uint256 _tokenId1, uint256 _tokenId2) external returns (bool);

  //ops
  function pause() external;

  function unpause() external;
}
