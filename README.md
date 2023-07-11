# WeatherXM

This repo contains all contracts and tests relevant to WeatherXM network. WeatherXM is a community powered weather network, that rewards weather station owners and provides accurate weather services to Web3 enterprises.

[![CI](https://github.com/WeatherXM/smart-contracts-v2/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/WeatherXM/smart-contracts-v2/actions/workflows/ci.yml)
[![Coverage](https://github.com/WeatherXM/smart-contracts-v2/actions/workflows/coverage.yml/badge.svg?branch=feat%2Fadd-coverage-badges)](https://github.com/WeatherXM/smart-contracts-v2/actions/workflows/coverage.yml)

## Branches
- `releases` contain complete, tested and audited contract code, generally on mainnet
- `main` contains complete, tested and audited contract code, generally on mumbai, to support beta users
- `develop` is for the pre-release code, with new features, not yet audited

## Architecture

As more logic is transferred into smart contracts, a need for grouping of functionality and modularity emerges. That is why multiple smart contracts are now created, each with its own logic and design patterns:

- WeatherXM
- WeatherXMData
- WeatherStationXM
- RewardPool
- BurnPool
- PriceFeedConsumer

Diagrams illustrating the interaction among the smart contracts, storage slots, classes, etc can be found [diagrams](./docs/diagrams).

### Assumptions

- Different Admins can be assigned to each contract after deployment to the network by transferring ownership.
- Admin has a lot of power, and is assumed to be the right, fair and just person/party. It is highly advised to have a multisig as admin, rather than just an EOA.
- Company and investors tokens are allocated everyday to a target EoA which is set by the RewardPool Admin. The Distributor, is responsible for initiating the transfer of company and investors tokens daily to the target EoA.

### Rules

- Mint only once per day ([Token Emissions](./docs/emissions.md))
- Anyone can initiate the minting operation daily
- The daily rewards are calculated externally by the rewarding mechanism and then a merkle tree root hash is submitted to the RewardPool
- Submitting the root hash once per day
- Minted tokens in circulation should never be more than maximum supply (100M)
- The total sum of tokens in the RewardPool must always be enough for everyone to withdraw their full allowance
- Allocated rewards is calculated based on 4 parameters: the cumulative amount, the address, the cycle and the proof
- A recipient cannot withdraw more than their allocated allowance in the RewardPool
- The maximum amount a recipient can withdraw is constrained by the chosen cycle and the provided proof, so use the proof for the latest cycle
- In each cycle, each recipient has only one valid proof
- Rewards are allocated daily in the RewardPool per wallet address (NOT weather station)
- Anyone can burn through the BurnPool contract.
- Proof of burn (a receipt for a burn operation) is required for the provision of services
- The remaining tokens which are not assigned to any weather stations in a daily basis are transferred to the [Bussiness Development pool](./docs/pools.md)

### Merkle Tree and Claiming Rewards

You may find more info about the implementation of Merkle Tree and the procedure which enables claiming of rewards in the [docs](./docs/merkle_tree.md).

### Burn-And-Mint Equilibrium

The $WXM token is designed to distribute the value accrued by the commercial use of WeatherXM data to the Network participants. In other words, there is supply (new issuance) and demand (token burn due to commercial uses of the Network’s data) for $WXM, and eventually an equilibrium point is reached.

The only case in which issuance of new tokens can stop is if the maximum supply of 100 million tokens is reached (expected to happen in more than 10 years) and there is zero demand for Network data (i.e. token burns), or if the DAO, which will be in place by then, decides to change the token issuance policy.

#### Burning Tokens

More info about burning tokens can be found in [Burning Operation](./docs/burning.md)

#### Minting Tokens

More info about minting tokens can be found in [Minting Operation](./docs/minting.md)


## Dev Notes

### Testing

Tests are written with Foundry, Hardhat, Ethers & Typescript, using Typechain to generate typings for all contracts.

Please make sure:

1. Install the project's dependencies.

```
npm run setup
```

2. Review **hardhat.config.ts** and **hardhat-fork.config.ts** to better undestand the configuration of testnets and dependencies

3. Review the **env.template** to make sure you provide all necessary information for testing

4. Test the smart contracts by choosing one of the options described in this [tutorial](./docs/testing.md)

### CI

Codebase rules are enforced through some passing GitHub Actions (workflow configs are in .github/workflows). These rules are:

- Linting of both the contracts (through Solhint) and TS files (ESLint)
- Compile the smart contracts successfully
- Passing testing suites (both for Foundry and Hardhat)

### Code Formatting & Documentation

- Solidity imports deconstructed as import { xxx } from "../xxx.sol"
- Designed for Solidity >=0.8.18
- Uses custom errors instead of revert reason strings
- Well-documented via NatSpec comments
- Thoroughly tested with Foundry and Hardhat

Detailed code documentation resulted from NatSpec comments can be found in [Code Documentation](./docs/index.md).

### Security

While I have strict standards for code quality and test coverage, it's important to note that this project may not be entirely risk-free. Although I have taken measures to ensure the security of the contracts, they have not yet been audited by a third-party security researcher.

#### Tools

- [Slither](https://github.com/crytic/slither)
  - Static analysis from Trail of Bits.
- [MythX](https://mythx.io/)
  - Paid service for smart contract security.
- [Mythrill](https://github.com/ConsenSys/mythril)
  - MythX free edition.
- [Consensys Security Tools](https://consensys.net/diligence/tools/)
  - A list of Consensys tools.

More info about using these tools internally into this project can be found in the [docs](./docs/testing.md)

### Contributing

Feel free to dive in! [Open](https://github.com/WeatherXM/smart-contracts/issues/new) an issue or submit a PR in order to make some proposal or submit a question.

## Acknowledgements

- [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Hardhat](https://github.com/NomicFoundation/hardhat)
- [Foundry](https://github.com/foundry-rs/foundry)
- [Chainlink](https://github.com/smartcontractkit/chainlink)
- [Murky](https://github.com/dmfxyz/murky)
- [Solidity-RLP](https://github.com/hamdiallam/Solidity-RLP)
