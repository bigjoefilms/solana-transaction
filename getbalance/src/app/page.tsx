"use client"
import {  useState } from "react";
import { Connection,PublicKey,clusterApiUrl,LAMPORTS_PER_SOL} from "@solana/web3.js";
import Link from "next/link";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isExecutable, setIsExecutable] = useState<boolean | undefined>(undefined); // Initialized as undefined
 const [balance, setBalance] = useState<string>('');
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');


  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
    setError('');
  };

async function getBalanceUsingWeb3() {
  try {
   
      setLoading(true);
      if (!inputValue) {
        setError('Please enter an address');
        setLoading(false);
        return;
      }

    const publicKey = new PublicKey(inputValue);
    
    const connection = new Connection(clusterApiUrl('devnet'));
    
    const fetchedBalance = await connection.getBalance(publicKey);
       
    // setBalance(fetchedBalance / 1000000000);
    console.log(fetchedBalance,':Sol') 
     connection.getAccountInfo(publicKey).then( accountInfo => {
        if (accountInfo) {
          setIsExecutable(accountInfo?.executable );
          setBalance(accountInfo.lamports ? (accountInfo.lamports / LAMPORTS_PER_SOL).toString() : '');
        }})
     setLoading(false); 
  } catch (error) {
    setError('Invalid wallet address');
    setLoading(false); 
  
     
       
 
     
    console.error('Error fetching balance:', error);
  }
}


  
  return (
   <main  className=' flex items-center justify-center'>
    <div className=' flex justify-center items-center  flex-col  h-[100vh] '>

   
       <h1 className='text-[54px] font-bold'>Start Your Solana Journey</h1>
       <div className='flex flex-col px-[10px]'>
       <input type='text'
        className=' border border-[#111111] px-[12px] my-[20px]  w-[440px] h-[50px] rounded-[10px] '
        value={inputValue}
        onChange={handleInputChange}/>
         {error && <p style={{ color: 'red' }}>{error}</p>}
       <div className='flex gap-8 flex-col'>
       <button
       
       className={` bg-[#111111] ${!inputValue ? 'cursor-not-allowed' : 'cursor-pointer'} text-[#ffff] px-[20px] py-[15px] rounded-[10px]  hover:opacity-[0.85]  w-full  h-[50px] text-[14px]`}
        onClick={getBalanceUsingWeb3}> {loading ? (
            <div className="absolute inset-0 flex items-center justify-center text-[#ffffff] top-11">
              Loading...
            </div>
          ) : (
            'Check Balance'
          )}</button>
<Link href={'/transfer'}><button
       
       className={` bg-[#111111] cursor-pointer text-[#ffff] px-[20px] py-[15px] rounded-[10px]  hover:opacity-[0.85]  w-full  h-[50px] text-[14px]`}
       > {loading ? (
            <div className="absolute inset-0 flex items-center justify-center text-[#ffffff] top-11">
              Loading...
            </div>
          ) : (
            'Transfer SOL'
          )}</button>
          </Link>
          



       </div>

       </div>
       <div className='text-[#111111] text-[40px] font-semibold my-[20px]'>
        {balance}:SOL

       </div>
       <div>{`Is It Executable ${isExecutable?'Yep':'Nope'}`}</div>
       </div>
      
   
   </main>
  )
}
