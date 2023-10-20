import { ethers } from "hardhat";
import { NEW_STORE_VALUE, FUNC } from "../helper-hardhat-config";

export async function propose(args: any[], functionToCall: string) {
  const governor = await ethers.getContract("GovernorD4C");
  const box = await ethers.getContract("Box");

  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );
}

propose([NEW_STORE_VALUE], FUNC)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
