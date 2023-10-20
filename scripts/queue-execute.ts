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

export async function queueAndExecute() {
  const args = [NEW_STORE_VALUE];
  const box = await ethers.getContract("Box");
  const encodedFuncCall = box.interface.encodeFunctionData(FUNC, args);
  const descriptionHash = ethers.keccak256(
    ethers.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  );

  const governor = await ethers.getContract("GovernorD4C");
  console.log("Queuing...");
  const queueTx = await governor.getFunction("queue")(
    [box.target],
    [0],
    [encodedFuncCall],
    descriptionHash
  );

  await queueTx.wait(1);

  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1);
    await moveBlocks(VOTING_DELAY + 1);
  }

  console.log("Executing....");
  const executeTx = await governor.getFunction("execute")(
    [box.target],
    [0],
    [encodedFuncCall],
    descriptionHash
  );

  await executeTx.wait(1);

  const newBoxValue = await box.getFunction("retrieve")();
  console.log(`New Box Value: ${newBoxValue.toString()}`);
}

queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
