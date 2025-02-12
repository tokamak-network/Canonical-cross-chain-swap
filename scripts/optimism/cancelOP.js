const hre = require("hardhat");

async function main() {
  const L1_CROSS_TRADE_OP_ADDRESS = "0xd61337c07fa197742301E74fD0AF6318049f16a6";

  // Parameters for canceling the request
  const params = {
    l1token: "0x0000000000000000000000000000000000000000", // ETH on L1
    l2token: "0x0000000000000000000000000000000000000000", // ETH on L2
    totalAmount: hre.ethers.parseEther("0.1"), // Total amount from request
    initialctAmount: hre.ethers.parseEther("0.02"), // Initial CT amount from request
    salecount: 3n, // The saleCount from the request event
    l2chainId: 11155420n, // OP Sepolia chain ID
    minGasLimit: 200000, // uint32
    hash: "0x024ae3d4a9ee855946b00f24c4b8ecd7e58e2f0191c541761608f0ac37acb2d6" // Hash from the request event
  };

  console.log("Canceling request on L1CrossTradeOP...");
  console.log("Contract Address:", L1_CROSS_TRADE_OP_ADDRESS);
  console.log("\nParameters:");
  console.log("L1 Token:", params.l1token);
  console.log("L2 Token:", params.l2token);
  console.log("Total Amount:", hre.ethers.formatEther(params.totalAmount), "ETH");
  console.log("Initial CT Amount:", hre.ethers.formatEther(params.initialctAmount), "ETH");
  console.log("Sale Count:", params.salecount.toString());
  console.log("L2 Chain ID:", params.l2chainId.toString());
  console.log("Min Gas Limit:", params.minGasLimit);
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

    const tx = await l1CrossTradeOP.cancel(
      params.l1token,
      params.l2token,
      params.totalAmount,
      params.initialctAmount,
      params.salecount,
      params.l2chainId,
      params.minGasLimit,
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