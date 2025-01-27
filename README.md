# Canonical CrossTrade

![Contract Composition](https://github.com/tokamak-network/Canonical-cross-chain-swap/blob/main/img/cct.png)


The CrossTrade system consists of canonical logic contracts deployed on both L1 (Ethereum sepolia) and L2 (Optimism sepolia and Arbitrum sepolia). The system enables secure cross-chain token transfers between layers.

The system follows a unidirectional request flow:
- All trade requests must originate from L2
- Administrative actions (editing, canceling, providing) can only be executed from L1


Due to the architectural limitations of L1/L2 systems, L1 contracts cannot directly verify L2 state. To ensure transaction integrity:

1. Each request generates a unique hash value on L2
2. This hash must be included and verified in corresponding L1 transactions
3. The hash verification process ensures that L1 operations match their L2 counterparts


## Transaction Recovery

If a `provideCT` transaction succeeds on L1 but fails on L2:
- Users can retry the L2 transaction using the `resendProvideCTMessage` function
- This ensures funds don't get stuck due to L2 execution failures

## Important Note

Once a `provideCT` transaction is executed, the request becomes immutable:
- No further edits allowed
- Cannot be canceled



## Contract Addresses on Ethereum Sepolia 
- L1CrossTradeOP: [0xd61337c07fa197742301E74fD0AF6318049f16a6](https://sepolia.etherscan.io/address/0xb4032ff3335f0e54fb0291793b35955e5da30b0c)

## Contract Addresses on Optimism Sepolia 
- L2CrossTradeOP: [0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E](https://sepolia-optimistic.etherscan.io/address/0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E)


## Optimism docs for addresses: https://docs.optimism.io/chain/addresses 
- L1CrossDomainMessenger: [0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef]
- L2CrossDomainMessenger: [0x4200000000000000000000000000000000000007]


## Contract function

### L1CrossTradeContract code ?

### `provideCT`

Provides information that matches the hash value requested in L2

### `cancel`

Cancels the request requested by the requester.


### `edit`

This is a function that changes the value that the requester wants to receive.



## How to Test and try the contracts.

## How to Test (Optimism)

### Deploy and setup the contracts on Optimism Sepolia and Ethereum Sepolia

**Install the required utilities**

    npm install

 in env file set the private key of the account you want to use for the deployment

**1.Deploy L1CrossTradeOP**

    npx hardhat run scripts/optimism/deployL1CrossTradeOP.js --network sepolia

 result: L1CrossTradeOP deployed to: 0xd61337c07fa197742301E74fD0AF6318049f16a6
 https://sepolia.etherscan.io/address/0xd61337c07fa197742301E74fD0AF6318049f16a6


**2.Deploy L2CrossTradeOP**

    npx hardhat run scripts/optimism/deployL2CrossTradeOP.js --network optimismSepolia

 result: Contract deployed to: 0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E
    https://sepolia-optimistic.etherscan.io/address/0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E


**1.1.Verify L1CrossTradeOP**

 Make sure you have the api key in the .env file (from etherscan) -- SEPOLIA_APY_KEY

    npx hardhat verify --network sepolia 0xd61337c07fa197742301E74fD0AF6318049f16a6
    

**2.1.Verify L2CrossTradeOP**

 Make sure you have the api key in the .env file (from optimismSepolia) -- OP_SEPOLIA_APY_KEY
    
    npx hardhat verify --network optimismSepolia 0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E

**3.Initialize L1CrossTradeOP(setChainInfo)**

 add the addresses in the setChainInfoOP.js file. Check example below:
        
    const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";
    const L2_CROSS_TRADE_OP_ADDRESS = "0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E";
    const CROSS_DOMAIN_MESSENGER = "0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef";
    const L2_CHAIN_ID = "11155420";
        
run the script:
        
    npx hardhat run scripts/optimism/setChainInfoOP.js --network sepolia
        
result: https://sepolia.etherscan.io/tx/0xdffd3d9f24d71e31b784eb53e29a19dc5325816ecbab2876044eebb197ba2e84

**4.Initialize L2CrossTradeOP(initialize)**

add the addresses in the initializeL2OP.js file. Check example below:
        
    const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";
    const L2_CROSS_TRADE_OP_ADDRESS = "0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E";
    const L1_CROSS_DOMAIN_MESSENGER = "0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef";
    const NATIVE_TOKEN_L2 = "0x0000000000000000000000000000000000000000";
    const L1_CHAIN_ID = "11155111";
    
run the script:
        
    npx hardhat run scripts/optimism/initializeL2OP.js --network optimismSepolia
    
result: https://sepolia-optimistic.etherscan.io/tx/0xecd700d3451afa881529bb0dd53c636e9c0fcb9beee4b69630d7119fe5d294c6


# Execute cross trade full flow with Native Token.

    1. Request on L2 with address: 0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C (requester)
    2. Provide on L1 with address: 0x21a82A114d65DB20d5db33f5c9DBb54f1a8AcF4e (provider)

There are 2 ways to execute the trade (using the scripts or etherscan/optimismScan).

## Execute and test with the scripts:

**1. Request on L2 with address: 0xd61337c07fa197742301E74fD0AF6318049f16a6 (requester)**

Make sure you have the private key in the .env file for the requester address. 
ADJUST the parameters in the requestOP.js file:
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Amount to provide on L2
    ctAmount: hre.ethers.parseEther("0.02"), // Amount to receive on L1
    l1chainId: 11155111n // Sepolia chain ID
    
run the script and make the request:
        
    npx hardhat run scripts/optimism/requestOP.js --network optimismSepolia
    
result: https://sepolia-optimistic.etherscan.io/tx/0x12aa7301702628f1f26592cfb93b04989e7de4cbe02392c8d44cb166ef3c1d82


**2. Provide on L1 with address: 0x21a82A114d65DB20d5db33f5c9DBb54f1a8AcF4e (provider)**

Make sure you have the private key in the .env file for the provider address.

Before adjusting the parameters in the script we need to get the hash from the request event.

run the script to get the hash or check the event on etherscan for the _hashValue parameter value:
        
    npx hardhat run scripts/optimism/getHashOP.js --network sepolia
    
result: Generated Hash: 0xdb0d97b716144ad7f723167b29e4c06c60122a468b7b9c331793a76ec41e718d
(should match the hash from the request event: https://sepolia-optimistic.etherscan.io/tx/0x12aa7301702628f1f26592cfb93b04989e7de4cbe02392c8d44cb166ef3c1d82#eventlog)

ADJUST the parameters in the provideOP.js file with the generated hash:
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    requestor: "0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C", // address that made the request
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    editedAmount: 0n, // If the amount was edited (0 if not edited)
    salecount: 1n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    minGasLimit: 200000n, // Minimum gas limit for L2 execution
    hash: "0xdb0d97b716144ad7f723167b29e4c06c60122a468b7b9c331793a76ec41e718d" // Hash from the request event
        

run the script and make the provide (check the private key again):
        
    npx hardhat run scripts/optimism/provideCTOP.js --network sepolia
    
result: https://sepolia.etherscan.io/tx/0x8ce71e24272deabb94faff57498d2576d17b3d656345fc24450982f5bbe3440b


**3. Check the data**
    
On L1:
    - check the data on the L1CrossTradeOP contract: https://sepolia.etherscan.io/tx/0x8ce71e24272deabb94faff57498d2576d17b3d656345fc24450982f5bbe3440b
    -> 0.02 ETH was provided to the requestor (0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C) because the requestor requested 0.02 ETH on L1 for 0.1 on L2

On L2:
    - check the data on the L2CrossTradeOP contract: https://sepolia-optimistic.etherscan.io/tx/0xaf6053cdc6d3e6f47ec233d4482dd7ffd72c4737789824395fe275d27ac93199
    -> 0.1 ETH was released to the provider (0x21a82A114d65DB20d5db33f5c9DBb54f1a8AcF4e) because the provider provided 0.02 ETH on L1 for 0.1 on L2 

The flow is complete and the requester has received 0.02 ETH on L1 and the provider has received 0.1 ETH on L2 -- 



### Execute cross trade Edit FEE + Provide with new data flow with Native Token.
Request on L2 with address: 0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C (requester)
Provide on L1 with address: 0x21a82A114d65DB20d5db33f5c9DBb54f1a8AcF4e (provider)

**1. Request on L2 with address: 0xd61337c07fa197742301E74fD0AF6318049f16a6 (requester)**
Make sure you have the private key in the .env file for the requester address.
ADJUST the parameters in the requestOP.js file:
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
        l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Amount to provide on L2
    ctAmount: hre.ethers.parseEther("0.03"), // Amount to receive on L1
    l1chainId: 11155111n // Sepolia chain ID
        
run the script and make the request:
        
    npx hardhat run scripts/optimism/requestOP.js --network optimismSepolia
    
result: https://sepolia-optimism.etherscan.io/tx/0x24ac8e39b908dd4e81cf39c744ef757879aef58f352c7c607e5a1cd51db44b2f


**2. Requestor wants to EDIT The Fee**
In order to edit the fee, the requestor needs to execute the editFeeOP on L1.

The requestor needs to have the hash of the request event.
Run the script to get the hash or check the event on etherscan for the _hashValue parameter value:
        
    npx hardhat run scripts/optimism/getHashOP.js --network sepolia
    
result: Generated Hash: 0x7779c0dde038d0d5bb6bac2d15c4bc6df8c32581b6365e8462cba402d2f237bd

ADJUST the parameters in the editFeeOP.js file with the generated hash:
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    editedctAmount: hre.ethers.parseEther("0.03"), // New amount to receive
    salecount: 2n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    hash: "0x7779C0DDE038D0D5BB6BAC2D15C4BC6DF8C32581B6365E8462CBA402D2F237BD" // Hash from the request event
        
run the script and make the edit ON L1:
        
    npx hardhat run scripts/optimism/editFeeOP.js --network sepolia
    
result: https://sepolia.etherscan.io/tx/0x815f3b1da47e2e1fd1bb8f680933cde29a56c9bb1fa03baf2579bb43226bd1f9


**4. Provide with the new edited fee on L1**
Make sure you have the private key in the .env file for the provider address.
The provider needs to have the hash of the request event.
ADJUST the parameters in the provideOP.js accordingly to the new Edited Fee.
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    requestor: "0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C", // address that made the request
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    editedAmount: hre.ethers.parseEther("0.03"), // New amount to receive
    salecount: 2n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    minGasLimit: 200000n, // Minimum gas limit for L2 execution
    hash: "0x7779C0DDE038D0D5BB6BAC2D15C4BC6DF8C32581B6365E8462CBA402D2F237BD" // Hash from the request event
        
run the script and make the provide ON L1:
        
    npx hardhat run scripts/optimism/provideCTOP.js --network sepolia
    
result: https://sepolia.etherscan.io/tx/0xf9e924801b7198186fce8b94728f854879c06fda7b0dbc82863bb1da11da30ad

**5. Check the data**
Check the data on the L1CrossTradeOP contract: https://sepolia.etherscan.io/tx/0xf9e924801b7198186fce8b94728f854879c06fda7b0dbc82863bb1da11da30ad
    -> 0.03 ETH was provided to the requestor (0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C) because the requestor edited the fee to 0.03 from 0.02 ETH on L1 for 0.1 on L2

Check the data on the L2CrossTradeOP contract: https://sepolia-optimism.etherscan.io/tx/0x82b059f21a6194188a2202e77658be7a4eded75181171cf47ed343b2c270e46f
    -> 0.1 ETH was released to the provider (0x21a82A114d65DB20d5db33f5c9DBb54f1a8AcF4e) because the provider provided 0.03 ETH on L1 for 0.1 on L2 

    -- The flow is complete and the requester has received 0.03 ETH on L1 and the provider has received 0.1 ETH on L2 -- 


### Execute cross trade Cancel CT flow with Native Token.

**1. Request on L2 with address: 0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C (requester)**
Make sure you have the private key in the .env file for the requstor address.
ADJUST the parameters in the requestOP.js file:
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Amount to provide on L2
    ctAmount: hre.ethers.parseEther("0.02"), // Amount to receive on L1
    l1chainId: 11155111n // Sepolia chain ID
        
run the script and make the request:
        
    npx hardhat run scripts/optimism/requestOP.js --network optimismSepolia
    
result: https://sepolia-optimism.etherscan.io/tx/0x8e88a838e817b15c97c9b877ddcb81f27b77b62f248cf3cc7f922c87dcab58c5
    -- the request is now available and ready to be provided on L1 -- 

**2. Requestor wants to cancel the request**
the requestor needs to have the hash of the request event.
Run the script to get the hash or check the event on etherscan for the _hashValue parameter value:
        
    npx hardhat run scripts/optimism/getHashOP.js --network sepolia
    
result: Generated Hash: 0x024ae3d4a9ee855946b00f24c4b8ecd7e58e2f0191c541761608f0ac37acb2d6

ADJUST the parameters in the cancelOP.js file with the generated hash:
        
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    salecount: 3n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    minGasLimit: 200000, // uint32
    hash: "0x024ae3d4a9ee855946b00f24c4b8ecd7e58e2f0191c541761608f0ac37acb2d6" // Hash from the request event
        
run the script and make the cancel ON L1:
        
    npx hardhat run scripts/optimism/cancelOP.js --network sepolia
    
result: https://sepolia.etherscan.io/tx/0x04b98a59242999b8ab018b85a55edf39152d577582eabd91f260f862fd3d1b58

**3. Check the data**
Check the data on the L1CrossTradeOP contract: https://sepolia.etherscan.io/tx/0x04b98a59242999b8ab018b85a55edf39152d577582eabd91f260f862fd3d1b58
    -> the request was canceled and the amount was returned to the requestor on L2 (0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C)

Check the data on the L2CrossTradeOP contract: https://sepolia-optimistic.etherscan.io/tx/0x3707bd032f298339f99583a6eaa9e492084aabaa23c888a63abda6dcbd4eed0f
    -> the request was canceled and the amount was returned to the requestor on L2 (0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C)


