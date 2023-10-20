import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types" 
import { ethers } from "hardhat"
import { ADDRESS_NULL, PROPOSER, EXECUTOR, CANCELLER } from "../helper-hardhat-config"

const setupContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // try {
  const { getNamedAccounts, deployments  } = hre
  const { log, get } = deployments
  const { deployer, owner} = await getNamedAccounts()
   
  const Timelock = await ethers.getContract("Timelock", deployer)
  
  // log(`Timelock Deployed here : ${Timelock}`)
  const governor = await ethers.getContract("GovernorD4C", deployer) 
  // const governorAddress = governor.address;

  log("----------------------------------------------------")
  log("Setting up contracts for roles...")
  log("----------------------------------------------------")
  log(`Timelock Deployed here : ${Timelock.target} by : ${deployer} `)  
  log("----------------------------------------------------")
  
  log("----------------------------------------------------")
  


  // would be great to use multicall here...
  //  const proposerRole = await Timelock.PROPOSER_ROLE()
   const proposerRole = PROPOSER
   log(`PROPOSER : ${PROPOSER}`)
   log("----------------------------------------------------")
  // const executorRole = await Timelock.EXECUTOR_ROLE();  
  const executorRole = EXECUTOR
  log(`EXECUTOR : ${EXECUTOR}`)
  log("----------------------------------------------------")
  const cancellerRole = CANCELLER 
  log(`CANCELLER : ${CANCELLER}`)
  log("----------------------------------------------------")

  // // const adminRole = await Timelock.TIMELOCK_ADMIN_ROLE()
  // // (TIMELOCK_ADMIN_ROLE) has been removed from the last versions of OZ TimelockController.sol 
  // // admin is directly in the constructor of Timelock.sol so don't forget to add it in the 02-deploy-timelock.ts args

  const proposerTx = await Timelock.getFunction("_grantRole")(proposerRole, await governor.getAddress())
  await proposerTx.wait(1);

  const executorTx = await Timelock.getFunction("_grantRole")(executorRole, ADDRESS_NULL)
  await executorTx.wait(1);
  
  const revokeTx = await Timelock.getFunction("_grantRole")(cancellerRole, deployer);
   await revokeTx.wait(1);

   log(proposerTx, executorTx, revokeTx)

  

}

  export default setupContracts;
  