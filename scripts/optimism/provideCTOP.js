const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Parameters for providing the cross-trade
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    requestor: "0xB4032ff3335F0E54Fb0291793B35955e5dA30B0C", // address that made the request
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    editedAmount: hre.ethers.parseEther("0.03"), // New amount to receive
    salecount: 2n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    minGasLimit: 200000n, // Minimum gas limit for L2 execution
    hash: "0x7779C0DDE038D0D5BB6BAC2D15C4BC6DF8C32581B6365E8462CBA402D2F237BD" // Hash from the request event
  };

  const value_to_send = params.editedAmount != 0n ? params.editedAmount : params.initialctAmount;

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
        value: value_to_send // Include ETH value since we're using native token
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