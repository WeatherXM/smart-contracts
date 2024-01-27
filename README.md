# WeatherXM

This repo contains all contracts and tests relevant to WeatherXM network. WeatherXM is a community powered weather network, that rewards weather station owners and provides accurate weather services to Web3 enterprises.

## Branches

- `releases` contain complete, tested and audited contract code, generally on mainnet
- `main` contains complete, tested and audited contract code
- `develop` is for the pre-release code, with new features, not yet audited

## Architecture

As more logic is transferred into smart contracts, a need for grouping of functionality and modularity emerges. That is why multiple Smart Contracts are now created, each with its own logic and design patterns:

- WeatherXM
- WeatherStationXM
- RewardPool
- ServicePool


### Assumptions

- Different Admins can be assigned to each contract after deployment to the network by assigning roles.
- Admin has a lot of power and is assumed to be the right, fair, and just person/party. It is highly advised to have a multisig as admin, rather than just an EOA.
- The entire supply of tokens is minted upon deployment to the deployer of the token. The deployer is then responsible for transferring the tokens to the correct wallets after the deployment. These wallets will include vestings, rewards, and any other allocation as described in the white paper and tokens emissions section in the docs [Token Emissions](./docs/emissions)

### Rules

- Fund RewardPool every day with the daily amount of rewards to be claimed ([Token Emissions](./docs/emissions.md)).
- The daily rewards are calculated externally by the rewarding mechanism and then a merkle tree root hash is submitted to the RewardPool
- Submitting the root hash once per day.
- Tokens in circulation should never be more than maximum supply (100M).
- The total sum of tokens in the RewardPool must always be enough for everyone to claim their full allocation.
- Available rewards to be claimed for each user are calculated based on the parameters, cumulative amount, the user's wallet address, the cycle and the Merkle proof and the amount of rewards already claimed.
- A user cannot claim more than their toal allocated rewards in the RewardPool.
- The maximum amount a user can claim is constrained by the chosen cycle and the provided Merkle proof, so it is advised to use the proof for the latest cycle.
- In each cycle, each user has only one valid proof.
- Anyone can buy services through the ServicePool contract.
- Proof of purchase (a transaction hash of the transaction from the service purchase through ServicePool) is required for the provision of services
- The remaining tokens from the rewarding fo all weather stations in a daily basis are transferred to the [Bussiness Development pool](./docs/pools.md)

### Merkle Tree and Claiming Rewards

You may find more info about the implementation of Merkle Tree and the procedure which enables claiming of rewards in the [Merkle Tree](./docs/merkle_tree.md).
