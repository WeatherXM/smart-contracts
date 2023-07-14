# Merkle Tree Design

## Theory

The naive approach of holding no state on-chain and distributing tokens to every recipient in a loop comes with a couple of drawbacks, such as scaling issues, difficulty to reason about individual payments, and uncontrolled gas fees to name a few. A more extensive list is presented in the following tables. An alternative way is to utilize a Merkle tree data structure to store data on-chain, an approach that comes with the following benefits:

- Total freedom to choose what kind of data is stored on-chain
- Independent claim transactions per recipient whenever they choose
- Constant gas cost for reward allocation (independent of recipient number)
- Any amount from the allocated tokens can be transferred to the recipients’ wallets at their request
- All claiming operations are atomic transactions which leads to better traceability from on-chain data

#### Naive Approach

| Pros                                                       | Cons                                                                                                                                                                                                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daily all users retrieve in their wallets the ERC20 tokens | Unsafe because for loop can not be bounded (length of arrays is not stable)                                                                                                                                       |
| No complex implementation                                  | Intensive usage of gas (if upgrades lead to more functionality added in the for-loop then the batches length should be decreased for the transaction to succeed using max permitted gas/tx in blockchain network) |
|                                                            | Gas fees must be paid by the company (user indirectly by subtracting the fee from their rewards)when transferring tokens to owners’ wallets.                                                                      |
|                                                            | Horizontal scaling is the only solution to scale this solution(batches will increase as we go)                                                                                                                    |
|                                                            | There is no on chain-data pointing to how many tokens any station retrieved in a specific period of time (and it would be expensive to create a struct that holds all this information)                           |
|                                                            | Many ERC20 transfers are packed into a single transaction making it hard to extract info about individual transfers.                                                                                              |
|                                                            | Very hard to retrieve proof of payment for every station from on chain data as the tx logs should be parsed.                                                                                                      |

#### Merkle Tree Approach

| Pros                                                                                                                                                                 | Cons                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fast                                                                                                                                                                 | Action is required by weathwr station owners to claim ERC20 tokens to their wallets                                                                            |
| Gas fees can be paid either by company or users directly                                                                                                             | To make owners’ withdrawals available, integration with external wallets (Coinbase, MM, etc) is required. Otherwise, the company should enable ERC20 transfers |
| Users should withdraw their rewards using proof OR the company can transfer tokens to owners’ wallets by using their proofs                                          |                                                                                                                                                                |
| Proof is required to transfer or withdraw tokens to wallets                                                                                                          |                                                                                                                                                                |
| Any amount from the allocated tokens can be transferred to the owners’ wallets                                                                                       |                                                                                                                                                                |
| Vertical scaling is supported One root hash contains all information about daily rewards for all stations (this is not going to change as the network grows)         |                                                                                                                                                                |
| Each transfer of ERC20 tokens is a single transaction making it easy to extract info from on chain data                                                              |                                                                                                                                                                |
| Smart contract holds information about allocated tokens, already transferred and how many tokens were allocated in a specific period of time for every station/owner |                                                                                                                                                                |
| The amount of allocated tokens that each owner is eligible to retrieve, is encrypted in the smart contract (root hashes)                                             |                                                                                                                                                                |

## Implementation

The Merkle Tree root hash is created using [Openzeppelin library](https://github.com/OpenZeppelin/merkle-tree). Then, it is sumbitted once every day in RewardPool in order to enable weather station owners to claim their rewards. Each time a weather station owner claims his rewards the [MerkleProof](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol) lib is orchestrated to validate the proof.

The data in the Merkle tree's leaf nodes are the address of each weather station owner and the cumulative rewards for all his stations. Metadata about the merkle tree such as the latest cycle and all proofs will be submitted in a predefined IPFS CID, in order to enable weather station owners to perform programmatically the claiming of rewards. Another reason why we provide all this info, is to promote transparency and integrity.

The Merkle Tree root hash is created using the [Openzeppelin library](https://github.com/OpenZeppelin/merkle-tree). Then, it is submitted once every day in RewardPool in order to enable weather station owners to claim their rewards. Each time a weather station owner claims their rewards the [MerkleProof](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol) lib is orchestrated to validate the proof.

The data in the Merkle tree's leaf nodes are the address of each weather station owner and the cumulative rewards for all their stations. Metadata about the merkle tree such as the latest cycle and all proofs will be submitted in a predefined IPFS CID, in order to enable weather station owners to perform programmatically the claiming of rewards. Another reason why we provide all this info is to promote transparency and integrity.

### Claiming Rewards

All station owners can claim their rewards at any time without time or other limits. Every owner initiates the process of claiming and signing the claim transaction with their private key at the front end (clients) through Metamask or another wallet, or programmatically by interacting directly with the smart contract. Therefore, a station owner can claim only their rewards. During the claim, the required parameters by the smart contract are the latest proof, their cumulative rewards, the latest cycle, and finally the amount to claim which can be smaller or equal to the total amount of cumulative rewards. The cycle has been introduced in order to track each minting cycle. Each time a new merkle root is submitted a new cycle is created.

All these parameters (proof, cumulative rewards, cycle, and requested amount) will be added to the claim transaction on the fly from the backend given that the transaction is initiated through a WeatherXM client. In case the transaction is initiated programmatically, the station owner has to sign the transaction with his private key similar to the first approach, and fill in all required info manually for the transaction to succeed by using some framework such as [Web3.js](https://github.com/web3/web3.js/) or [ethersjs](https://github.com/ethers-io/ethers.js/). The latest proof can be retrieved through IPFS and the rest of the info which is required for the programmatic approach to succeed will be provided through the WeatherXM dashboard. The station owner can choose the amount he wishes to claim and given this one is eligible, then the WXM amount of his choosing will be transferred to his wallet upon successful claiming.
