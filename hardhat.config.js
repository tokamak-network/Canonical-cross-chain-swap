require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.24',
        settings: {
          viaIR: true,
          optimizer: {
              enabled: true,
              runs: 100000000,
              details: {
                  yul: true,
              },
          },
        }
      },
      {
        version: '0.4.17'
      }
    ],
    settings: {
      viaIR: true,
      optimizer: {
          enabled: true,
          runs: 100000000,
          details: {
              yul: true,
          },
      },
    },
  },

  etherscan: {
    apiKey: {
      optimismSepolia: `${process.env.OP_SEPOLIA_APY_KEY}`,
      sepolia: `${process.env.SEPOLIA_APY_KEY}`
    },
    customChains: [
      {
        network: "optimismSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimistic.etherscan.io"
        },
      },
      {
        network: "thanosSepolia",
        chainId: 111551119090,
        urls: {
            apiURL: "https://explorer.thanos-sepolia.tokamak.network/api",
            browserURL: "https://explorer.thanos-sepolia.tokamak.network/",
        },
      },
  
    ]


  },
  networks: {
    l1: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    l2: {
      url: "http://127.0.0.1:8546",
      chainId: 17,
    },
    mainnet: {
      url: process.env.L1_RPC || 'https://mainnet-l1-rehearsal.optimism.io',
      accounts: [
        'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      ],
    },
    sepolia: {
      url: `https://sepolia.drpc.org`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    optimismSepolia: {
      url: `https://sepolia.optimism.io`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    arbitrumSepolia: {
      url: `https://endpoints.omniatech.io/v1/arbitrum/sepolia/public`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    thanosSepolia: {
      url: 'https://rpc.thanos-sepolia-test.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`],
    }
  },
}