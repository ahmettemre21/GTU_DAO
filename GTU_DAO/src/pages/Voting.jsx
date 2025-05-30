import { useState, useEffect } from 'react';
import { HandRaisedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Voting = ({ user }) => {
  const [activeVotes, setActiveVotes] = useState([]);

  useEffect(() => {
    // Demo oylama verisi yükle
    setTimeout(() => {
      setActiveVotes([
        {
          id: 1,
          title: 'Blockchain Workshop Organizasyonu',
          description: 'Workshop düzenlenmesi hakkında karar verilmesi.',
          votesYes: 45,
          votesNo: 12,
          voteDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          hasVoted: false,
        },
        {
          id: 2,
          title: 'Kulüp Logo Tasarımı',
          description: 'Logo değişikliği önerisi.',
          votesYes: 8,
          votesNo: 2,
          voteDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          hasVoted: true,
          myVote: 'YES',
        },
      ]);
    }, 1000);
  }, []);

  const handleVote = (proposalId, vote) => {
    setActiveVotes(prev => prev.map(proposal => {
      if (proposal.id === proposalId) {
        return {
          ...proposal,
          hasVoted: true,
          myVote: vote,
          votesYes: vote === 'YES' ? proposal.votesYes + 1 : proposal.votesYes,
          votesNo: vote === 'NO' ? proposal.votesNo + 1 : proposal.votesNo,
        };
      }
      return proposal;
    }));
    
    toast.success(`${vote === 'YES' ? 'EVET' : 'HAYIR'} oyunuz kaydedildi!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Aktif Oylamalar</h1>
        <p className="text-gray-600 mt-1">Oylamasında bulunabileceğiniz öneriler</p>
      </div>

      <div className="space-y-4">
        {activeVotes.map((vote) => (
          <div key={vote.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{vote.title}</h3>
                <p className="text-gray-600 mb-4">{vote.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">Evet: {vote.votesYes}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-red-600 font-medium">Hayır: {vote.votesNo}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Son: {vote.voteDeadline.toLocaleDateString('tr-TR')}
                  </div>
                </div>

                {vote.hasVoted ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="font-medium">
                      {vote.myVote === 'YES' ? 'EVET' : 'HAYIR'} oyu verdiniz
                    </span>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleVote(vote.id, 'YES')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      EVET
                    </button>
                    <button
                      onClick={() => handleVote(vote.id, 'NO')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      HAYIR
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {activeVotes.length === 0 && (
          <div className="text-center py-12">
            <HandRaisedIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aktif Oylama Yok</h3>
            <p className="text-gray-600">Şu anda oylamasında bulunabileceğiniz öneri bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voting; 