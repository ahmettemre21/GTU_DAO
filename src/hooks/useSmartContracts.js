import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseAbi, formatEther, parseEther } from 'viem'
import { getContractAddresses } from '../config/blockchain'
import toast from 'react-hot-toast'

// GTU DAO - Basitleştirilmiş Smart Contract Hook

// Voting Contract ABI
const votingContractAbi = parseAbi([
  'function createProposal(string memory title, string memory description, uint256 duration) external returns (uint256)',
  'function vote(uint256 proposalId, uint8 choice) external',
  'function getProposal(uint256 proposalId) external view returns (tuple(string title, string description, uint256 forVotes, uint256 againstVotes, uint256 endTime, bool executed))',
  'function executeProposal(uint256 proposalId) external',
  'function getUserVotingWeight(address user) external view returns (uint256)',
  'function hasUserVoted(uint256 proposalId, address user) external view returns (bool)',
  'event ProposalCreated(uint256 indexed proposalId, string title, address creator)',
  'event VoteCast(uint256 indexed proposalId, address indexed voter, uint8 choice, uint256 weight)',
  'event ProposalExecuted(uint256 indexed proposalId)'
])

// Token Contract ABI  
const tokenContractAbi = parseAbi([
  'function balanceOf(address account) external view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function totalSupply() external view returns (uint256)',
  'function mint(address to, uint256 amount) external',
  'function burn(uint256 amount) external',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
])

export const useSmartContracts = () => {
  const { address, isConnected, chainId } = useAccount()
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
  
  const [contracts, setContracts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chainId) {
      const addresses = getContractAddresses(chainId)
      setContracts(addresses)
      setLoading(false)
    }
  }, [chainId])

  // Get user's voting weight
  const { data: votingWeight } = useReadContract({
    address: contracts?.votingContract,
    abi: votingContractAbi,
    functionName: 'getUserVotingWeight',
    args: [address],
    enabled: !!contracts?.votingContract && !!address
  })

  // Get user's token balance
  const { data: tokenBalance } = useReadContract({
    address: contracts?.tokenContract,
    abi: tokenContractAbi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!contracts?.tokenContract && !!address
  })

  // Create Proposal - Basitleştirilmiş versiyon
  const createProposal = async (title, description, duration) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      if (!contracts?.votingContract) {
        toast.error('Smart contract adresi bulunamadı')
        return
      }

      // Basit proposal oluşturma
      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'createProposal',
        args: [title, description, duration]
      })

      toast.success('Öneri oluşturuluyor...')
    } catch (error) {
      console.error('Create proposal error:', error)
      toast.error('Öneri oluşturulamadı: ' + error.message)
    }
  }

  // Vote - Basitleştirilmiş versiyon
  const vote = async (proposalId, choice) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      if (!contracts?.votingContract) {
        toast.error('Smart contract adresi bulunamadı')
        return
      }

      // Basit oy verme
      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'vote',
        args: [proposalId, choice]
      })

      toast.success('Oy veriliyor...')
    } catch (error) {
      console.error('Vote error:', error)
      toast.error('Oy verilemedi: ' + error.message)
    }
  }

  // Execute proposal
  const executeProposal = async (proposalId) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      if (!contracts?.votingContract) {
        toast.error('Smart contract adresi bulunamadı')
        return
      }

      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'executeProposal',
        args: [proposalId]
      })

      toast.success('Öneri uygulanıyor...')
    } catch (error) {
      console.error('Execute proposal error:', error)
      toast.error('Öneri uygulanamadı: ' + error.message)
    }
  }

  // Mint tokens - Basitleştirilmiş versiyon
  const mintTokens = async (to, amount) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      if (!contracts?.tokenContract) {
        toast.error('Token contract adresi bulunamadı')
        return
      }

      const parsedAmount = parseEther(amount.toString())

      writeContract({
        address: contracts.tokenContract,
        abi: tokenContractAbi,
        functionName: 'mint',
        args: [to, parsedAmount]
      })

      toast.success('Token oluşturuluyor...')
    } catch (error) {
      console.error('Mint tokens error:', error)
      toast.error('Token oluşturulamadı: ' + error.message)
    }
  }

  return {
    // State
    contracts,
    loading,
    address,
    isConnected,
    chainId,
    
    // Contract data
    votingWeight: votingWeight ? formatEther(votingWeight) : '0',
    tokenBalance: tokenBalance ? formatEther(tokenBalance) : '0',
    
    // Transaction state
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
    
    // Contract functions
    createProposal,
    vote,
    executeProposal,
    mintTokens
  }
} 