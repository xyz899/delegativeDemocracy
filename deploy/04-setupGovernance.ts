import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import {
  ADDRESS_NULL,
  // PROPOSER,
  // EXECUTOR,
  // CANCELLER,
} from "../helper-hardhat-config";
require('dotenv')

const setupContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // try {
  const { getNamedAccounts, deployments } = hre;
  const { log, get } = deployments;
  const { deployer, owner } = await getNamedAccounts();

  const Timelock = await ethers.getContract("Timelock", deployer);

  // log(`Timelock Deployed here : ${Timelock}`)
  const governor = await ethers.getContract("GovernorD4C", deployer);
  // const governorAddress = governor.address;

  log("----------------------------------------------------");
  log("Setting up contracts for roles...");
  log("----------------------------------------------------");
  log(`Timelock Deployed here : ${Timelock.target} by : ${deployer} `);
  log("----------------------------------------------------");

  log("----------------------------------------------------");

  // would be great to use multicall here...

  //  const proposerRole = await Timelock.PROPOSER_ROLE()
  const proposerRole = process.env.PROPOSER;

  // const executorRole = await Timelock.EXECUTOR_ROLE();
  const executorRole = process.env.EXECUTOR;
  const cancellerRole = process.env.CANCELLER;
  
  // // const adminRole = await Timelock.TIMELOCK_ADMIN_ROLE()
  // // (TIMELOCK_ADMIN_ROLE) has been removed from the last versions of OZ TimelockController.sol
  // // admin is directly in the constructor of Timelock.sol so don't forget to add it in the 02-deploy-timelock.ts args

  // getFunction ethers-v6
  const proposerTx = await Timelock.getFunction("grantRole")(
    proposerRole,
    await governor.getAddress()
  );
  await proposerTx.wait(1);

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

  //  log(proposerTx, executorTx, revokeTx)
};

export default setupContracts;
