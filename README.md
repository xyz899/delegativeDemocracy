![Delegative Democracy DAO](https://images.unsplash.com/photo-1666979663156-a8b9f5aaa433?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)


This README provides a comprehensive guide for users to set up, compile, test, deploy, and verify your Delegative Democracy DAO project. Be sure to replace placeholders with your specific project details and add any additional information relevant to your DAO.

# Delegative Democracy DAO

## Overview
This project is a Delegative Democracy DAO implemented using Hardhat, TypeScript, and deployed on the Sepolia test network. It allows participants to delegate their voting power in a democratic manner.

## Prerequisites
- Node.js
- Yarn or npm
- An Ethereum wallet with Sepolia testnet ETH
- An Infura or Alchemy account for Sepolia RPC URL
- An Etherscan account for API access (for contract verification)

## Installation

1. **Clone the Repository**
   ```
   git clone https://github.com/Winter9998/delegativeDemocracy.git
   cd delegativeDemocracy
   ```
```   
yarn install
# or
npm install
```

## Environment Setup

Create a .env file in the root directory and add the following:


```
    SEPOLIA_RPC_URL='https://sepolia.infura.io/v3/your_infura_project_id'
    PRIVATE_KEY='your_wallet_private_key'
    ETHERSCAN_API_KEY='your_etherscan_api_key'
```

  Replace the placeholders with your actual Sepolia RPC URL, private key, and Etherscan API key.

## Compilation

### Compile the smart contracts with Hardhat:

```
npx hardhat compile

```

## Testing

### Run the tests to ensure the contracts are functioning as expected:

```
npx hardhat deploy
npx hardhat test

```

## Deployment

### Deploy the contracts to the Sepolia testnet:

```

npx hardhat run scripts/[scriptName].ts --network sepolia

```

## Contract Verification

### After deployment, verify the contract on Etherscan:

```
npx hardhat verify --network sepolia [Deployed Contract Address]

```

## Interacting with the DAO

You can interact with the DAO using Hardhat or by integrating it into a frontend application.
Contributing

Contributions are welcome! Please open an issue or submit a pull request with your proposed changes.

### License

Apache License 2.0

