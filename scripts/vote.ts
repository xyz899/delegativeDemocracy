import { ethers, network } from "hardhat";
import {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  proposalFiles,
  VOTING_PERIOD,
} from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";
import * as fs from "fs";

const index: number = 0;

async function vote(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalFiles, "utf-8"));
  const proposalId = proposals[network.config.chainId!][proposalIndex];
  // 0 = Against 1 = For, 2 = Abstain
  const governor = await ethers.getContract("GovernorD4C");
  const voteWay = 1;
  const reason = "Je peux pas j'ai piscine";
  const voteTx = await governor.getFunction("castVoteWithReason")(
    proposalId,
    voteWay,
    reason
  );

  await voteTx.wait(1);

  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1);
  }

  console.log("Voted! Ready to go!");
}

vote(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
