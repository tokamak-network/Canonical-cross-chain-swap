const hre = require("hardhat");

async function main() {
  console.log("Deploying L1CrossTradeOP...");

  const L1CrossTradeOP = await hre.ethers.getContractFactory("L1CrossTradeOP");
  const l1CrossTradeOP = await L1CrossTradeOP.deploy();

  await l1CrossTradeOP.waitForDeployment();

  const l1CrossTradeOPAddress = await l1CrossTradeOP.getAddress();
  console.log("L1CrossTradeOP deployed to:", l1CrossTradeOPAddress);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 