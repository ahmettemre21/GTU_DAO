import { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  PlusIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Proposals = ({ user }) => {
  const [proposals, setProposals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'OTHER',
    requiredVoteLevel: 'ALL_MEMBERS',
  });

  useEffect(() => {
    // Demo öneriler yükle
    setTimeout(() => {
      setProposals([
        {
          id: 1,
          title: 'Blockchain Workshop Organizasyonu',
          description: 'Üniversitede blockchain teknolojileri üzerine 3 günlük kapsamlı workshop düzenlenmesi önerisi. Workshop içeriği: Temel blockchain bilgisi, Ethereum ve Smart Contract\'lar, DeFi protokolleri...',
          category: 'EVENT',
          proposedBy: 'Mehmet Kaya',
          proposerId: 'user-2',
          status: 'VOTING',
          requiredVoteLevel: 'ALL_MEMBERS',
          votesYes: 45,
          votesNo: 12,
          voteDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 gün sonra
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 gün önce
        },
        {
          id: 2,
          title: 'Kulüp Logo Tasarımı Değişikliği',
          description: 'Mevcut kulüp logosunun güncellenip modernize edilmesi ve brand identity çalışmasının yapılması.',
          category: 'OTHER',
          proposedBy: 'Ayşe Demir',
          proposerId: 'user-3',
          status: 'VOTING',
          requiredVoteLevel: 'CORE_TEAM',
          votesYes: 8,
          votesNo: 2,
          voteDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          id: 3,
          title: 'ETH Prague Hackathon Katılımı',
          description: 'Kulüp olarak ETH Prague hackathon\'una katılım ve seyahat giderlerinin karşılanması.',
          category: 'FINANCIAL',
          proposedBy: 'Ahmet Emre Yavuz',
          proposerId: 'demo-user-1',
          status: 'APPROVED',
          requiredVoteLevel: 'ALL_MEMBERS',
          votesYes: 67,
          votesNo: 15,
          voteDeadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: 4,
          title: 'Kulüp Tüzüğü Güncellemesi',
          description: 'DAO yönetişim sistemi ile uyumlu olarak kulüp tüzüğünün güncellenmesi ve revizyonu.',
          category: 'SYSTEM_RULE',
          proposedBy: 'Can Yılmaz',
          proposerId: 'user-4',
          status: 'PENDING',
          requiredVoteLevel: 'ALL_MEMBERS',
          votesYes: 0,
          votesNo: 0,
          voteDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 saat önce
        },
      ]);
    }, 1000);
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'PENDING': return { icon: ClockIcon, color: 'text-yellow-600 bg-yellow-100', text: 'Beklemede' };
      case 'VOTING': return { icon: DocumentTextIcon, color: 'text-blue-600 bg-blue-100', text: 'Oylamada' };
      case 'APPROVED': return { icon: CheckCircleIcon, color: 'text-green-600 bg-green-100', text: 'Onaylandı' };
      case 'REJECTED': return { icon: XCircleIcon, color: 'text-red-600 bg-red-100', text: 'Reddedildi' };
      default: return { icon: ClockIcon, color: 'text-gray-600 bg-gray-100', text: status };
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case 'EVENT': return 'Etkinlik';
      case 'SYSTEM_RULE': return 'Tüzük/Kural';
      case 'FINANCIAL': return 'Finansal';
      case 'OTHER': return 'Diğer';
      default: return category;
    }
  };

  const getVoteLevelText = (level) => {
    switch (level) {
      case 'ALL_MEMBERS': return 'Tüm Üyeler';
      case 'CORE_TEAM': return 'Core Team';
      case 'COUNCIL': return 'Yönetim Kurulu';
      default: return level;
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    if (filter === 'my') return proposal.proposerId === user?.id;
    return proposal.status === filter.toUpperCase();
  });

  const handleCreateProposal = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Öneri oluşturmak için giriş yapmalısınız');
      return;
    }

    if (!newProposal.title.trim() || !newProposal.description.trim()) {
      toast.error('Başlık ve açıklama alanları zorunludur');
      return;
    }

    // Yeni öneri oluştur
    const proposal = {
      id: proposals.length + 1,
      title: newProposal.title,
      description: newProposal.description,
      category: newProposal.category,
      proposedBy: user.name,
      proposerId: user.id,
      status: 'PENDING',
      requiredVoteLevel: newProposal.requiredVoteLevel,
      votesYes: 0,
      votesNo: 0,
      voteDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 gün sonra
      createdAt: new Date(),
    };

    setProposals(prev => [proposal, ...prev]);
    setNewProposal({ title: '', description: '', category: 'OTHER', requiredVoteLevel: 'ALL_MEMBERS' });
    setShowCreateModal(false);
    toast.success('Öneri başarıyla oluşturuldu!');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isDeadlineSoon = (deadline) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    return diff < 24 * 60 * 60 * 1000 && diff > 0; // 24 saatten az
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Öneriler</h1>
          <p className="text-gray-600 mt-1">Kulüp kararları için sunulan öneriler</p>
        </div>
        
        {user && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Yeni Öneri</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'Tümü' },
          { key: 'voting', label: 'Oylamada' },
          { key: 'pending', label: 'Beklemede' },
          { key: 'approved', label: 'Onaylanan' },
          { key: 'my', label: 'Önerilerim' },
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-dao-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => {
          const statusInfo = getStatusInfo(proposal.status);
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={proposal.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.text}
                    </span>
                    {isDeadlineSoon(proposal.voteDeadline) && proposal.status === 'VOTING' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Süre Bitiyor!
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{proposal.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{proposal.proposedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TagIcon className="w-4 h-4" />
                      <span>{getCategoryText(proposal.category)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(proposal.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedProposal(proposal)}
                  className="flex items-center space-x-1 text-dao-blue hover:text-blue-700 text-sm font-medium ml-4"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>Detay</span>
                </button>
              </div>

              {/* Voting Progress */}
              {proposal.status === 'VOTING' && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Oylama Durumu</span>
                    <span className="text-gray-500">
                      Son: {formatDate(proposal.voteDeadline)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-green-600">Evet ({proposal.votesYes})</span>
                        <span className="text-red-600">Hayır ({proposal.votesNo})</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${proposal.votesYes + proposal.votesNo > 0 
                              ? (proposal.votesYes / (proposal.votesYes + proposal.votesNo)) * 100 
                              : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Toplam: {proposal.votesYes + proposal.votesNo}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Oylama yetkisi: {getVoteLevelText(proposal.requiredVoteLevel)}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredProposals.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Öneri Bulunamadı</h3>
            <p className="text-gray-600">
              {filter === 'my' 
                ? 'Henüz hiç öneri sunmamışsınız.' 
                : 'Bu filtreye uygun öneri bulunmuyor.'}
            </p>
          </div>
        )}
      </div>

      {/* Create Proposal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Yeni Öneri Oluştur</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateProposal} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Öneri Başlığı *
                  </label>
                  <input
                    type="text"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Örn: Blockchain Workshop Organizasyonu"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detaylı Açıklama *
                  </label>
                  <textarea
                    value={newProposal.description}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field h-32 resize-none"
                    placeholder="Öneri hakkında detaylı bilgi verin..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={newProposal.category}
                      onChange={(e) => setNewProposal(prev => ({ ...prev, category: e.target.value }))}
                      className="input-field"
                    >
                      <option value="EVENT">Etkinlik</option>
                      <option value="FINANCIAL">Finansal</option>
                      <option value="SYSTEM_RULE">Tüzük/Kural</option>
                      <option value="OTHER">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oylama Yetkisi
                    </label>
                    <select
                      value={newProposal.requiredVoteLevel}
                      onChange={(e) => setNewProposal(prev => ({ ...prev, requiredVoteLevel: e.target.value }))}
                      className="input-field"
                    >
                      <option value="ALL_MEMBERS">Tüm Üyeler</option>
                      <option value="CORE_TEAM">Core Team</option>
                      <option value="COUNCIL">Yönetim Kurulu</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Öneri Oluştur
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProposal.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{selectedProposal.proposedBy}</span>
                    <span>•</span>
                    <span>{formatDate(selectedProposal.createdAt)}</span>
                    <span>•</span>
                    <span>{getCategoryText(selectedProposal.category)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedProposal.description}</p>
              </div>

              {selectedProposal.status === 'VOTING' && (
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Oylama Bilgileri</h3>
                  
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{selectedProposal.votesYes}</div>
                      <div className="text-sm text-gray-600">Evet Oyu</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{selectedProposal.votesNo}</div>
                      <div className="text-sm text-gray-600">Hayır Oyu</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Oylama Yetkisi:</strong> {getVoteLevelText(selectedProposal.requiredVoteLevel)}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <strong>Son Tarih:</strong> {formatDate(selectedProposal.voteDeadline)}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="btn-secondary flex-1"
                >
                  Kapat
                </button>
                {selectedProposal.status === 'VOTING' && (
                  <a href="/voting" className="btn-primary flex-1 text-center">
                    Oy Ver
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposals; 