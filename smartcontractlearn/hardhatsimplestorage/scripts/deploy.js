const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();
async function main() {
  //http://127.0.0.1:7545
  console.log("deploy.js");
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  console.log("rpc url: ", process.env.RPC_URL);
  balance = await provider.getBalance(
    "0xC33280B02119054326bbb8d4564F546dbE27b1b4",
  );
  console.log("balance: ", ethers.formatEther(balance));

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("wallet: ", wallet.address);
  // const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJsonKey,
  //   process.env.PRIVATE_KEY_PASSWORD,
  // );
  // wallet = wallet.connect(provider);
  // read abi
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  // read the compiled contract
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8",
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contract...");
  // const contract = await contractFactory.deploy({
  //   gasPrice: 20000000000,
  //   gasLimit: 6721975,
  // });
  const contract = await contractFactory.deploy();
  // console.log(contract);
  console.log(
    "here is the deploymenttransaction: contract.deploymenttransaction()",
  );
  console.log(contract.deploymentTransaction());
  // wait transaction receipt
  const transactionReceipt = await contract.deploymentTransaction().wait(1);
  console.log("Here is the transactionReceipt: ");
  console.log("Contract address: ", contractFactory.address);
  console.log(transactionReceipt);
  // console.log("deploy with olny transaction data ")
  // const nonce = await wallet.getNonce();
  // const transaction = {
  //   nonce: nonce,
  //   gasLimit: 6721975,
  //   gasPrice: 20000000000,
  //   to: null,
  //   value: 0,
  //   chainId: 1337,
  //   data: "0x60806040523480156100115760006000fd5b50610017565b610834806100266000396000f3fe60806040523480156100115760006000fd5b50600436106100675760003560e01c80632e64cec11461006d578063471f7cdf1461008b5780636057361d146100a95780636f760f41146100c55780638bab8dd5146100e15780639e7a13ad1461011157610067565b60006000fd5b610075610142565b60405161008291906105c7565b60405180910390f35b610093610154565b6040516100a091906105c7565b60405180910390f35b6100c360048036038101906100be9190610505565b61015d565b005b6100df60048036038101906100da91906104a7565b61017c565b005b6100fb60048036038101906100f6919061045d565b61022a565b60405161010891906105c7565b60405180910390f35b61012b60048036038101906101269190610505565b61025b565b6040516101399291906105e3565b60405180910390f35b60006000600050549050610151565b90565b60006000505481565b80600060005081909090555061017761014263ffffffff16565b505b50565b60006040518060400160405280838152602001848152602001509050600160005081908060018154018082558091505060019003906000526020600020906002020160005b9091909190915060008201518160000160005090905560208201518160010160005090805190602001906101f6929190610321565b5050508160026000508460405161020d91906105af565b9081526020016040518091039020600050819090905550505b5050565b6002600050818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6001600050818154811061026e57600080fd5b906000526020600020906002020160005b9150905080600001600050549080600101600050805461029e906106e7565b80601f01602080910402602001604051908101604052809291908181526020018280546102ca906106e7565b80156103175780601f106102ec57610100808354040283529160200191610317565b820191906000526020600020905b8154815290600101906020018083116102fa57829003601f168201915b5050505050905082565b82805461032d906106e7565b90600052602060002090601f01602090048101928261034f576000855561039b565b82601f1061036857805160ff191683800117855561039b565b8280016001018555821561039b579182015b8281111561039a578251826000509090559160200191906001019061037a565b5b5090506103a891906103ac565b5090565b6103b1565b808211156103cb57600081815060009055506001016103b1565b5090566107fd565b60006103e66103e18461063b565b610614565b905082815260208101848484011115610402576104016107b8565b5b61040d8482856106a2565b505b9392505050565b600082601f830112151561042d5761042c6107b0565b5b813561043d8482602086016103d3565b9150505b92915050565b600081359050610456816107e2565b5b92915050565b600060208284031215610473576104726107c8565b5b600082013567ffffffffffffffff811115610491576104906107c0565b5b61049d84828501610416565b9150505b92915050565b60006000604083850312156104bf576104be6107c8565b5b600083013567ffffffffffffffff8111156104dd576104dc6107c0565b5b6104e985828601610416565b92505060206104fa85828601610447565b9150505b9250929050565b60006020828403121561051b5761051a6107c8565b5b600061052984828501610447565b9150505b92915050565b600061053e8261066d565b6105488185610679565b93506105588185602086016106b2565b610561816107d0565b84019150505b92915050565b60006105788261066d565b610582818561068b565b93506105928185602086016106b2565b8084019150505b92915050565b6105a881610697565b825250505b565b60006105bb828461056d565b91508190505b92915050565b60006020820190506105dc600083018461059f565b5b92915050565b60006040820190506105f8600083018561059f565b818103602083015261060a8184610533565b90505b9392505050565b600061061e610630565b905061062a828261071c565b5b919050565b600060405190505b90565b600067ffffffffffffffff8211156106565761065561077f565b5b61065f826107d0565b90506020810190505b919050565b6000815190505b919050565b60008282526020820190505b92915050565b60008190505b92915050565b60008190505b919050565b828183376000838301525050505b565b60005b838110156106d15780820151818401525b6020810190506106b5565b838111156106e0576000848401525b505050505b565b60006002820490506001821680151561070157607f821691505b602082108114156107155761071461074e565b5b505b919050565b610725826107d0565b810181811067ffffffffffffffff821117156107445761074361077f565b5b806040525050505b565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b565b60006000fd5b565b60006000fd5b565b60006000fd5b565b60006000fd5b565b6000601f19601f83011690505b919050565b6107eb81610697565b811415156107f95760006000fd5b505b565bfea2646970667358221220224ff4af853ed97514e1bb234eecb82bb4590ec2d4f293539d23b05674f7d06a64736f6c63430008050033",
  // };
  // const sentTxResponse = await wallet.sendTransaction(transaction);
  // await sentTxResponse.wait(1);
  // console.log("sentTxResponse: ", sentTxResponse);
  //
  // get number
  const favoriteNumber = await contract.retrieve();
  console.log("favoriteNumber: ", favoriteNumber.toString());
  // set number
  const transactionResponse = await contract.store("13");
  await transactionResponse.wait(1);
  const newFavoriteNumber = await contract.retrieve();
  console.log("newFavoriteNumber: ", newFavoriteNumber.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
