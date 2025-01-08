const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_ARB_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Parameters for canceling the request
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("1.0"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.1"), // Initial CT amount from request
    salecount: 1n, // The saleCount from the request event
    l2chainId: 421614n, // Arbitrum Sepolia chain ID
    minGasLimit: 200000, // uint32
    maxSubmissionCost: hre.ethers.parseEther("0.01"), // Cost for submitting retryable ticket
    maxFeePerGas: hre.ethers.parseUnits("0.1", "gwei"), // Max fee per gas for L2 execution
    hash: "0x8a93d2d389d87d8e53ead338c3d96e873f6dbf2f505939c627c3f35a29cc2c24" // Hash from the request event
  };

  // Get contract instance
  const l1CrossTradeARB = await hre.ethers.getContractAt(
    "L1CrossTradeARB",
    L1_CROSS_TRADE_ARB_ADDRESS
  );

  // Calculate required ETH for the retryable ticket
  const message = l1CrossTradeARB.interface.encodeFunctionData("cancelCT", [
    params.l1token,
    params.salecount,
    params.hash
  ]);

  const requiredETH = await l1CrossTradeARB.getRequiredETH(
    message,
    params.minGasLimit,
    params.maxFeePerGas
  );

  console.log("Canceling request on L1CrossTradeARB...");
  console.log("Contract Address:", L1_CROSS_TRADE_ARB_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Total Amount:", hre.ethers.formatEther(params.totalAmount), "ETH");
  console.log("Initial CT Amount:", hre.ethers.formatEther(params.initialctAmount), "ETH");
  console.log("Sale Count:", params.salecount.toString());
  console.log("L2 Chain ID:", params.l2chainId.toString());
  console.log("Min Gas Limit:", params.minGasLimit);
  console.log("Max Submission Cost:", hre.ethers.formatEther(params.maxSubmissionCost), "ETH");
  console.log("Max Fee Per Gas:", hre.ethers.formatUnits(params.maxFeePerGas, "gwei"), "gwei");
  console.log("Required ETH:", hre.ethers.formatEther(requiredETH), "ETH");
  console.log("Hash:", params.hash);

  try {
    const tx = await l1CrossTradeARB.cancel(
      params.l1token,
      params.l2token,
      params.totalAmount,
      params.initialctAmount,
      params.salecount,
      params.l2chainId,
      params.minGasLimit,
      params.maxSubmissionCost,
      params.maxFeePerGas,
      params.hash,
      {
        value: requiredETH // Include ETH for retryable ticket
      }
    );

    console.log("\nTransaction sent:", tx.hash);
    
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);

  } catch (error) {
    console.error("Error canceling request:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 