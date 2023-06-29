# Testing

Tests are written with Hardhat and Foundry, Ethers & Typescript, using Typechain to generate typings for all contracts. Tests are executed using both `hardhat` and `forge`.

The test suites are organized in different files according to the contract names. The tests are organized with the namining convention, <ContractName>.\*.ts or <ContractName>.t.sol depending on the framework. Each file groups the tests by functionality, covering all emitted events and state modifications which are required to cover several use cases.

## Hardhat Suite

Key folders:

- `/src/mocks`: All mocks used throughout the test suite
- `/test`: Hardhat Unit tests in folders corresponding to src/xx
- `/types`: TS Types used throughout the suite
  - `/generated`: Output from Typechain; strongly-typed, Ethers-flavoured contract interfaces

### Spec Unit Tests

The hardhat spec unit tests, examine the specifications for the smart contracts, RewardPool and BurnPool. You may run these tests using the following command:

```
npm run test:spec
```

### Integration Tests

The integration tests cover the Chainlink price feed use case. According to this use case when burning tokens through the BurnPool smart contract, the price for WXM should be fetched from an oracle residing in the mainnet. For the purpose of this use case, the Mumbai testnet is forked and then an oracle is used to fetch a price pair (i.e. MATIC/USD).

Over and above this use case, when testing against a forked testnet, all smart contracts which are used in the hardhat unit tests will be deployed on top of a local network snapshot of Mumbai. You may run these tests using the following command:

```
npm run test:integration
```

## Foundry Suite

Key folders:

- `/test-foundry`: Foundry tests in folders corresponding to src/xx
  - `/scripts`: Generate standard input for the purpose of testing RewardPool
- `/artifacts`: Bytecode for smart contracts to use during testing

### Unit and Fuzz Tests

The foundry testing suite consists of standard and fuzz tests. These tests examine the specification, inputs and outputs for the smart contracts, WeatherXM (ERC20) WeatherXMStation (ERC721), RewardPool, PriceFeedConsumer and BurnPool. You may run these tests using the following command:

```
npm run test:sol
```

## Static/Dynamic Analysis

Static analysis and dynamic analysis are two automated testing methods for evaluating the security qualities of smart contracts. Both techniques, however, use different approaches for finding defects in contract code.

Key Folders:

- `/utils`: Scripts used to run static analysis tools like Slither and Mythril

### Static Analysis

Static analysis examines the source code or bytecode of a smart contract before execution. The tools which is orchestrated for static analysis are [Slither](https://github.com/crytic/slither) and [Mythril](https://github.com/ConsenSys/mythril).

You may run Slither using the following command:

```
npm run slither
```

After Slither's completion a `slither` folder will be created in the root folder containing the report.

You may run Mythril using the following command for the root folder:

```
./utils/flattener.sh && sudo ./utils/mythril.sh
```

The `flattener.sh` will generated all falttened contracts which will then be used as input for Mythril in `mythril.sh`. After Mythril's completion a `mythril` folder will be created in the root folder containing the report.

### Dynamic Analysis

Dynamic analysis techniques require executing the smart contract in a runtime environment to identify issues in the code. The tool which is orchestrated for dynamic analysis is [MythX](https://github.com/dmuhs/mythx-cli/). You may install locally MythX CLI and setup an API key from your account in MythX and then perform the dynamic analysis. Once the dynamic analysis is completed, the reports for each smart contract can be found in MythX dashboard.
