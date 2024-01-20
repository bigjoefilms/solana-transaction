import { Connection,PublicKey,clusterApiUrl,LAMPORTS_PER_SOL} from "@solana/web3.js";

const publickey = new PublicKey('82XDhVo7k84o2SzZ3AYy2mBF66RuVYK8ZMeMmrLaVuCH')

async function getBalanceUsingWeb3(address :PublicKey): Promise<number>{
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address)

}
 getBalanceUsingWeb3(publickey).then(balance => {
    console.log(balance / LAMPORTS_PER_SOL , 'sol')
 })
