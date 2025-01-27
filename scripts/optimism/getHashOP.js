const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Parameters for getHash function
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH by default
    l2token: "0x0000000000000000000000000000000000000000", // ETH by default
    requestor: "0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C",
    totalAmount: hre.ethers.parseEther("0.1"), // 1 ETH as example
    ctAmount: hre.ethers.parseEther("0.02"), // 0.1 ETH as example
    saleCount: 3, // example sale count
    startChainId: 11155420n, // OP Sepolia chain ID
    endChainId: 11155111n // Sepolia chain ID
  };


  console.log("Getting hash from L1CrossTradeOP...");
  console.log("Contract Address:", L1_CROSS_TRADE_OP_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Requestor:", params.requestor);
  console.log("Total Amount:", params.totalAmount.toString());
  console.log("CT Amount:", params.ctAmount.toString());
  console.log("Sale Count:", params.saleCount);
  console.log("Start Chain ID:", params.startChainId);
  console.log("End Chain ID:", params.endChainId);

  // Get contract instance
  const l1CrossTradeOP = await hre.ethers.getContractAt(
    "L1CrossTradeOP",
    L1_CROSS_TRADE_OP_ADDRESS
  );

  try {
    const hash = await l1CrossTradeOP.getHash(
      params.l1token,
      params.l2token,
      params.requestor,
      params.totalAmount,
      params.ctAmount,
      params.saleCount,
      params.startChainId,
      params.endChainId
    );
    
    console.log("\nGenerated Hash:", hash);
  } catch (error) {
    console.error("Error getting hash:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 