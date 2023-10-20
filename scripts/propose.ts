import { ethers, network } from "hardhat";
import {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalFiles
} from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import * as fs from 'fs'

export async function propose(args: any[], functionToCall: string) {
  const governor = await ethers.getContract("GovernorD4C");
  const box = await ethers.getContract("Box");
  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );
  console.log(`Proposing ${functionToCall} on ${box.target} with ${args}`);
  console.log(`Proposal Description : \n ${PROPOSAL_DESCRIPTION}`);
  const proposeTx = await governor.getFunction("propose")(
    [box.target],
    [0],
    [encodedFunctionCall],
    PROPOSAL_DESCRIPTION
  );

  const proposeReceipt = await proposeTx.wait(1)

  if (developmentChains.includes(network.name)){
    await moveBlocks(VOTING_DELAY + 1)
  }

  const logs : any = governor.interface.parseLog(proposeReceipt.logs[0]);
  const proposalId = logs.args.proposalId;

  let proposals = JSON.parse(fs.readFileSync(proposalFiles, "utf-8"))
  proposals[network.config.chainId!.toString()].push(proposalId.toString())
  fs.writeFileSync(proposalFiles, JSON.stringify(proposals))
  
}

propose([NEW_STORE_VALUE], FUNC)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });