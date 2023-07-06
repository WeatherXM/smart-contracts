## Standardized Testing Data

This folder contains standardized testing data for reproducible proofs, root hash, wallets, cumulative rewards etc. This is an important addition to fuzz testing as it allows for consistent performance measures.

The data is currently used by [RewardPool.t.sol](../RewardPool.t.sol) and is loaded at test time using Foundry's `ffi` cheatcode.

The data is encoded, and is decoded into a `bytes32[100]` array at test time.

### Files

- **data_serialized.txt**: the current standard testing data file. Contains an array with 100 arrays consisting of addresses encoded to 32 bytes each and cumulative rewards encoded also to 32 bytes each. The generation script is included in [encode.ts](./encode.ts).

- **proofs_serialized.txt**: Also contains 10 arrays, each one consists of the proof for a specific address in the following positions `[3, 6, 8, 13, 16, 34, 45, 67, 87, 92]` inside the **data_serialized.txt**.

- **root.txt**: the merkle tree root hash which is generated using [Openzeppelin library](https://github.com/OpenZeppelin/merkle-tree).
