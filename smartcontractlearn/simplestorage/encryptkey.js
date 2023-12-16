const ethers = require('ethers');
const fs = require('fs');
require('dotenv').config()
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
  )
  console.log(encryptedJsonKey)
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}

main().then(() => process.exit(0)).catch(
  (error) => {
    console.error(error);
    process.exit(1);
  }
)
