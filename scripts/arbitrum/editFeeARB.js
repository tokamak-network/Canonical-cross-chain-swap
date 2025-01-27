const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_ARB_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Parameters for editing the fee
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("1.0"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.1"), // Initial CT amount from request
    editedctAmount: hre.ethers.parseEther("0.15"), // New amount to receive
    salecount: 1n, // The saleCount from the request event
    l2chainId: 421614n, // Arbitrum Sepolia chain ID
    hash: "0x8a93d2d389d87d8e53ead338c3d96e873f6dbf2f505939c627c3f35a29cc2c24" // Hash from the request event
  };

  console.log("Editing fee on L1CrossTradeARB...");
  console.log("Contract Address:", L1_CROSS_TRADE_ARB_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Total Amount:", hre.ethers.formatEther(params.totalAmount), "ETH");
  console.log("Initial CT Amount:", hre.ethers.formatEther(params.initialctAmount), "ETH");
  console.log("New CT Amount:", hre.ethers.formatEther(params.editedctAmount), "ETH");
  console.log("Sale Count:", params.salecount.toString());
  console.log("L2 Chain ID:", params.l2chainId.toString());
  console.log("Hash:", params.hash);

 
  // Get contract instance
  const l1CrossTradeARB = await hre.ethers.getContractAt(
    "L1CrossTradeARB",
    L1_CROSS_TRADE_ARB_ADDRESS
  );

    const tx = await l1CrossTradeARB.editFee(
      params.l1token,
      params.l2token,
      params.totalAmount,
      params.initialctAmount,
      params.editedctAmount,
      params.salecount,
      params.l2chainId,
      params.hash
    );

    console.log("\nTransaction sent:", tx.hash);
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 