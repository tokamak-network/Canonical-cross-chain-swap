const hre = require("hardhat");
require('dotenv').config();

async function main() {
  // Contract addresses - replace these with your deployed contract addresses
  const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";
  const L2_CROSS_TRADE_OP_ADDRESS = "0x6613f8652EAfdFFd95a49428313e52Cc9b77e38E";
  const CROSS_DOMAIN_MESSENGER = "0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef";  // Optimism's CrossDomainMessenger address
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