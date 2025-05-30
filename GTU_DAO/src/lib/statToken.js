// STAT Token ve Weighted Voting için service
// Bu dosya gerçek blockchain entegrasyonu için hazırlanmıştır

import { ethers } from 'ethers';

// Mock data for development
const MOCK_STAT_DATA = {
  'demo-user-1': {
    balance: 650,
    role: 'MEMBER',
    stats: {
      lastActivityTimestamp: Date.now() - 86400000, // 1 gün önce
      totalContributions: 750,
      proposalsCreated: 3,
      votesParticipated: 12,
      role: 'MEMBER'
    },
    history: [
      { timestamp: Date.now() - 86400000, action: 'mint', amount: 50, reason: 'Proposal Created' },
      { timestamp: Date.now() - 172800000, action: 'mint', amount: 10, reason: 'Vote Participation' },
      { timestamp: Date.now() - 259200000, action: 'mint', amount: 100, reason: 'Event Organized' },
    ]
  },
  'user-2': {
    balance: 800,
    role: 'CORE_TEAM',
    stats: {
      lastActivityTimestamp: Date.now() - 43200000, // 12 saat önce
      totalContributions: 900,
      proposalsCreated: 5,
      votesParticipated: 18,
      role: 'CORE_TEAM'
    }
  },
  'user-3': {
    balance: 1000,
    role: 'PRESIDENT',
    stats: {
      lastActivityTimestamp: Date.now() - 21600000, // 6 saat önce
      totalContributions: 1200,
      proposalsCreated: 8,
      votesParticipated: 25,
      role: 'PRESIDENT'
    }
  }
};

// Contract addresses (will be filled after deployment)
const CONTRACTS = {
  STAT_TOKEN: process.env.REACT_APP_STAT_TOKEN_ADDRESS || 'mock',
  VOTING: process.env.REACT_APP_VOTING_ADDRESS || 'mock'
};

class StatTokenService {
  constructor() {
    this.isInitialized = false;
    this.provider = null;
    this.signer = null;
    this.statContract = null;
    this.votingContract = null;
  }

  // Initialize contracts (for production)
  async init() {
    if (this.isInitialized) return;

    try {
      if (typeof window.ethereum !== 'undefined') {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        
        // Contract ABIs would be imported here in production
        // this.statContract = new ethers.Contract(CONTRACTS.STAT_TOKEN, StatTokenABI, this.signer);
        // this.votingContract = new ethers.Contract(CONTRACTS.VOTING, VotingABI, this.signer);
        
        this.isInitialized = true;
        console.log('STAT Token service initialized (production mode)');
      } else {
        console.log('STAT Token service running in mock mode');
      }
    } catch (error) {
      console.error('Failed to initialize STAT Token service:', error);
    }
  }

  // Get user's STAT balance
  async getStatBalance(userAddress) {
    try {
      if (CONTRACTS.STAT_TOKEN === 'mock') {
        // Mock implementation
        const mockData = MOCK_STAT_DATA[userAddress] || { balance: 100 };
        return mockData.balance;
      }

      // Real implementation
      await this.init();
      const balance = await this.statContract.balanceOf(userAddress);
      return parseInt(balance.toString());
    } catch (error) {
      console.error('Error getting STAT balance:', error);
      return 0;
    }
  }

  // Get user's complete stats
  async getUserStats(userAddress) {
    try {
      if (CONTRACTS.STAT_TOKEN === 'mock') {
        // Mock implementation
        const mockData = MOCK_STAT_DATA[userAddress];
        if (!mockData) {
          return {
            balance: 100,
            lastActivityTimestamp: Date.now(),
            totalContributions: 100,
            proposalsCreated: 0,
            votesParticipated: 0,
            role: 'MEMBER'
          };
        }
        return {
          balance: mockData.balance,
          ...mockData.stats
        };
      }

      // Real implementation
      await this.init();
      const balance = await this.statContract.balanceOf(userAddress);
      const stats = await this.statContract.getUserStats(userAddress);
      
      return {
        balance: parseInt(balance.toString()),
        lastActivityTimestamp: parseInt(stats.lastActivityTimestamp.toString()),
        totalContributions: parseInt(stats.totalContributions.toString()),
        proposalsCreated: parseInt(stats.proposalsCreated.toString()),
        votesParticipated: parseInt(stats.votesParticipated.toString()),
        role: stats.role
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }

  // Get user's STAT history
  async getStatHistory(userAddress) {
    try {
      if (CONTRACTS.STAT_TOKEN === 'mock') {
        // Mock implementation
        const mockData = MOCK_STAT_DATA[userAddress];
        return mockData?.history || [];
      }

      // Real implementation would filter events from the blockchain
      // const filter = this.statContract.filters.StatMinted(userAddress);
      // const events = await this.statContract.queryFilter(filter);
      // return events.map(event => ({ ... }));
      
      return [];
    } catch (error) {
      console.error('Error getting STAT history:', error);
      return [];
    }
  }

  // Calculate voting power percentage for a user in a specific proposal
  calculateVotingPowerPercentage(userStat, totalVotingPower) {
    if (totalVotingPower === 0) return 0;
    return Math.round((userStat / totalVotingPower) * 100 * 100) / 100; // 2 decimal places
  }

  // Get role-based STAT requirements
  getRoleStatRequirements() {
    return {
      MEMBER: 100,
      CORE_TEAM: 600,
      VICE_PRESIDENT: 800,
      PRESIDENT: 1000
    };
  }

  // Check if user can create proposal
  canCreateProposal(userStat) {
    return userStat >= 50;
  }

  // Get STAT reward amounts
  getRewardAmounts() {
    return {
      PROPOSAL_CREATION: 50,
      VOTE_PARTICIPATION: 10,
      SUCCESSFUL_PROPOSAL: 100,
      EVENT_ORGANIZATION: 100,
      MONTHLY_ACTIVITY: 25
    };
  }

  // Mock functions for STAT operations (for admin)
  async mockMintStat(userAddress, amount, reason) {
    if (CONTRACTS.STAT_TOKEN === 'mock') {
      const userData = MOCK_STAT_DATA[userAddress] || { 
        balance: 100, 
        stats: { totalContributions: 100 },
        history: [] 
      };
      
      userData.balance += amount;
      userData.stats.totalContributions += amount;
      userData.history = userData.history || [];
      userData.history.unshift({
        timestamp: Date.now(),
        action: 'mint',
        amount: amount,
        reason: reason
      });
      
      MOCK_STAT_DATA[userAddress] = userData;
      
      console.log(`Mock STAT mint: ${amount} STAT to ${userAddress} for "${reason}"`);
      return true;
    }

    // Real implementation
    try {
      await this.init();
      const tx = await this.statContract.mint(userAddress, amount, reason);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error minting STAT:', error);
      return false;
    }
  }

  // Calculate decay for inactive users
  calculateDecay(lastActivityTimestamp, currentBalance) {
    const now = Date.now();
    const daysSinceActivity = (now - lastActivityTimestamp) / (1000 * 60 * 60 * 24);
    
    if (daysSinceActivity >= 30) {
      const decayPeriods = Math.floor(daysSinceActivity / 30);
      const decayRate = 0.05; // 5% per 30-day period
      const totalDecay = Math.min(currentBalance * decayRate * decayPeriods, currentBalance * 0.5); // Max 50% decay
      return Math.floor(totalDecay);
    }
    
    return 0;
  }

  // Get leaderboard data
  async getLeaderboard(limit = 10) {
    try {
      if (CONTRACTS.STAT_TOKEN === 'mock') {
        // Mock leaderboard
        const leaderboard = Object.entries(MOCK_STAT_DATA)
          .map(([address, data]) => ({
            address,
            balance: data.balance,
            role: data.role,
            contributions: data.stats.totalContributions,
            proposals: data.stats.proposalsCreated,
            votes: data.stats.votesParticipated
          }))
          .sort((a, b) => b.balance - a.balance)
          .slice(0, limit);
        
        return leaderboard;
      }

      // Real implementation would query all balances and sort
      return [];
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  // Format STAT amount for display
  formatStatAmount(amount) {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  }

  // Get STAT tier based on balance
  getStatTier(balance) {
    if (balance >= 1000) return { name: 'Platinum', color: 'text-purple-600 bg-purple-100' };
    if (balance >= 600) return { name: 'Gold', color: 'text-yellow-600 bg-yellow-100' };
    if (balance >= 300) return { name: 'Silver', color: 'text-gray-600 bg-gray-100' };
    return { name: 'Bronze', color: 'text-amber-600 bg-amber-100' };
  }
}

// Create singleton instance
const statTokenService = new StatTokenService();

export default statTokenService; 