// Import ethers for cryptographic functions and fs for file system operations
import { ethers } from "ethers";
import * as fs from "fs";

// Asynchronous function to generate and print role hashes
async function printRoleHashes() {
  // Generate hash for the proposer role
  const proposerRole = ethers.utils.id("PROPOSER_ROLE");
  // Generate hash for the executor role
  const executorRole = ethers.id("EXECUTOR_ROLE");
  // Generate hash for the admin (canceller) role
  const adminRole = ethers.id("CANCELLER_ROLE");

  // Prepare the content to be written to the .env file
  const envContent = `PROPOSER_ROLE_HASH=${proposerRole}\nEXECUTOR_ROLE_HASH=${executorRole}\nADMIN_ROLE_HASH=${adminRole}\n`;

  // Write the role hashes to a .env file
  fs.writeFileSync('.env', envContent);

  // Print the role hashes to the console
  console.log(`Proposer Role Hash: ${proposerRole}`);
  console.log(`Executor Role Hash: ${executorRole}`);
  console.log(`Admin Role Hash: ${adminRole}`);
}

// Execute the function and catch any errors that occur
printRoleHashes().catch((error) => {
  console.error("An error occurred:", error);
});
