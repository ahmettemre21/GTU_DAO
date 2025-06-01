import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseEther } from 'viem';

// STAT Token contract address (Hardhat local deployment için)
const STAT_TOKEN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// STAT Token ABI (basitleştirilmiş)
const STAT_TOKEN_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export function useStatToken() {
  const { address } = useAccount();

  // Token balance okuma
  const { data: balance, isLoading: balanceLoading } = useReadContract({
    address: STAT_TOKEN_ADDRESS,
    abi: STAT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Total supply okuma
  const { data: totalSupply } = useReadContract({
    address: STAT_TOKEN_ADDRESS,
    abi: STAT_TOKEN_ABI,
    functionName: 'totalSupply',
  });

  // Token mint etme
  const { writeContract: mintTokens, isPending: mintLoading } = useWriteContract();

  const mint = (to: string, amount: string) => {
    mintTokens({
      address: STAT_TOKEN_ADDRESS,
      abi: STAT_TOKEN_ABI,
      functionName: 'mint',
      args: [to as `0x${string}`, parseEther(amount)],
    });
  };

  return {
    balance: balance ? Number(balance) / 10**18 : 0,
    totalSupply: totalSupply ? Number(totalSupply) / 10**18 : 0,
    balanceLoading,
    mint,
    mintLoading,
  };
} 