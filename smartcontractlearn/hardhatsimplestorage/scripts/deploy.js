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
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contract...");
    await simpleStorage.deployTransaction.wait(3);
    await verify(simpleStorage.address, []);
  }

  const favoriteNumber = await simpleStorage.retrieve();
  console.log("favoriteNumber before:", favoriteNumber);
  const setNumberTxn = await simpleStorage.store(13);
  await setNumberTxn.wait();
  const favoriteNumber2 = await simpleStorage.retrieve();
  console.log("favoriteNumber after:", favoriteNumber2);
}

//verify contract
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    if (err.message.includes("already verified")) {
      console.log("Contract already verified");
    } else {
      console.log(err);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
