import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";

const deployGovernanceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------")


  const governanceToken = await deploy("DirtyDeedsToken", {
    from: deployer,
    args: [],
    log: true,
  });

  log("----------------------------------------------------")

  await delegate(governanceToken.address, deployer)
  log("Delegated")


};

const delegate = async (
  governanceTokenAddress: string,
  delegatedAccounts: string
) => {
  const governanceTokenDel = await ethers.getContractAt(
    "DirtyDeedsToken",
    governanceTokenAddress
  );
  const tx = await governanceTokenDel.delegate(delegatedAccounts);
  await tx.wait(1);
  console.log(`Checkpoints : ${await governanceTokenDel.numCheckpoints(delegatedAccounts)}`);

  
};


export default deployGovernanceToken;
