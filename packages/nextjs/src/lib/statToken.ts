// STAT Token Service - GTU DAO Reputation System

interface StatTier {
  name: string;
  color: string;
  minBalance: number;
}

interface UserStats {
  balance: number;
  totalContributions: number;
  lastActivityTimestamp: number;
  proposalsCreated: number;
  votesParticipated: number;
}

interface StatHistory {
  action: 'mint' | 'burn';
  amount: number;
  reason: string;
  timestamp: number;
}

class StatTokenService {
  private tiers: StatTier[] = [
    { name: 'Bronze', color: 'bg-orange-100 text-orange-800', minBalance: 0 },
    { name: 'Silver', color: 'bg-gray-100 text-gray-800', minBalance: 300 },
    { name: 'Gold', color: 'bg-yellow-100 text-yellow-800', minBalance: 600 },
    { name: 'Platinum', color: 'bg-purple-100 text-purple-800', minBalance: 1000 }
  ];

  getStatTier(balance: number): StatTier {
    for (let i = this.tiers.length - 1; i >= 0; i--) {
      if (balance >= this.tiers[i].minBalance) {
        return this.tiers[i];
      }
    }
    return this.tiers[0];
  }

  formatStatAmount(amount: number): string {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}k`;
    }
    return amount.toString();
  }

  calculateDecay(lastActivityTimestamp: number, currentBalance: number): number {
    const daysSinceActivity = Math.floor((Date.now() - lastActivityTimestamp) / (1000 * 60 * 60 * 24));
    
    if (daysSinceActivity > 30) {
      return Math.floor(currentBalance * 0.1); // 10% decay after 30 days
    }
    
    return 0;
  }

  async getUserStats(userId: string): Promise<UserStats> {
    // Mock implementation - gerçek uygulamada API çağrısı yapılacak
    return {
      balance: Math.floor(Math.random() * 1500),
      totalContributions: Math.floor(Math.random() * 50),
      lastActivityTimestamp: Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      proposalsCreated: Math.floor(Math.random() * 10),
      votesParticipated: Math.floor(Math.random() * 25)
    };
  }

  async getStatHistory(userId: string): Promise<StatHistory[]> {
    // Mock implementation - gerçek uygulamada API çağrısı yapılacak
    const actions: Array<'mint' | 'burn'> = ['mint', 'burn'];
    const reasons = [
      'Proposal oluşturma',
      'Oy verme',
      'Toplantıya katılım',
      'Kod katkısı',
      'İnaktivite cezası'
    ];

    return Array.from({ length: 5 }, () => ({
      action: actions[Math.floor(Math.random() * actions.length)],
      amount: Math.floor(Math.random() * 100) + 10,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      timestamp: Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
    }));
  }

  async mintStat(userId: string, amount: number, reason: string): Promise<boolean> {
    // Mock implementation - gerçek uygulamada smart contract çağrısı yapılacak
    console.log(`Minting ${amount} STAT for user ${userId}: ${reason}`);
    return true;
  }

  async burnStat(userId: string, amount: number, reason: string): Promise<boolean> {
    // Mock implementation - gerçek uygulamada smart contract çağrısı yapılacak
    console.log(`Burning ${amount} STAT for user ${userId}: ${reason}`);
    return true;
  }
}

const statTokenService = new StatTokenService();
export default statTokenService; 