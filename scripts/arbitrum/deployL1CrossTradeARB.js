const hre = require("hardhat");

async function main() {
  console.log("Deploying L1CrossTradeARB...");

  const L1CrossTradeARB = await hre.ethers.getContractFactory("L1CrossTradeARB");
  const l1CrossTradeARB = await L1CrossTradeARB.deploy();

  await l1CrossTradeARB.waitForDeployment();
  
  const l1CrossTradeARBAddress = await l1CrossTradeARB.getAddress();
  console.log("L1CrossTradeARB deployed to:", l1CrossTradeARBAddress);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 