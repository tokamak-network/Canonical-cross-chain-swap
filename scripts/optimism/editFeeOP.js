const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Parameters for editing the fee
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    editedctAmount: hre.ethers.parseEther("0.03"), // New amount to receive
    salecount: 2n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    hash: "0x7779c0dde038d0d5bb6bac2d15c4bc6df8c32581b6365e8462cba402d2f237bd" // Hash from the request event
  };       

  console.log("Editing fee on L1CrossTradeOP...");
  console.log("Contract Address:", L1_CROSS_TRADE_OP_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Total Amount:", hre.ethers.formatEther(params.totalAmount), "ETH");
  console.log("Initial CT Amount:", hre.ethers.formatEther(params.initialctAmount), "ETH");
  console.log("New CT Amount:", hre.ethers.formatEther(params.editedctAmount), "ETH");
  console.log("Sale Count:", params.salecount.toString());
  console.log("L2 Chain ID:", params.l2chainId.toString());
  console.log("Hash:", params.hash);

  // Check if contract is deployed before proceeding
  const code = await hre.ethers.provider.getCode(L1_CROSS_TRADE_OP_ADDRESS);
  if (code === "0x") {
    throw new Error("Contract is not deployed at this address");
  }

  // Get contract instance
  const l1CrossTradeOP = await hre.ethers.getContractAt(
    "L1CrossTradeOP",
    L1_CROSS_TRADE_OP_ADDRESS
  );

    const tx = await l1CrossTradeOP.editFee(
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