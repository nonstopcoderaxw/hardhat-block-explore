import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from "fs";
import * as dotenv from 'dotenv'
dotenv.config();

console.log("Forking at block number " + process.env.blockNumber);


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1,
      mining: {
        auto: true,
        interval: 0
      },
      forking: {
        url: getRpcEndPoint(),
        blockNumber: process.env.blockNumber ? parseInt(process.env.blockNumber) : undefined
      }
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

function getRpcEndPoint(): string {
  try {
    return fs.readFileSync('/run/secrets/rpc_endpoint', 'utf8'); // from docker
  } catch(e) {};

  try {
    return fs.readFileSync('../rpc_endpoint.txt', 'utf8');
  } catch(e) {};

  throw new Error('RPC Endpoint Not Found!');
};

export default config;