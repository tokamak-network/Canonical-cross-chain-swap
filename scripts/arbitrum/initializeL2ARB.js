const hre = require("hardhat");
require('dotenv').config();

async function main() {
    const L2_CROSS_TRADE_ARB_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const L1_CROSS_TRADE_ARB_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const NATIVE_TOKEN_L2 = "0x0000000000000000000000000000000000000000";  // ARB Sepolia ETH
    const L1_CHAIN_ID = "11155111";  // Sepolia chain ID

  console.log("Initializing L2CrossTradeARB...");
  console.log("L2 Contract:", L2_CROSS_TRADE_ARB_ADDRESS);
  console.log("L1 Contract:", L1_CROSS_TRADE_ARB_ADDRESS);
  console.log("Native Token L2:", NATIVE_TOKEN_L2);
  console.log("L1 Chain ID:", L1_CHAIN_ID);

  const l2CrossTradeARB = await hre.ethers.getContractAt(
    "L2CrossTradeARB",
    L2_CROSS_TRADE_ARB_ADDRESS
  );

  console.log("Initializing...");
  try {
    const tx = await l2CrossTradeARB.initialize(
      L1_CROSS_TRADE_ARB_ADDRESS,
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