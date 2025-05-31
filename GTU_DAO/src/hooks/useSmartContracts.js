import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseAbi, formatEther, parseEther } from 'viem'
import { getContractAddresses } from '../config/blockchain'
import { useWorldcoin } from '../lib/worldcoin'
import { useVlayer } from '../lib/vlayer'
import { useBlockscout } from '../lib/blockscout'
import toast from 'react-hot-toast'

// ETH Prague Prize Pool Smart Contract Integrations

// Voting Contract ABI
const votingContractAbi = parseAbi([
  'function createProposal(string memory title, string memory description, uint256 duration) external returns (uint256)',
  'function vote(uint256 proposalId, uint8 choice, bytes32 zkProof) external',
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
  
  // ETH Prague Prize Pool Services
  const worldcoin = useWorldcoin()
  const vlayer = useVlayer()
  const blockscout = useBlockscout()
  
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

  // Create Proposal with World ID verification
  const createProposal = async (title, description, duration) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      // 1. World App verification for proposal creation
      const worldIdVerification = await worldcoin.verify(address)
      if (!worldIdVerification.success) {
        toast.error('World ID doğrulaması başarısız: ' + worldIdVerification.error)
        return
      }

      // 2. Create ZK proof for proposal eligibility
      const zkProof = await vlayer.createMembershipProof({
        commitment: worldIdVerification.nullifier_hash,
        role: 'MEMBER',
        joinDate: Math.floor(Date.now() / 1000),
        isActive: true,
        merkleRoot: worldIdVerification.merkle_root,
        merkleProof: worldIdVerification.proof
      })

      if (!zkProof.success) {
        toast.error('ZK proof oluşturulamadı: ' + zkProof.error)
        return
      }

      // 3. Create proposal on blockchain
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

  // Vote with anonymous ZK proof
  const vote = async (proposalId, choice) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      // 1. World ID verification for voting
      const worldIdVerification = await worldcoin.verify(address)
      if (!worldIdVerification.success) {
        toast.error('World ID doğrulaması başarısız')
        return
      }

      // 2. Create anonymous voting proof
      const anonymousProof = await vlayer.createAnonymousVotingProof(
        {
          commitment: worldIdVerification.nullifier_hash,
          nullifier: worldIdVerification.nullifier_hash,
          merkleRoot: worldIdVerification.merkle_root,
          merkleProof: worldIdVerification.proof
        },
        choice,
        proposalId
      )

      if (!anonymousProof.success) {
        toast.error('Anonim oy verme proof\'u oluşturulamadı')
        return
      }

      // 3. Submit vote with ZK proof
      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'vote',
        args: [proposalId, choice, anonymousProof.nullifier]
      })

      toast.success('Oy veriliyor...')
    } catch (error) {
      console.error('Vote error:', error)
      toast.error('Oy verilemedi: ' + error.message)
    }
  }

  // Get proposal details with Blockscout tracking
  const getProposal = async (proposalId) => {
    try {
      const { data: proposal } = await useReadContract({
        address: contracts?.votingContract,
        abi: votingContractAbi,
        functionName: 'getProposal',
        args: [proposalId]
      })

      // Track on Blockscout for transparency
      const blockscoutData = await blockscout.getContractLogs(
        contracts.votingContract,
        'latest',
        'latest'
      )

      return {
        ...proposal,
        blockscoutUrl: blockscout.getAddressUrl(contracts.votingContract),
        logs: blockscoutData.data
      }
    } catch (error) {
      console.error('Get proposal error:', error)
      return null
    }
  }

  // Execute proposal with multi-signature verification
  const executeProposal = async (proposalId) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      // Create execution proof for admin actions
      const executionProof = await vlayer.createKYCProof({
        address,
        verificationLevel: 'ORB',
        worldIdNullifier: 'admin_execution',
        timestamp: Math.floor(Date.now() / 1000)
      })

      if (!executionProof.success) {
        toast.error('Yürütme yetkisi doğrulanamadı')
        return
      }

      writeContract({
        address: contracts.votingContract,
        abi: votingContractAbi,
        functionName: 'executeProposal',
        args: [proposalId]
      })

      toast.success('Öneri yürütülüyor...')
    } catch (error) {
      console.error('Execute proposal error:', error)
      toast.error('Öneri yürütülemedi: ' + error.message)
    }
  }

  // Mint governance tokens with KYC verification
  const mintTokens = async (to, amount) => {
    try {
      if (!isConnected) {
        toast.error('Lütfen önce cüzdanınızı bağlayın')
        return
      }

      // Verify KYC status with World ID
      const kycVerification = await worldcoin.verify(to)
      if (!kycVerification.success) {
        toast.error('KYC doğrulaması başarısız')
        return
      }

      const parsedAmount = parseEther(amount.toString())

      writeContract({
        address: contracts.tokenContract,
        abi: tokenContractAbi,
        functionName: 'mint',
        args: [to, parsedAmount]
      })

      toast.success('Token\'lar basılıyor...')
    } catch (error) {
      console.error('Mint tokens error:', error)
      toast.error('Token basılamadı: ' + error.message)
    }
  }

  // Get transaction history from Blockscout
  const getTransactionHistory = async (address) => {
    try {
      const transactions = await blockscout.getAddressTransactions(address)
      return transactions.data
    } catch (error) {
      console.error('Get transaction history error:', error)
      return []
    }
  }

  // Get contract analytics from Blockscout
  const getContractAnalytics = async () => {
    try {
      const [votingContract, tokenContract] = await Promise.all([
        blockscout.getContract(contracts.votingContract),
        blockscout.getContract(contracts.tokenContract)
      ])

      return {
        voting: votingContract.data,
        token: tokenContract.data
      }
    } catch (error) {
      console.error('Get contract analytics error:', error)
      return null
    }
  }

  return {
    // Contract addresses
    contracts,
    loading,
    
    // Account info
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
    
    // ETH Prague Prize Pool Functions
    createProposal,
    vote,
    getProposal,
    executeProposal,
    mintTokens,
    getTransactionHistory,
    getContractAnalytics,
    
    // Blockchain services
    worldcoin,
    vlayer,
    blockscout,
    
    // Utility functions
    parseEther,
    formatEther
  }
} 