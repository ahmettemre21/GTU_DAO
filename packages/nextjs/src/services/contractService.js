/**
 * GTU DAO Contract Service
 * Connects to deployed smart contracts on Rootstock Testnet
 * ETH Prague 2025 Integration - $40k Prize Pool
 */

import { ethers } from 'ethers';

// Deployed Contract Addresses on Rootstock Testnet
const CONTRACT_ADDRESSES = {
  STAT_TOKEN: '0xc4B9fa8ac76de5c12Eee13Ee88DCd2423C5e1eC0',
  BLOCKSCOUT_INTEGRATION: '0xE07B774D488B72cA1112a5931dB2e1E961ce431d',
  WORLDAPP_INTEGRATION: '0xF2BDd0241a2eC462B849C4397349A87878E4EEB2',
  VLAYER_INTEGRATION: '0xC7304a7780acaD3044e0ED6b780ab090376684B5',
  VOTING_SYSTEM: '0x59cfbE10adcDcd418F386BE1B7d85C425579bE54'
};

// Rootstock Testnet Configuration
const ROOTSTOCK_TESTNET = {
  chainId: '0x1f', // 31 in hex
  name: 'Rootstock Testnet',
  rpcUrl: 'https://rpc.testnet.rootstock.io/QAGf1YDAZvCoofOOmFtCf1UPfcReuS-T',
  explorerUrl: 'https://rootstock-testnet.blockscout.com',
  currency: {
    name: 'Test RBTC',
    symbol: 'RBTC',
    decimals: 18
  }
};

// Contract ABIs (simplified for frontend usage)
const STAT_TOKEN_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function symbol() view returns (string)',
  'function name() view returns (string)',
  'function getUserStats(address user) view returns (tuple(uint256 lastActivityTimestamp, uint256 totalContributions, uint256 proposalsCreated, uint256 votesParticipated, string role))',
  'function mint(address to, uint256 amount, string memory reason)',
  'function initializeUser(address user, string memory role)',
  'event StatMinted(address indexed user, uint256 amount, string reason)'
];

const VOTING_SYSTEM_ABI = [
  'function createProposal(string memory _title, string memory _description, string memory _category, uint8 _proposalType, uint256 _duration)',
  'function vote(uint256 proposalId, bool support, string memory comment)',
  'function getProposal(uint256 proposalId) view returns (uint256 id, string memory title, string memory description, string memory category, uint8 proposalType, uint8 status, address proposer, uint256 yesVotes, uint256 noVotes, uint256 totalVotingPower, uint256 deadline, uint256 createdAt, bool executed)',
  'function getTotalProposals() view returns (uint256)',
  'function getVotingPower(address user) view returns (uint256)',
  'function getUserVote(uint256 proposalId, address user) view returns (bool hasVoted, bool voteChoice)',
  'event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title, uint8 proposalType, uint256 deadline)',
  'event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight, string comment)'
];

class ContractService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contracts = {};
    this.isConnected = false;
  }

  // Initialize Web3 connection
  async initializeProvider() {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        return true;
      } else {
        // Fallback to read-only provider
        this.provider = new ethers.JsonRpcProvider(ROOTSTOCK_TESTNET.rpcUrl);
        console.warn('No wallet detected, using read-only mode');
        return false;
      }
    } catch (error) {
      console.error('Provider initialization error:', error);
      return false;
    }
  }

  // Connect wallet and switch to Rootstock Testnet
  async connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask or another Web3 wallet');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Switch to Rootstock Testnet
      await this.switchToRootstock();
      
      this.signer = await this.provider.getSigner();
      this.isConnected = true;
      
      // Initialize contracts
      this.initializeContracts();
      
      return {
        success: true,
        address: await this.signer.getAddress(),
        network: 'Rootstock Testnet'
      };
    } catch (error) {
      console.error('Wallet connection error:', error);
      return { success: false, error: error.message };
    }
  }

  // Switch to Rootstock Testnet
  async switchToRootstock() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ROOTSTOCK_TESTNET.chainId }],
      });
    } catch (switchError) {
      // Chain not added to wallet, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: ROOTSTOCK_TESTNET.chainId,
            chainName: ROOTSTOCK_TESTNET.name,
            rpcUrls: [ROOTSTOCK_TESTNET.rpcUrl],
            blockExplorerUrls: [ROOTSTOCK_TESTNET.explorerUrl],
            nativeCurrency: ROOTSTOCK_TESTNET.currency
          }],
        });
      } else {
        throw switchError;
      }
    }
  }

  // Initialize contract instances
  initializeContracts() {
    const signerOrProvider = this.signer || this.provider;
    
    this.contracts = {
      statToken: new ethers.Contract(CONTRACT_ADDRESSES.STAT_TOKEN, STAT_TOKEN_ABI, signerOrProvider),
      voting: new ethers.Contract(CONTRACT_ADDRESSES.VOTING_SYSTEM, VOTING_SYSTEM_ABI, signerOrProvider)
    };
  }

  // Get user STAT balance and stats
  async getUserStats(userAddress) {
    try {
      if (!this.contracts.statToken) {
        await this.initializeProvider();
        this.initializeContracts();
      }

      const [balance, userStats] = await Promise.all([
        this.contracts.statToken.balanceOf(userAddress),
        this.contracts.statToken.getUserStats(userAddress)
      ]);

      return {
        balance: ethers.formatEther(balance),
        stats: {
          lastActivityTimestamp: Number(userStats.lastActivityTimestamp),
          totalContributions: Number(userStats.totalContributions),
          proposalsCreated: Number(userStats.proposalsCreated),
          votesParticipated: Number(userStats.votesParticipated),
          role: userStats.role
        }
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return { balance: '0', stats: null };
    }
  }

  // Create a new proposal
  async createProposal(title, description, category, proposalType = 0, duration = 7 * 24 * 60 * 60) {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await this.contracts.voting.createProposal(
        title,
        description,
        category,
        proposalType,
        duration
      );

      const receipt = await tx.wait();
      const proposalId = await this.contracts.voting.getTotalProposals();
      
      return {
        success: true,
        proposalId: Number(proposalId),
        txHash: receipt.hash
      };
    } catch (error) {
      console.error('Error creating proposal:', error);
      return { success: false, error: error.message };
    }
  }

  // Vote on a proposal
  async voteOnProposal(proposalId, support, comment = '') {
    try {
      if (!this.signer) {
        throw new Error('Wallet not connected');
      }

      const tx = await this.contracts.voting.vote(proposalId, support, comment);
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: receipt.hash
      };
    } catch (error) {
      console.error('Error voting on proposal:', error);
      return { success: false, error: error.message };
    }
  }

  // Get proposal details
  async getProposal(proposalId) {
    try {
      if (!this.contracts.voting) {
        await this.initializeProvider();
        this.initializeContracts();
      }

      const proposal = await this.contracts.voting.getProposal(proposalId);
      
      return {
        id: Number(proposal.id),
        title: proposal.title,
        description: proposal.description,
        category: proposal.category,
        proposalType: Number(proposal.proposalType),
        status: Number(proposal.status),
        proposer: proposal.proposer,
        yesVotes: ethers.formatEther(proposal.yesVotes),
        noVotes: ethers.formatEther(proposal.noVotes),
        totalVotingPower: ethers.formatEther(proposal.totalVotingPower),
        deadline: Number(proposal.deadline),
        createdAt: Number(proposal.createdAt),
        executed: proposal.executed
      };
    } catch (error) {
      console.error('Error fetching proposal:', error);
      return null;
    }
  }

  // Get all proposals
  async getAllProposals() {
    try {
      const totalProposals = await this.contracts.voting.getTotalProposals();
      const proposals = [];
      
      for (let i = 1; i <= Number(totalProposals); i++) {
        const proposal = await this.getProposal(i);
        if (proposal) proposals.push(proposal);
      }
      
      return proposals;
    } catch (error) {
      console.error('Error fetching proposals:', error);
      return [];
    }
  }

  // Get voting power for an address
  async getVotingPower(userAddress) {
    try {
      const power = await this.contracts.voting.getVotingPower(userAddress);
      return ethers.formatEther(power);
    } catch (error) {
      console.error('Error fetching voting power:', error);
      return '0';
    }
  }

  // Get contract addresses for frontend display
  getContractAddresses() {
    return CONTRACT_ADDRESSES;
  }

  // Get network info
  getNetworkInfo() {
    return ROOTSTOCK_TESTNET;
  }

  // Check if user has voted on a proposal
  async hasUserVoted(proposalId, userAddress) {
    try {
      const [hasVoted, voteChoice] = await this.contracts.voting.getUserVote(proposalId, userAddress);
      return { hasVoted, voteChoice };
    } catch (error) {
      console.error('Error checking vote status:', error);
      return { hasVoted: false, voteChoice: false };
    }
  }
}

// Create singleton instance
const contractService = new ContractService();
export default contractService; 