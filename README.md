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
- L1CrossTradeOP: [0x23DDf582c26Da5FDb7514aD22e7D74A369faD117](https://etherscan.io/address/0x23DDf582c26Da5FDb7514aD22e7D74A369faD117#code)
- L1CrossTradeARB: [0x26947c3dc054c5220fe3f999e2f9109eaea17e26](https://etherscan.io/address/0x26947c3dc054c5220fe3f999e2f9109eaea17e26)

## Contract Addresses on Optimism Sepolia 
- L2CrossTradeOP: [0xD6e99ec486Afc8ae26d36a6Ab6240D1e0ecf0271](https://explorer.titan.tokamak.network/address/0xD6e99ec486Afc8ae26d36a6Ab6240D1e0ecf0271)

## Contract Addresses on Arbitrum Sepolia 
- L2CrossTradeARB: [0xC597fE33d2066c9929a4AF3a0004f5ec55d39E06](https://explorer.titan.tokamak.network/address/0xC597fE33d2066c9929a4AF3a0004f5ec55d39E06)


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
1. **Install the required utilities**
    ```solidity
    brew install make jq just
    ```


5. **hardhat.config.ts check**
    ```solidity
    devnetL1: {
        url: 'http://localhost:8545',
    }
    devnetL2: {
        url: 'http://localhost:9545',
    }
    ```

2. **crossTrade Test**
    - git clone https://github.com/tokamak-network/crossTrade/tree/main
    - npm install 
    - .env.example copy .env and setting
    - update json
