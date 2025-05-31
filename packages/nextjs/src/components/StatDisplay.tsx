import { useState, useEffect } from 'react';
import { 
  StarIcon, 
  TrophyIcon, 
  FireIcon,
  ChartBarIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import statTokenService from '../lib/statToken';

interface User {
  id: string;
  [key: string]: any;
}

interface StatDisplayProps {
  user: User;
  showDetails?: boolean;
  className?: string;
}

interface StatData {
  balance: number;
  totalContributions: number;
  lastActivityTimestamp: number;
  proposalsCreated: number;
  votesParticipated: number;
  history?: Array<{
    action: 'mint' | 'burn';
    amount: number;
    reason: string;
  }>;
}

const StatDisplay = ({ user, showDetails = false, className = '' }: StatDisplayProps) => {
  const [statData, setStatData] = useState<StatData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadStatData();
    }
  }, [user?.id]);

  const loadStatData = async () => {
    setLoading(true);
    try {
      const stats = await statTokenService.getUserStats(user.id);
      const history = await statTokenService.getStatHistory(user.id);
      setStatData({ ...stats, history });
    } catch (error) {
      console.error('Error loading STAT data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  if (!statData) {
    return (
      <div className={`text-gray-500 ${className}`}>
        <span className="text-sm">STAT Yok</span>
      </div>
    );
  }

  const tier = statTokenService.getStatTier(statData.balance);
  const formattedAmount = statTokenService.formatStatAmount(statData.balance);
  const decayAmount = statTokenService.calculateDecay(
    statData.lastActivityTimestamp, 
    statData.balance
  );

  const StatBadge = () => (
    <div 
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${tier.color} ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StarIcon className="w-4 h-4" />
      <span>{formattedAmount} STAT</span>
      {showDetails && (
        <span className={`text-xs px-2 py-1 rounded-full ${tier.color}`}>
          {tier.name}
        </span>
      )}
    </div>
  );

  const DetailedView = () => (
    <div className="space-y-4">
      {/* STAT Balance Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${tier.color} rounded-xl flex items-center justify-center`}>
            <TrophyIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{statData.balance}</span>
              <span className="text-sm text-gray-500">STAT</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium px-2 py-1 rounded ${tier.color}`}>
                {tier.name} Tier
              </span>
              {decayAmount > 0 && (
                <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                  -{decayAmount} Decay Risk
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">Oy Gücü</div>
          <div className="text-lg font-semibold text-dao-blue">{statData.balance}x</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <ChartBarIcon className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Toplam Katkı</span>
          </div>
          <div className="text-xl font-bold text-blue-600">{statData.totalContributions}</div>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <FireIcon className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Aktivite</span>
          </div>
          <div className="text-sm text-green-600">
            {Math.floor((Date.now() - statData.lastActivityTimestamp) / (1000 * 60 * 60 * 24))} gün önce
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-3">
          <div className="text-sm font-medium text-purple-900 mb-1">Öneriler</div>
          <div className="text-xl font-bold text-purple-600">{statData.proposalsCreated}</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-3">
          <div className="text-sm font-medium text-orange-900 mb-1">Oylar</div>
          <div className="text-xl font-bold text-orange-600">{statData.votesParticipated}</div>
        </div>
      </div>

      {/* Progress to Next Tier */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Sonraki Seviye</span>
          <span className="text-xs text-gray-500">
            {getNextTierProgress(statData.balance)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-dao-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage(statData.balance)}%` }}
          ></div>
        </div>
      </div>

      {/* Recent STAT History */}
      {statData.history && statData.history.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Son STAT Hareketleri</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {statData.history.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    item.action === 'mint' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-600">{item.reason}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`font-medium ${
                    item.action === 'mint' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.action === 'mint' ? '+' : '-'}{item.amount}
                  </span>
                  <span className="text-gray-400">STAT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const getNextTierProgress = (balance: number): string => {
    if (balance >= 1000) return 'Maksimum Seviye';
    if (balance >= 600) return `${1000 - balance} STAT kaldı (Platinum)`;
    if (balance >= 300) return `${600 - balance} STAT kaldı (Gold)`;
    return `${300 - balance} STAT kaldı (Silver)`;
  };

  const getProgressPercentage = (balance: number): number => {
    if (balance >= 1000) return 100;
    if (balance >= 600) return ((balance - 600) / (1000 - 600)) * 100;
    if (balance >= 300) return ((balance - 300) / (600 - 300)) * 100;
    return (balance / 300) * 100;
  };

  // Tooltip Content
  const TooltipContent = () => (
    <div className="absolute z-10 w-64 p-3 bg-white border border-gray-200 rounded-lg shadow-lg top-full mt-2 left-0">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">STAT Token</span>
          <InformationCircleIcon className="w-4 h-4 text-gray-400" />
        </div>
        <div className="text-xs text-gray-600">
          STAT tokenları katılım ve katkılarınızı temsil eder. Daha fazla STAT = Daha güçlü oy hakkı.
        </div>
        <div className="border-t pt-2">
          <div className="text-xs text-gray-500">
            Son aktivite: {Math.floor((Date.now() - statData.lastActivityTimestamp) / (1000 * 60 * 60 * 24))} gün önce
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {showDetails ? <DetailedView /> : <StatBadge />}
      {showTooltip && !showDetails && <TooltipContent />}
    </div>
  );
};

export default StatDisplay; 