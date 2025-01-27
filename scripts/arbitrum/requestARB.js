const hre = require("hardhat");

async function main() {
  const L2_CROSS_TRADE_ARB_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Request parameters
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("1.0"), // Amount to provide on L2
    ctAmount: hre.ethers.parseEther("0.1"), // Amount to receive on L1
    l1chainId: 11155111n // Sepolia chain ID
  };

  console.log("Making request on L2CrossTradeARB...");
  console.log("Contract Address:", L2_CROSS_TRADE_ARB_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Total Amount:", hre.ethers.formatEther(params.totalAmount), "ETH");
  console.log("CT Amount:", hre.ethers.formatEther(params.ctAmount), "ETH");
  console.log("L1 Chain ID:", params.l1chainId.toString());

  // Get contract instance
  const l2CrossTradeARB = await hre.ethers.getContractAt(
    "L2CrossTradeARB",
    L2_CROSS_TRADE_ARB_ADDRESS
  );

  // Since we're sending ETH, we need to include it in the transaction
  const tx = await l2CrossTradeARB.request(
    params.l1token,
    params.l2token,
    params.totalAmount,
    params.ctAmount,
    params.l1chainId,
    {
      value: params.totalAmount // Include ETH value since we're using native token
    }
  );

  console.log("\nTransaction sent:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 