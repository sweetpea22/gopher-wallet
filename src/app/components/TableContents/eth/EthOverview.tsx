/* eslint-disable react-hooks/rules-of-hooks */
import { useAccount } from 'wagmi';
import InputFields from './InputFields';
import { getAllBalances } from '@/formulas/utils';
import { useEffect, useState } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { Chains } from '@/app/constants';
import { BigNumber } from 'ethers';
import { AccountDetails } from '@/app/interfaces';

export function EthOverview() {
  const { address } = useAccount();
  const [balances, setBalances] = useState<AccountDetails[]>([]);
  const [totalEth, setTotalEth] = useState<Number | any>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getBalanceByChain = async () => {
      const data = await getAllBalances(address as string, Chains)
      setBalances(data);
    }
    getBalanceByChain();

    const getTotalEth = () => {
      if (balances.length > 1) {
      let sum = (a: any[]) => a.reduce((x: any, y: any) => x + y);
    
      let totalAmount = sum(balances.map((x) => Number(formatEther(x.balance))));
        setTotalEth(totalAmount)
      }
    }
    getTotalEth()
  }, [address, balances, totalEth])

  

  return (
    <tr>
      <td className="flex flex-col whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-100 sm:pl-6">
        <div className='flex flex-row items-center'>
          <div className='bg-indigo-200 rounded-xl h-6 w-6 mr-2'></div>Ethereum
        </div>
        <div>
           {balances ? balances.map((item:any, index:number) => (
              <p key={index} className='mt-2 text-gray-200'>{item.chain.name}</p>
            )) : null}
        </div>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">$1,323 USD</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{totalEth}</td>
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <a href="#" className="text-indigo-100 hover:text-indigo-400">
            Send
          </a>
        </td>
    </tr>
  );
}