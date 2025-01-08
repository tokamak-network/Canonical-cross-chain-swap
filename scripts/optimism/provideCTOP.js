const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_OP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Parameters for providing the cross-trade
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    requestor: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // address that made the request
    totalAmount: hre.ethers.parseEther("1.0"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.1"), // Initial CT amount from request
    editedAmount: 0n, // If the amount was edited (0 if not edited)
    salecount: 1n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    minGasLimit: 200000n, // Minimum gas limit for L2 execution
    hash: "0x8a93d2d389d87d8e53ead338c3d96e873f6dbf2f505939c627c3f35a29cc2c24" // Hash from the request event
  };

  console.log("Providing CT on L1CrossTradeOP...");
  console.log("Contract Address:", L1_CROSS_TRADE_OP_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Requestor:", params.requestor);
  console.log("Total Amount:", hre.ethers.formatEther(params.totalAmount), "ETH");
  console.log("Initial CT Amount:", hre.ethers.formatEther(params.initialctAmount), "ETH");
  console.log("Edited Amount:", params.editedAmount.toString());
  console.log("Sale Count:", params.salecount.toString());
  console.log("L2 Chain ID:", params.l2chainId.toString());
  console.log("Min Gas Limit:", params.minGasLimit.toString());
  console.log("Hash:", params.hash);

  // Get contract instance
  const l1CrossTradeOP = await hre.ethers.getContractAt(
    "L1CrossTradeOP",
    L1_CROSS_TRADE_OP_ADDRESS
  );

  
    // Call provideCT with ETH value
    const tx = await l1CrossTradeOP.provideCT(
      params.l1token,
      params.l2token,
      params.requestor,
      params.totalAmount,
      params.initialctAmount,
      params.editedAmount,
      params.salecount,
      params.l2chainId,
      params.minGasLimit,
      params.hash,
      {
        value: params.initialctAmount // Include ETH value since we're using native token
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