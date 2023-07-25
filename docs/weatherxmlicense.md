# Weather License

NFT that is used to represent data licenses for commercial use.

The contract is using OpenZeppelin’s AccessControl contract for fine-grained access control. Only one role is used which is the following:

- `LICENSE_MANAGER_ROLE`: Allows minting new NFTs

## Minting new licenses

The metadata of each license are kept on-chain. The `metadata` contain the properties and the unique identifier of each license.
The properties contain an off-chain pointer on IPFS document containing the actual license. The metadata are immutable.