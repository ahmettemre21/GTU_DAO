import React from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CheckBadgeIcon,
  UserGroupIcon,
  TrophyIcon,
  FireIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock data - Gerçek smart contract verilerini burada kullanacağız
const userStats = {
  statTokens: '1,247 STAT',
  votingPower: '8.4%',
  proposalsCreated: 3,
  votescast: 127,
  rank: '#42'
};

const recentActivity = [
  {
    type: 'vote',
    description: 'Kampüs Wi-Fi İyileştirme teklifine EVET oyu verdin',
    time: '2 saat önce',
    icon: CheckBadgeIcon,
    color: 'text-green-400'
  },
  {
    type: 'proposal',
    description: 'Yeni laboratuvar ekipmanı teklifi oluşturdun',
    time: '1 gün önce',
    icon: DocumentTextIcon,
    color: 'text-blue-400'
  },
  {
    type: 'reward',
    description: '150 STAT token kazandın',
    time: '3 gün önce',
    icon: TrophyIcon,
    color: 'text-yellow-400'
  }
];

const activeProposals = [
  {
    id: 1,
    title: 'Kampüs Wi-Fi İyileştirme Projesi',
    category: 'Teknoloji',
    forVotes: 847,
    againstVotes: 234,
    totalVotes: 1081,
    timeLeft: '5 gün',
    status: 'active'
  },
  {
    id: 2,
    title: 'Sürdürülebilir Enerji Geçişi',
    category: 'Çevre',
    forVotes: 623,
    againstVotes: 156,
    totalVotes: 779,
    timeLeft: '12 gün',
    status: 'active'
  },
  {
    id: 3,
    title: 'Öğrenci Kulüp Desteği Artırımı',
    category: 'Sosyal',
    forVotes: 934,
    againstVotes: 87,
    totalVotes: 1021,
    timeLeft: '8 gün',
    status: 'active'
  }
];

const quickActions = [
  {
    title: 'Yeni Teklif Oluştur',
    description: 'Fikrinizi toplulukla paylaşın',
    href: '/proposals/create',
    icon: DocumentTextIcon,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Oylamaya Katıl',
    description: 'Aktif teklifleri inceleyin',
    href: '/voting',
    icon: CheckBadgeIcon,
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'STAT Token Al',
    description: 'Oylama gücünüzü artırın',
    href: '/token',
    icon: TrophyIcon,
    color: 'from-green-500 to-cyan-500'
  }
];

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <Layout title="Dashboard - GTU DAO">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Dashboard'a Erişim
            </h1>
            <p className="text-gray-400 mb-8">
              Dashboard'ı görüntülemek için lütfen cüzdanınızı bağlayın
            </p>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard - GTU DAO">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Hoş geldin! GTU DAO'daki aktivitene genel bir bakış
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-8">
          <div className="stats-card text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {userStats.statTokens}
            </div>
            <div className="text-xs text-gray-400">Token Bakiyesi</div>
          </div>
          
          <div className="stats-card text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {userStats.votingPower}
            </div>
            <div className="text-xs text-gray-400">Oylama Gücü</div>
          </div>
          
          <div className="stats-card text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {userStats.proposalsCreated}
            </div>
            <div className="text-xs text-gray-400">Tekliflerim</div>
          </div>
          
          <div className="stats-card text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {userStats.votescast}
            </div>
            <div className="text-xs text-gray-400">Verdiğim Oy</div>
          </div>
          
          <div className="stats-card text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {userStats.rank}
            </div>
            <div className="text-xs text-gray-400">Sıralama</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-4">Hızlı İşlemler</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link key={index} href={action.href} className="card block hover:scale-105">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{action.title}</h3>
                        <p className="text-sm text-gray-400">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Son Aktiviteler</h2>
            <div className="space-y-4 mb-8">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="card">
                    <div className="flex items-start">
                      <Icon className={`w-6 h-6 ${activity.color} mr-4 mt-1`} />
                      <div className="flex-1">
                        <p className="text-white">{activity.description}</p>
                        <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Proposals */}
            <h2 className="text-xl font-bold text-white mb-4">Aktif Teklifler</h2>
            <div className="space-y-4">
              {activeProposals.map((proposal) => {
                const votePercentage = (proposal.forVotes / proposal.totalVotes) * 100;
                return (
                  <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
                    <div className="proposal-card">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-white mb-1">
                            {proposal.title}
                          </h3>
                          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                            {proposal.category}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {proposal.timeLeft}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400 flex items-center">
                            <ArrowUpIcon className="w-4 h-4 mr-1" />
                            {proposal.forVotes} EVET
                          </span>
                          <span className="text-red-400 flex items-center">
                            <ArrowDownIcon className="w-4 h-4 mr-1" />
                            {proposal.againstVotes} HAYIR
                          </span>
                        </div>
                        
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${votePercentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-xs text-gray-400 text-center">
                          Toplam {proposal.totalVotes} oy
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 