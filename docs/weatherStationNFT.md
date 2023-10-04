# Weather Station NFT

NFT that is used to represent the physical weather stations. Follows the [PBT](https://eips.ethereum.org/EIPS/eip-5791) standard with some added functionality.

The contract is using OpenZeppelin’s AccessControl contract for fine-grained access control. The two roles that are defined are the following:

- `PROVISIONER_ROLE`: Allows minting new NFTs

The `PROVISIONER_ROLE` is managed by the `DEFAULT_ADMIN_ROLE` which on deployment is set to the deployer of the contract.


## Metadata

The `WeatherXMStation` NFT is using on-chain metadata to represent the core values of each weather station. A URI to off-chain metadata is also included in the metadata structure that represents properties not directly related with the NFT. The metadata are stored in a struct for each NFT and a valid base64 representation of the metadata for off-chain use is generated on the fly when metadata are requested.
```
struct NFTMetadata {
  string serialNum;
  string model;
  address pubKey;
  bool decomissioned;
  string image;
  string stationMetadata;
}
```
The `serialNum`, `model` and `pubKey` fields are immutable. The `serialNum` and `pubKey` must also be unique and this is enforced by the contract.

## Minting

The `PROVISIONER_ROLE` is able to mint new NFTs. The `model` of the station is checked against the `WeatherXMStationsRegistry` registry and only models that are approved are accepted.