const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_ARB_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Parameters for getHash function
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH by default
    l2token: "0x0000000000000000000000000000000000000000", // ETH by default
    requestor: "0x0000000000000000000000000000000000000000",
    totalAmount: hre.ethers.parseEther("1.0"), // 1 ETH as example
    ctAmount: hre.ethers.parseEther("0.1"), // 0.1 ETH as example
    saleCount: "1", // example sale count
    startChainId: "421614", // Arbitrum Sepolia chain ID
    endChainId: "11155111" // Sepolia chain ID
  };

  console.log("Getting hash from L1CrossTradeARB...");
  console.log("Contract Address:", L1_CROSS_TRADE_ARB_ADDRESS);
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
  const l1CrossTradeARB = await hre.ethers.getContractAt(
    "L1CrossTradeARB",
    L1_CROSS_TRADE_ARB_ADDRESS
  );

  try {
    const hash = await l1CrossTradeARB.getHash(
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