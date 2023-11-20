// Deploy Governance Tokens Contract and delegate to delegatedAccounts

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

// We use hardhat-deploy plugin and getNamedAccounts for test accounts defined in the config
const deployGovernanceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  // get every accounts and functions from hre
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------");


  const governanceToken = await deploy("DirtyDeedsToken", {
    from: deployer, // contract's deployer
    args: [], // arguments
    log: true,
    // waitConfirmations: networkConfig[network.name].blockConfirmations || 1
  });

  log("----------------------------------------------------");

  // await to get delegate's output before passing it 
  await delegate(governanceToken.address, deployer);
  log("Delegated");
};

const delegate = async (
  governanceTokenAddress: string,
  delegatedAccounts: string
) => {
  const governanceTokenDel = await ethers.getContractAt( // Find Contract Name
    "DirtyDeedsToken",
    governanceTokenAddress
  );
  const tx = await governanceTokenDel.delegate(delegatedAccounts); //delegate to delgatedAccounts
  await tx.wait(1); // wait 1 block confirmation
  console.log(
    `Checkpoints : ${await governanceTokenDel.numCheckpoints( // check Checkpoints 
      delegatedAccounts
    )}`
  );
};

// for Javascript files use module.exports = 
// for Typescript files use export default 
export default deployGovernanceToken;
