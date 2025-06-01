import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/layout/Layout';
import { 
  CheckBadgeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const activeVotes = [
  {
    id: 1,
    title: 'Kampüs Wi-Fi İyileştirme Projesi',
    description: 'Tüm kampüste Wi-Fi altyapısının iyileştirilmesi ve daha hızlı internet erişimi sağlanması.',
    forVotes: 847,
    againstVotes: 234,
    totalVotes: 1081,
    timeLeft: '5 gün',
    userVoted: false
  },
  {
    id: 2,
    title: 'Sürdürülebilir Enerji Geçişi',
    description: 'Kampüste güneş panelleri kurulumu ve enerji verimliliği projesi.',
    forVotes: 623,
    againstVotes: 156,
    totalVotes: 779,
    timeLeft: '12 gün',
    userVoted: true,
    userVote: 'for'
  }
];

export default function Voting() {
  const { isConnected } = useAccount();
  const [votes, setVotes] = useState(activeVotes);

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setVotes(prev => prev.map(vote => 
      vote.id === proposalId 
        ? { ...vote, userVoted: true, userVote: voteType }
        : vote
    ));
  };

  if (!isConnected) {
    return (
      <Layout title="Oylama - GTU DAO">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <CheckBadgeIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Oylama Sistemi
            </h1>
            <p className="text-gray-400 mb-8">
              Oy kullanmak için lütfen cüzdanınızı bağlayın
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Oylama - GTU DAO">
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Aktif Oylamalar
          </h1>
          <p className="text-lg text-gray-400">
            Topluluk tekliflerinde oyunuzu kullanın
          </p>
        </div>

        <div className="space-y-6">
          {votes.map((proposal) => {
            const votePercentage = (proposal.forVotes / proposal.totalVotes) * 100;
            
            return (
              <div key={proposal.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {proposal.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {proposal.description}
                    </p>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {proposal.timeLeft}
                  </div>
                </div>

                {/* Voting Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400 flex items-center">
                      <ArrowUpIcon className="w-4 h-4 mr-1" />
                      {proposal.forVotes} EVET ({votePercentage.toFixed(1)}%)
                    </span>
                    <span className="text-red-400 flex items-center">
                      <ArrowDownIcon className="w-4 h-4 mr-1" />
                      {proposal.againstVotes} HAYIR ({(100 - votePercentage).toFixed(1)}%)
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

                {/* Voting Buttons */}
                {proposal.userVoted ? (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <CheckBadgeIcon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-semibold">
                      Oyunuz kaydedildi: {proposal.userVote === 'for' ? 'EVET' : 'HAYIR'}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleVote(proposal.id, 'for')}
                      className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-400 text-green-400 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      <ArrowUpIcon className="w-5 h-5 mr-2 inline" />
                      EVET
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, 'against')}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400 text-red-400 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                      <ArrowDownIcon className="w-5 h-5 mr-2 inline" />
                      HAYIR
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
} 