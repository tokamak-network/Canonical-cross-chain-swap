const hre = require("hardhat");

async function main() {
  console.log("Deploying L2CrossTradeARB...");

  const L2CrossTradeARB = await hre.ethers.getContractFactory("L2CrossTradeARB");
  const l2CrossTradeARB = await L2CrossTradeARB.deploy();

  await l2CrossTradeARB.waitForDeployment();

  const l2CrossTradeARBAddress = await l2CrossTradeARB.getAddress();
  console.log("L2CrossTradeARB deployed to:", l2CrossTradeARBAddress);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 