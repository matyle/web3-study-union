//import
// main func
const ethers = require("hardhat");
async function main() {
  const simpleStorageFactory = await ethers.ethers.getContractFactory(
    "SimpleStorage"
  );
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  console.log("Contract deployed to:", await simpleStorage.getAddress());

  const favoriteNumber = await simpleStorage.retrieve();
  console.log("favoriteNumber before:", favoriteNumber);
  const setNumberTxn = await simpleStorage.store(13);
  await setNumberTxn.wait();
  const favoriteNumber2 = await simpleStorage.retrieve();
  console.log("favoriteNumber after:", favoriteNumber2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
