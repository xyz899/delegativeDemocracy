import { ethers } from "hardhat";
import { NEW_STORE_VALUE, FUNC } from "../helper-hardhat-config";
import { Transaction } from "ethers";

export async function propose(args: any[], functionToCall: string) {
  const governor = await ethers.getContract("GovernorD4C")
  const box = await ethers.getContract("Box")
  const encodedFunctionCall = box.interface.encodeFunctionData(functionToCall, args)
  console.log(`Proposing ${functionToCall} on ${box.target} with ${args}`)
  const proposeTx = await governor.getFunction("propose")(
    [box.target],
    [0],
    [encodedFunctionCall],
    "Submitted"
  )
}

propose([NEW_STORE_VALUE], FUNC)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
