import { ethers, network } from "hardhat";
import {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalFiles,
} from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import * as fs from "fs";

//  Asynchronously proposes a new action to the Governor contract
// Encodes the function call, sends the proposal, and writes the proposal ID to a file
// args The arguments for the function call to be proposed
// functionToCall The name of the function to be called in the proposal
export async function propose(args: any[], functionToCall: string) {
  // Get the Governor contract instance
  const governor = await ethers.getContract("GovernorD4C");

  // Get the Box contract instance
  const box = await ethers.getContract("Box");

  // Encode the function call for the proposal
  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );

  // Log the details of the proposal
  console.log(`Proposing ${functionToCall} on ${box.target} with ${args}`);
  console.log(`Proposal Description : \n ${PROPOSAL_DESCRIPTION}`);

  // Submit the proposal to the Governor contract
  const proposeTx = await governor.getFunction("propose")(
    [box.target],
    [0],
    [encodedFunctionCall],
    PROPOSAL_DESCRIPTION
  );

  // Wait for the transaction to be mined
  const proposeReceipt = await proposeTx.wait(1);

  // If on a development chain, simulate moving blocks to pass the voting delay
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }

  // Parse the proposal ID from the transaction logs
  const logs: any = governor.interface.parseLog(proposeReceipt.logs[0]);
  const proposalId = logs.args.proposalId;

  // Read existing proposals from file, add the new proposal ID, and write back
  let proposals = JSON.parse(fs.readFileSync(proposalFiles, "utf-8"));
  proposals[network.config.chainId!.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalFiles, JSON.stringify(proposals));
}

// Execute the propose function with the specified arguments and handle the promise
propose([NEW_STORE_VALUE], FUNC)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
