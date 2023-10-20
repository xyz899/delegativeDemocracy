import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import * as dotenv from 'dotenv';
dotenv.config();


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer:{
        enabled: true,
        runs: 200,
      },
    }
  },
  defaultNetwork: "hardhat",
  networks : {
    hardhat: {
      chainId : 31337,
    },
    localhost : {
      chainId : 31337,
    },
  },
  namedAccounts: {
    deployer : {
      default: 0,
    },
    owner : {
      default: 1,
    }
  },
  
  
};

export default config;
