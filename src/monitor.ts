import { createPublicClient, http } from 'npm:viem'
import { goerli } from 'npm:viem/chains'

const client = createPublicClient({
  chain: goerli,
  transport: http(),
})

const main = async () => {
    let latestBlockNumber = await client.getBlockNumber();
    console.log(`Current block number: ${latestBlockNumber}`);
  
    setInterval(async () => {
      const currentBlockNumber = await client.getBlockNumber();
      if (currentBlockNumber > latestBlockNumber) {
        const block = await client.getBlock({ blockNumber: currentBlockNumber, includeTransactions: true })
        if (block && block.transactions) {
          console.log(`New block number: ${block.number}`);
          block.transactions.forEach(tx => {
            console.log(`Transaction: from ${tx.from} to ${tx.to} amount: ${tx.value} ETH`);
          });
        }
        latestBlockNumber = currentBlockNumber;
      }
    }, 10000); // Poll every 10 seconds
  };
  
  main().catch(e => console.error(e));