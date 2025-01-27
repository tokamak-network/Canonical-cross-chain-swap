const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const L2_CROSS_TRADE_OP_ADDRESS = "0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E";
  const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";
  const L1_CROSS_DOMAIN_MESSENGER = "0x4200000000000000000000000000000000000007";  // OP Sepolia CrossDomainMessenger
  const NATIVE_TOKEN_L2 = "0x0000000000000000000000000000000000000000";  // OP Sepolia ETH
  const L1_CHAIN_ID = "11155111";  // Sepolia chain ID

  console.log("Initializing L2CrossTradeOP...");
  console.log("L2 Contract:", L2_CROSS_TRADE_OP_ADDRESS);
  console.log("L1 Contract:", L1_CROSS_TRADE_OP_ADDRESS);
  console.log("L1CrossDomainMessenger:", L1_CROSS_DOMAIN_MESSENGER);
  console.log("Native Token L2:", NATIVE_TOKEN_L2);
  console.log("L1 Chain ID:", L1_CHAIN_ID);

  // Get L2 contract instance
  const l2CrossTradeOP = await hre.ethers.getContractAt(
    "L2CrossTradeOP",
    L2_CROSS_TRADE_OP_ADDRESS
  );

  console.log("Initializing...");
  try {
    const tx = await l2CrossTradeOP.initialize(
      L1_CROSS_DOMAIN_MESSENGER,
      L1_CROSS_TRADE_OP_ADDRESS,
      NATIVE_TOKEN_L2,
      L1_CHAIN_ID
    );
    await tx.wait();
    console.log("Initialization successful!");
  } catch (error) {
    console.error("Error initializing contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 