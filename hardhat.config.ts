import '@openzeppelin/hardhat-upgrades';
import 'hardhat-gas-reporter';
import 'hardhat-deploy';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-solhint';
import '@nomicfoundation/hardhat-foundry';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-network-helpers';
import 'solidity-coverage';
import 'solidity-docgen';
import envConfig from './config';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const compilerConfig = (version: string) => ({
  version,
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    outputSelection: {
      '*': {
        SavingsContract: ['storageLayout']
      }
    }
  }
});

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: false,
      initialBaseFeePerGas: 0
    },
    goerli: {
      chainId: 5,
      url: "",
      accounts: []
    }
    // mumbai: {
    //   url: process.env.NODE_URL || `https://polygon-mumbai.g.alchemy.com/v2/${envConfig.ALCHEMY_API_KEY}`,
    //   accounts: [process.env.MUMBAI_PRIVATE_KEY]
    // }
  },
  solidity: {
    compilers: [{ ...compilerConfig('0.8.20') }]
  },
  paths: {
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: envConfig.COINMARKETCAP_API,
    currency: 'USD',
    noColors: true,
    showTimeSpent: true,
    showMethodSig: true,
    outputFile: 'gas-report.txt'
    //token: "MATIC"
  },
  typechain: {
    outDir: 'types/generated',
    target: 'ethers-v5'
  },
  mocha: {
    timeout: 120e3, // 120s
    retries: 1
  }
};

export default hardhatConfig;
