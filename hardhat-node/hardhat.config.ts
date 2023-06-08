import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from "fs";
import * as dotenv from 'dotenv'
dotenv.config();

const enviornment = {
  local: () => {
    return {
      REMOTE_NODE_ENDPOINT: process.env.REMOTE_NODE_ENDPOINT,
      BLOCK_NUMBER: process.env.BLOCK_NUMBER,
      FORKING: process.env.FORKING,
      RAILWAY_NODE: process.env.RAILWAY_NODE
    }
  },
  docker: () => {
    return {
      REMOTE_NODE_ENDPOINT: fs.readFileSync(process.env.REMOTE_NODE_ENDPOINT_FILE, 'utf8'),
      BLOCK_NUMBER: process.env.BLOCK_NUMBER,
      FORKING: process.env.FORKING
    }
  }
}

if (!process.env.ENV) process.env.ENV = "local";
if ( !["local", "docker"].includes(process.env.ENV) ) throw (new Error("invalid ENV - only 'local' or 'docker"));

const ENV = enviornment[process.env.ENV]();

if (ENV.FORKING == "true") {
  console.log("Forking at block number " + ENV.BLOCK_NUMBER);
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1,
      mining: {
        auto: true,
        interval: 0
      },
      forking: ENV.FORKING == "true" ? 
      {
        url: ENV.REMOTE_NODE_ENDPOINT ? ENV.REMOTE_NODE_ENDPOINT : undefined,
        blockNumber: ENV.BLOCK_NdUMBER ? parseInt(ENV.BLOCK_NUMBER) : undefined
      } : undefined
    },
    railway: {
      url: ENV.RAILWAY_NODE
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ]
  },
  paths: {
    sources: `./contracts/`,
    tests: `./test`,
    cache: `./cache`,
    artifacts: `./artifacts`
  },
  mocha: {
    timeout: 400000
  }
};

export default config;