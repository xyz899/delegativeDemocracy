// deploy Governor Contract
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";
import { VOTING_DELAY, VOTING_PERIOD } from "../helper-hardhat-config";

const deployGovernor: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await get("DirtyDeedsToken");
  const Timelock = await get("Timelock");
  log("----------------------------------------------------");

  const governorContract = await deploy("GovernorD4C", {
    from: deployer,
    args: [
      governanceToken.address,
      Timelock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
    ],
    log: true,
  });
};

export default deployGovernor;
