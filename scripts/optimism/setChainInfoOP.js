const hre = require("hardhat");
require('dotenv').config();

async function main() {
  // Contract addresses - replace these with your deployed contract addresses
  const L1_CROSS_TRADE_OP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const L2_CROSS_TRADE_OP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const CROSS_DOMAIN_MESSENGER = "0x4200000000000000000000000000000000000007";  // Optimism's CrossDomainMessenger address
  const L2_CHAIN_ID = "11155420";  // Optimism Sepolia chain ID


  console.log("Setting up chain information for Optimism...");
  console.log("L1 Contract:", L1_CROSS_TRADE_OP_ADDRESS);
  console.log("L2 Contract:", L2_CROSS_TRADE_OP_ADDRESS);
  console.log("CrossDomainMessenger:", CROSS_DOMAIN_MESSENGER);
  console.log("L2 Chain ID:", L2_CHAIN_ID);

  const l1CrossTradeOP = await hre.ethers.getContractAt(
    "L1CrossTradeOP",
    L1_CROSS_TRADE_OP_ADDRESS
  );

  console.log("Setting chain info...");
  try {
    const tx = await l1CrossTradeOP.setChainInfo(
      CROSS_DOMAIN_MESSENGER,
      L2_CROSS_TRADE_OP_ADDRESS,
      L2_CHAIN_ID
    );
    await tx.wait();
    console.log("Chain info set successfully!");
  } catch (error) {
    console.error("Error setting chain info:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 