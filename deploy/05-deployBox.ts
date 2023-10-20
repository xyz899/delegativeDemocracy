import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types" 
import { ethers } from "hardhat"
import deployTimelock from "./02-deploy-timelock"

const deployBox: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const { getNamedAccounts, deployments  } = hre
  const { get, deploy, log } = deployments
  const { deployer, owner } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Box and waiting for confirmations...")

  const box = await deploy("Box",{
    from: deployer,
    args: [],
    log: true,

  });

  const boxcontract = await ethers.getContractAt("Box", box.address);
  const timelock = await ethers.getContract("Timelock");
  const transferOwnerTx = await boxcontract.transferOwnership(
    timelock.target
  );

  await transferOwnerTx.wait();
  log("done")

  
}

export default deployBox;
