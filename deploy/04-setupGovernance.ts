// we setup Governor Contract here with every deployed contract
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { ADDRESS_NULL } from "../helper-hardhat-config";
require("dotenv");

const setupContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // try {
  const { getNamedAccounts, deployments } = hre;
  const { log } = deployments;
  const { deployer } = await getNamedAccounts();
  
  // await get Timelock 
  const Timelock = await ethers.getContract("Timelock", deployer);

  // log(`Timelock Deployed here : ${Timelock}`)
  // get Governor Contract
  const governor = await ethers.getContract("GovernorD4C", deployer);
  // const governorAddress = governor.address;

  log("----------------------------------------------------");
  log("Setting up contracts for roles...");
  log("----------------------------------------------------");
  log(`Timelock Deployed here : ${Timelock.target} by : ${deployer} `);
  log("----------------------------------------------------");

  log("----------------------------------------------------");


  // here we have the 3 main roles of Governor to set as vars 
  // PROPOSER EXECUTOR AND CANCELLER
  //  const proposerRole = await Timelock.PROPOSER_ROLE()
  const proposerRole = process.env.PROPOSER;

  // const executorRole = await Timelock.EXECUTOR_ROLE();
  const executorRole = process.env.EXECUTOR;
  const cancellerRole = process.env.CANCELLER;

  // const adminRole = await Timelock.TIMELOCK_ADMIN_ROLE()
  // (TIMELOCK_ADMIN_ROLE) has been removed from the last versions of OZ TimelockController.sol
  // admin is directly in the constructor of Timelock.sol so don't forget to add it in the 02-deploy-timelock.ts args

  // getFunction ethers-v6
  // We grant Role to every role and remove canceller since If we have a canceller,
  // the contract becomes centralized
  const proposerTx = await Timelock.getFunction("grantRole")(
    proposerRole,
    await governor.getAddress()
  );
  await proposerTx.wait(1); // wait for one block confrimation

  const executorTx = await Timelock.getFunction("grantRole")(
    executorRole,
    ADDRESS_NULL
  );

  await executorTx.wait(1);

  const revokeTx = await Timelock.getFunction("revokeRole")(
    cancellerRole,
    deployer
  );
  await revokeTx.wait(1);

};

export default setupContracts;
