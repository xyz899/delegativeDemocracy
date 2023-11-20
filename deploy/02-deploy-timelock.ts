// 02 Deploy Timelock Contract
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";
import { MIN_DELAY } from "../helper-hardhat-config";

// Deploy here using hardhat-deploy deploy struct
const deployTimelock: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------");

  const timelock = await deploy("Timelock", {
    from: deployer,
    args: [MIN_DELAY, [], [], deployer],
    log: true,
  });
};

export default deployTimelock;
