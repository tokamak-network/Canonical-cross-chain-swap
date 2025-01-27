const hre = require("hardhat");
require('dotenv').config();

async function main() {
  // Contract addresses - replace these with your deployed contract addresses
  const L1_CROSS_TRADE_ARB_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";
  const L2_CROSS_TRADE_ARB_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";
  const INBOX_ADDRESS = "0xaAe29B0366299461418F5324a79Afc425BE5ae21";  // Arbitrum Sepolia Inbox
  const L2_CHAIN_ID = "421614";  // Arbitrum Sepolia chain ID

  console.log("Setting up chain information for Arbitrum...");
  console.log("L1 Contract:", L1_CROSS_TRADE_ARB_ADDRESS);
  console.log("L2 Contract:", L2_CROSS_TRADE_ARB_ADDRESS);
  console.log("Inbox Address:", INBOX_ADDRESS);
  console.log("L2 Chain ID:", L2_CHAIN_ID);

  const l1CrossTradeARB = await hre.ethers.getContractAt(
    "L1CrossTradeARB",
    L1_CROSS_TRADE_ARB_ADDRESS
  );

  console.log("Setting chain info...");
  try {
    const tx = await l1CrossTradeARB.setChainInfo(
      INBOX_ADDRESS,
      L2_CROSS_TRADE_ARB_ADDRESS,
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