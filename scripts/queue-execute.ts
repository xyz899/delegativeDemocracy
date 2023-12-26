// Import necessary configurations, utility functions, and Hardhat environment
import {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalFiles,
  VOTING_PERIOD,
  MIN_DELAY,
} from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import { ethers, network } from "hardhat";
import { moveTime } from "../utils/move-time";

// Asynchronously queue and execute a proposal in the Governor contract
export async function queueAndExecute() {
  // Arguments for the function call in the proposal
  const args = [NEW_STORE_VALUE];
  
  // Get the Box contract instance
  const box = await ethers.getContract("Box");
  
  // Encode the function call for the Box contract
  const encodedFuncCall = box.interface.encodeFunctionData(FUNC, args);
  
  // Hash the proposal's description
  const descriptionHash = ethers.keccak256(
    ethers.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  );

  // Get the Governor contract instance
  const governor = await ethers.getContract("GovernorD4C");

  // Log the queuing process
  console.log("Queuing...");
  
  // Queue the proposal in the Governor contract
  const queueTx = await governor.getFunction("queue")(
    [box.target],
    [0],
    [encodedFuncCall],
    descriptionHash
  );

  // Wait for the transaction to be mined
  await queueTx.wait(1);

  // If we're on a development chain, simulate moving time and blocks
  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(VOTING_DELAY + 1);
  }

  // Log the execution process
  console.log("Executing....");
  
  // Execute the proposal in the Governor contract
  const executeTx = await governor.getFunction("execute")(
    [box.target],
    [0],
    [encodedFuncCall],
    descriptionHash
  );

  // Wait for the execution transaction to be mined
  await executeTx.wait(1);

  // Retrieve the new value from the Box contract to confirm the change
  const newBoxValue = await box.getFunction("retrieve")();
  console.log(`New Box Value: ${newBoxValue.toString()}`);
}

// Execute the queueAndExecute function and handle the promise
queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
