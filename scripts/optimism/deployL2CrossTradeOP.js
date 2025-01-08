const hre = require("hardhat");

async function main() {
  console.log("Deploying L2CrossTradeOP...");

  const L2CrossTradeOP = await hre.ethers.getContractFactory("L2CrossTradeOP");
  const l2CrossTradeOP = await L2CrossTradeOP.deploy();

  await l2CrossTradeOP.waitForDeployment();

  const l2CrossTradeOPAddress = await l2CrossTradeOP.getAddress();
  console.log("L2CrossTradeOP deployed to:", l2CrossTradeOPAddress);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 