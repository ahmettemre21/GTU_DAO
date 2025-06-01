import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseAbi, formatEther, parseEther } from 'viem'
import { getContractAddresses, STAT_TOKEN_CONFIG } from '../config/blockchain'
import toast from 'react-hot-toast'

// GTU DAO - Smart Contract Hook with STAT Token Integration

// Enhanced Token Contract ABI for STAT Token
const tokenContractAbi = parseAbi([
  'function balanceOf(address account) external view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function totalSupply() external view returns (uint256)',
  'function name() external view returns (string)',
  'function symbol() external view returns (string)',
  'function decimals() external view returns (uint8)',
  'function mint(address to, uint256 amount) external',
  'function burn(uint256 amount) external',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
])

// Enhanced Voting Contract ABI
const votingContractAbi = parseAbi([
  'function createProposal(string memory title, string memory description, uint256 duration) external returns (uint256)',
  'function vote(uint256 proposalId, uint8 choice) external',
  'function getProposal(uint256 proposalId) external view returns (tuple(string title, string description, uint256 forVotes, uint256 againstVotes, uint256 endTime, bool executed))',
  'function getProposalCount() external view returns (uint256)',
  'function executeProposal(uint256 proposalId) external',
  'function getUserVotingWeight(address user) external view returns (uint256)',
  'function hasUserVoted(uint256 proposalId, address user) external view returns (bool)',
  'event ProposalCreated(uint256 indexed proposalId, string title, address creator)',
  'event VoteCast(uint256 indexed proposalId, address indexed voter, uint8 choice, uint256 weight)',
  'event ProposalExecuted(uint256 indexed proposalId)'
])

// Governance Contract ABI
const governanceContractAbi = parseAbi([
  'function getGovernanceStats() external view returns (tuple(uint256 totalProposals, uint256 activeProposals, uint256 totalVotes, uint256 totalParticipants))',
  'function getUserRole(address user) external view returns (string memory)',
  'function getTreasuryBalance() external view returns (uint256)',
  'event RoleAssigned(address indexed user, string role)'
])

interface ContractAddresses {
  votingContract: `0x${string}`;
  tokenContract: `0x${string}`;
  governanceContract: `0x${string}`;
}

export const useSmartContracts = () => {
  const { address, isConnected, chainId } = useAccount()
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
  
  const [contracts, setContracts] = useState<ContractAddresses | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chainId) {
      const addresses = getContractAddresses(chainId)
      setContracts(addresses)
      setLoading(false)
    }
  }, [chainId])

  // STAT Token Data
  const { data: tokenBalance } = useReadContract({
    address: contracts?.tokenContract,
    abi: tokenContractAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    enabled: !!contracts?.tokenContract && !!address
  } as any)

  const { data: totalSupply } = useReadContract({
    address: contracts?.tokenContract,
    abi: tokenContractAbi,
    functionName: 'totalSupply',
    enabled: !!contracts?.tokenContract
  } as any)

  const { data: tokenName } = useReadContract({
    address: contracts?.tokenContract,
    abi: tokenContractAbi,
    functionName: 'name',
    enabled: !!contracts?.tokenContract
  } as any)

  const { data: tokenSymbol } = useReadContract({
    address: contracts?.tokenContract,
    abi: tokenContractAbi,
    functionName: 'symbol',
    enabled: !!contracts?.tokenContract
  } as any)

  // Voting Data
  const { data: votingWeight } = useReadContract({
    address: contracts?.votingContract,
    abi: votingContractAbi,
    functionName: 'getUserVotingWeight',
    args: address ? [address] : undefined,
    enabled: !!contracts?.votingContract && !!address
  } as any)

  const { data: proposalCount } = useReadContract({
    address: contracts?.votingContract,
    abi: votingContractAbi,
    functionName: 'getProposalCount',
    enabled: !!contracts?.votingContract
  } as any)

  // Governance Data
  const { data: governanceStats } = useReadContract({
    address: contracts?.governanceContract,
    abi: governanceContractAbi,
    functionName: 'getGovernanceStats',
    enabled: !!contracts?.governanceContract
  } as any)

  const { data: userRole } = useReadContract({
    address: contracts?.governanceContract,
    abi: governanceContractAbi,
    functionName: 'getUserRole',
    args: address ? [address] : undefined,
    enabled: !!contracts?.governanceContract && !!address
  } as any)

  const { data: treasuryBalance } = useReadContract({
    address: contracts?.governanceContract,
    abi: governanceContractAbi,
    functionName: 'getTreasuryBalance',
    enabled: !!contracts?.governanceContract
  } as any)

  // Contract Functions
  const createProposal = async (title: string, description: string, duration: number) => {
    try {
      if (!isConnected) {
        toast.error('Please connect your wallet first')
        return
      }

      if (!contracts?.votingContract) {
        toast.error('Voting contract address not found')
        return
      }

      const durationInSeconds = duration * 24 * 60 * 60 // Convert days to seconds

      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'createProposal',
        args: [title, description, BigInt(durationInSeconds)]
      })

      toast.success('Creating proposal...')
    } catch (error: any) {
      console.error('Create proposal error:', error)
      toast.error('Failed to create proposal: ' + error.message)
    }
  }

  const vote = async (proposalId: number, choice: number) => {
    try {
      if (!isConnected) {
        toast.error('Please connect your wallet first')
        return
      }

      if (!contracts?.votingContract) {
        toast.error('Voting contract address not found')
        return
      }

      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'vote',
        args: [BigInt(proposalId), choice]
      })

      toast.success('Submitting vote...')
    } catch (error: any) {
      console.error('Vote error:', error)
      toast.error('Failed to vote: ' + error.message)
    }
  }

  const executeProposal = async (proposalId: number) => {
    try {
      if (!isConnected) {
        toast.error('Please connect your wallet first')
        return
      }

      if (!contracts?.votingContract) {
        toast.error('Voting contract address not found')
        return
      }

      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'executeProposal',
        args: [BigInt(proposalId)]
      })

      toast.success('Executing proposal...')
    } catch (error: any) {
      console.error('Execute proposal error:', error)
      toast.error('Failed to execute proposal: ' + error.message)
    }
  }

  const mintSTATTokens = async (to: string, amount: number) => {
    try {
      if (!isConnected) {
        toast.error('Please connect your wallet first')
        return
      }

      if (!contracts?.tokenContract) {
        toast.error('STAT Token contract address not found')
        return
      }

      const parsedAmount = parseEther(amount.toString())

      writeContract({
        address: contracts.tokenContract,
        abi: tokenContractAbi,
        functionName: 'mint',
        args: [to as `0x${string}`, parsedAmount]
      })

      toast.success(`Minting ${amount} STAT tokens...`)
    } catch (error: any) {
      console.error('Mint STAT tokens error:', error)
      toast.error('Failed to mint STAT tokens: ' + error.message)
    }
  }

  const transferSTATTokens = async (to: string, amount: number) => {
    try {
      if (!isConnected) {
        toast.error('Please connect your wallet first')
        return
      }

      if (!contracts?.tokenContract) {
        toast.error('STAT Token contract address not found')
        return
      }

      const parsedAmount = parseEther(amount.toString())

      writeContract({
        address: contracts.tokenContract,
        abi: tokenContractAbi,
        functionName: 'transfer',
        args: [to as `0x${string}`, parsedAmount]
      })

      toast.success(`Transferring ${amount} STAT tokens...`)
    } catch (error: any) {
      console.error('Transfer STAT tokens error:', error)
      toast.error('Failed to transfer STAT tokens: ' + error.message)
    }
  }

  return {
    // State
    contracts,
    loading,
    address,
    isConnected,
    chainId,
    
    // STAT Token Data
    tokenBalance: tokenBalance ? formatEther(tokenBalance as bigint) : '0',
    totalSupply: totalSupply ? formatEther(totalSupply as bigint) : '0',
    tokenName: (tokenName as string) || STAT_TOKEN_CONFIG.name,
    tokenSymbol: (tokenSymbol as string) || STAT_TOKEN_CONFIG.symbol,
    
    // Voting Data
    votingWeight: votingWeight ? formatEther(votingWeight as bigint) : '0',
    proposalCount: proposalCount ? Number(proposalCount) : 0,
    
    // Governance Data
    governanceStats,
    userRole: (userRole as string) || 'GENERAL_MEMBER',
    treasuryBalance: treasuryBalance ? formatEther(treasuryBalance as bigint) : '0',
    
    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    transactionHash: hash,
    error,
    
    // Contract Functions
    createProposal,
    vote,
    executeProposal,
    mintSTATTokens,
    transferSTATTokens,
    
    // Constants
    STAT_TOKEN_CONFIG
  }
} 