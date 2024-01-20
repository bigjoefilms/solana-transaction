'use client'
import Link from 'next/link';
import {useState} from 'react'
import "dotenv/config";
import * as fs from 'fs';
import { Connection,PublicKey,clusterApiUrl,LAMPORTS_PER_SOL,Transaction,SystemProgram, sendAndConfirmTransaction,Keypair} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"; 

export default function TransaferSol() {
    const [inputValue, setInputValue] = useState("");
     const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string>('');
      const [amount, setAmount] = useState<number>(0);
    //   const secret = JSON.parse(fs.readFileSync("ephKey.json")toString()) as number[]

      const senderKeypair = Keypair.fromSecretKey(new Uint8Array([
        200, 167, 248, 146,  42, 207, 145,  38, 242, 177,
        1,  75, 222, 114, 123, 150, 154, 181, 192, 143,
        87, 102, 217, 183,  39, 235, 100, 115, 119,  55,
        120,  14,  32,   9, 196, 130, 210,  10,  94, 239,
        244, 222,  20, 206, 159, 186,  25, 148, 173, 137,
        155, 154,  84, 142, 211, 198,  70, 198, 210,  79,
        251, 235, 253, 110
      ]));
      
      const transaction = new Transaction();
      const LAMPORTS_TO_SEND = amount;

      async function tranferUsingWeb3() {
        try {
         
            setLoading(true);
            if (!inputValue) {
              setError('Please enter an address');
              setLoading(false);
              return;
            }
            const toPubkey = new PublicKey(inputValue);
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
            const sendSolInstruction = SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey,
                lamports: LAMPORTS_TO_SEND,
              });
              transaction.add(sendSolInstruction);
           
              const signature = await sendAndConfirmTransaction(
                connection,
                 transaction, [
                senderKeypair,
              ]);
      
              console.log(
                `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
              );
              console.log(`Transaction signature is ${signature}!`); 
        
             
        
           setLoading(false); 
        } catch (error) {
          setError('Invalid wallet address');
          setLoading(false); 
        
           
             
       
           
          console.error('Error fetching balance:', error);
        }
      }
      const handleAmountChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setAmount(parseFloat(event.target.value));
        setError('');
      };
      const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputValue(event.target.value);
        setError('');
      };
    
    
      

  return (
    <main  className=' flex items-center justify-center'>
    <div className=' flex justify-center items-center  flex-col  h-[100vh] '>

   
    <Link href={'/'}> <h1 className='text-[54px] font-bold'>Transfer SOL</h1></Link>
       <div className='flex flex-col px-[10px]'>
        <div>
        <h1 className='text-[20px] font-bold'>Amount</h1>
        <input type='number'
        className=' border border-[#111111] px-[12px] my-[20px]  w-[440px] h-[50px] rounded-[10px] '
        value={amount}
        onChange={handleAmountChange}
        />
         {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
        <h1 className='text-[20px] font-bold'>To</h1>
        <div>
        <input type='text'
        className=' border border-[#111111] px-[12px] my-[20px]  w-[440px] h-[50px] rounded-[10px] '
        value={inputValue}
        onChange={handleInputChange}
        />
         {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
      
      
       <div className='flex gap-8 flex-col'>
     
<button
       onClick={tranferUsingWeb3}
       className={` bg-[#111111] cursor-pointer text-[#ffff] px-[20px] py-[15px] rounded-[10px]  hover:opacity-[0.85]  w-full  h-[50px] text-[14px]`}
       > {loading ? (
            <div className="absolute inset-0 flex items-center justify-center text-[#ffffff] top-11">
              Loading...
            </div>
          ) : (
            'Transfer SOL'
          )}</button>
        
          



       </div>

       </div>
     
       </div>
      
   
   </main>
  )
}
