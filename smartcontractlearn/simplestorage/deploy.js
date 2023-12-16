
const ethers = require("ethers");
const fs = require("fs");
async function main() {
  //http://127.0.0.1:7545
  console.log("deploy.js");
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  balance = await provider.getBalance("0xC33280B02119054326bbb8d4564F546dbE27b1b4")
  console.log("balance: ", ethers.formatEther(balance));
  
  const wallet = new ethers.Wallet(
    "0x48221f949afe0bf86789d208fb1ec13b6b3e702ecaf46cda3ad1900830b2ca42",
    provider
  )
  console.log("wallet: ", wallet.address)
  // read abi
  const abi =  fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  // read the compiled contract 
  const binary =  fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
  console.log("Deploying contract...");
  let contract = await contractFactory.deploy({ gasPrice: 20000000000, gasLimit: 6721975 });
  console.log("Contract address: ", contractFactory.address);
  console.log(contract);

}
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
})