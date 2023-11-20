// script to get the hashes of the roles and store it safely in a .env file
import { ethers } from "ethers";
import * as fs from "fs";

async function printRoleHashes() {
  const proposerRole = ethers.id("PROPOSER_ROLE");
  const executorRole = ethers.id("EXECUTOR_ROLE");
  const adminRole = ethers.id("CANCELLER_ROLE");

  const envContent = `PROPOSER_ROLE_HASH=${proposerRole}\nEXECUTOR_ROLE_HASH=${executorRole}\nADMIN_ROLE_HASH=${adminRole}\n`;

  fs.writeFileSync('.env', envContent);

  console.log(`Proposer Role Hash: ${proposerRole}`);
  console.log(`Executor Role Hash: ${executorRole}`);
  console.log(`Admin Role Hash: ${adminRole}`);
}

printRoleHashes().catch((error) => {
  console.error("An error occurred:", error);
});
