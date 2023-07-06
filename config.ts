import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

interface ENV {
  ALCHEMY_API_KEY: string | undefined;
  FORKING: string | undefined;
  REPORT_GAS: string | undefined;
  COINMARKETCAP_API: string | undefined;
}

interface Config {
  ALCHEMY_API_KEY: string;
  FORKING: string;
  REPORT_GAS: string;
  COINMARKETCAP_API: string;
}

// Loading process.env as ENV interface
const getConfig = (): ENV => {
  return {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    FORKING: process.env.FORKING,
    REPORT_GAS: process.env.REPORT_GAS,
    COINMARKETCAP_API: process.env.COINMARKETCAP_API
  };
};

const checkConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = checkConfig(config);

export default sanitizedConfig;
