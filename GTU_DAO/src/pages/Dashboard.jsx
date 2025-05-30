import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  HandRaisedIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import StatDisplay from '../components/StatDisplay';
import statTokenService from '../lib/statToken';

const Dashboard = ({ user }) => {
  const [userStats, setUserStats] = useState({
    myProposals: 0,
    myVotes: 0,
    pendingActions: 0,
    membershipDays: 0,
  });

  const [statData, setStatData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    // Demo veri yükle
    setTimeout(() => {
      setUserStats({
        myProposals: 3,
        myVotes: 12,
        pendingActions: 2,
        membershipDays: 180,
      });

      setRecentActivity([
        { 
          id: 1, 
          type: 'vote', 
          title: 'Blockchain Workshop Organizasyonu', 
          action: 'EVET oyunu verdin (650 STAT ağırlığında)',
          time: '2 saat önce',
          status: 'completed',
          statReward: 10
        },
        { 
          id: 2, 
          type: 'proposal', 
          title: 'ETH Prague Katılım Talebi', 
          action: 'Öneri sundun',
          time: '1 gün önce',
          status: 'active',
          statReward: 50
        },
        { 
          id: 3, 
          type: 'stat_earned', 
          title: 'Etkinlik Organizasyonu', 
          action: '100 STAT kazandın',
          time: '3 gün önce',
          status: 'completed',
          statReward: 100
        },
      ]);

      setPendingItems([
        {
          id: 1,
          type: 'vote',
          title: 'Kulüp Logo Tasarımı Seçimi',
          description: 'Tasarım ekibinin hazırladığı 3 farklı logo arasından seçim yapılması gerekiyor.',
          deadline: '2 gün kaldı',
          urgent: true,
          requiredStat: 100,
          yourVotingPower: 650
        },
        {
          id: 2,
          type: 'proposal_review',
          title: 'Finans Raporu İncelemesi',
          description: 'Geçen ay yapılan harcamaların onaylanması için Core Team oylaması.',
          deadline: '5 gün kaldı',
          urgent: false,
          requiredStat: 600,
          yourVotingPower: 650
        },
      ]);
    }, 1000);

    // STAT verilerini yükle
    if (user?.id) {
      try {
        const stats = await statTokenService.getUserStats(user.id);
        setStatData(stats);

        // Leaderboard yükle
        const leaders = await statTokenService.getLeaderboard(5);
        setLeaderboard(leaders);
      } catch (error) {
        console.error('Error loading STAT data:', error);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'active': return <ClockIcon className="w-4 h-4 text-blue-600" />;
      case 'pending': return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'proposal': return DocumentTextIcon;
      case 'vote': return HandRaisedIcon;
      case 'application': return UserGroupIcon;
      case 'stat_earned': return StarIcon;
      default: return DocumentTextIcon;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'proposal': return 'text-blue-600 bg-blue-100';
      case 'vote': return 'text-green-600 bg-green-100';
      case 'application': return 'text-purple-600 bg-purple-100';
      case 'stat_earned': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <ExclamationTriangleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Giriş Gerekli</h2>
        <p className="text-gray-600 mb-6">Dashboard'a erişmek için World ID ile giriş yapmanız gerekiyor.</p>
        <Link to="/" className="btn-primary">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section with STAT Display */}
      <div className="card bg-gradient-to-r from-dao-blue to-dao-purple text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Hoş geldin, {user.name}! 👋
            </h1>
            <p className="opacity-90 mb-3">
              {user.role === 'PRESIDENT' ? 'Başkan' : 
               user.role === 'CORE_TEAM' ? 'Core Team Üyesi' : 'Kulüp Üyesi'} • 
              {userStats.membershipDays} gündür üyesin
            </p>
            {/* STAT Display in header */}
            {statData && (
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <StarIcon className="w-5 h-5" />
                    <span className="font-bold">{statData.balance} STAT</span>
                  </div>
                  <div className="text-xs opacity-80">Oy Gücün: {statData.balance}x</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <TrophyIcon className="w-5 h-5" />
                    <span className="font-bold">{statTokenService.getStatTier(statData.balance).name}</span>
                  </div>
                  <div className="text-xs opacity-80">Tier Seviye</div>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userStats.pendingActions}</div>
            <div className="text-sm opacity-90">Bekleyen İşlem</div>
          </div>
        </div>
      </div>

      {/* STAT Dashboard Card */}
      {statData && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <StarIcon className="w-6 h-6 text-yellow-500" />
              <span>STAT Token Dashboard</span>
            </h3>
            <Link to="/stat-leaderboard" className="text-dao-blue hover:text-blue-700 text-sm font-medium">
              Liderlik Tablosu →
            </Link>
          </div>
          
          <StatDisplay user={user} showDetails={true} />
        </div>
      )}

      {/* Quick Stats with STAT Integration */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{userStats.myProposals}</h3>
          <p className="text-gray-600">Önerilerim</p>
          <div className="text-xs text-blue-600 mt-1">+{userStats.myProposals * 50} STAT kazandın</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <HandRaisedIcon className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{userStats.myVotes}</h3>
          <p className="text-gray-600">Verdiğim Oy</p>
          <div className="text-xs text-green-600 mt-1">+{userStats.myVotes * 10} STAT kazandın</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <StarIcon className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {statData ? statData.balance : '---'}
          </h3>
          <p className="text-gray-600">STAT Bakiye</p>
          <div className="text-xs text-yellow-600 mt-1">Oy gücün: {statData?.balance || 0}x</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrophyIcon className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {statData ? statTokenService.getStatTier(statData.balance).name : '---'}
          </h3>
          <p className="text-gray-600">STAT Tier</p>
          <div className="text-xs text-purple-600 mt-1">Prestij seviyesi</div>
        </div>
      </div>

      {/* Quick Actions & Pending Items */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Hızlı İşlemler</h3>
          
          <div className="space-y-4">
            <Link 
              to="/proposals?action=new" 
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-dao-blue hover:bg-blue-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center">
                <PlusIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Yeni Öneri Oluştur</h4>
                <p className="text-sm text-gray-600">Kulüp için yeni bir öneri sun</p>
                <div className="text-xs text-blue-600 mt-1">+50 STAT kazanacaksın</div>
              </div>
              <div className="text-xs text-gray-500">
                {statTokenService.canCreateProposal(statData?.balance || 0) ? 
                  '✅ Uygun' : '❌ 50+ STAT gerekli'}
              </div>
            </Link>

            <Link 
              to="/voting" 
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
                <HandRaisedIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Aktif Oylamalara Katıl</h4>
                <p className="text-sm text-gray-600">Bekleyen oylamalarda oy kullan</p>
                <div className="text-xs text-green-600 mt-1">+10 STAT kazanacaksın</div>
              </div>
              <div className="text-xs text-green-600">
                Senin oy gücün: {statData?.balance || 0}x
              </div>
            </Link>

            {(user.role === 'CORE_TEAM' || user.role === 'MEMBER') && (
              <Link 
                to="/applications" 
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center">
                  <UserGroupIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Pozisyona Başvur</h4>
                  <p className="text-sm text-gray-600">Core Team veya yönetim pozisyonlarına başvur</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Pending Items with STAT Requirements */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Bekleyen İşlemler</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {pendingItems.length} bekleyen
            </span>
          </div>

          <div className="space-y-4">
            {pendingItems.map((item) => (
              <div 
                key={item.id} 
                className={`p-4 border rounded-lg ${item.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <div className="flex items-center space-x-2">
                    {item.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                        Acil
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {item.requiredStat} STAT min.
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div>{item.deadline}</div>
                    <div className="text-green-600 mt-1">
                      Senin oy gücün: {item.yourVotingPower}x 
                      {item.yourVotingPower >= item.requiredStat ? ' ✅' : ' ❌'}
                    </div>
                  </div>
                  <Link 
                    to={`/${item.type === 'vote' ? 'voting' : 'proposals'}`}
                    className="text-dao-blue hover:text-blue-700 text-sm font-medium"
                  >
                    İşleme Git →
                  </Link>
                </div>
              </div>
            ))}

            {pendingItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircleIcon className="w-8 h-8 mx-auto mb-2" />
                <p>Tüm işlemler tamamlandı! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity with STAT Rewards */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Son Aktivitelerim</h3>
          <Link to="/proposals" className="text-dao-blue hover:text-blue-700 text-sm font-medium">
            Tüm Geçmişi Gör →
          </Link>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  {activity.statReward && (
                    <div className="text-xs text-yellow-600 mt-1 flex items-center space-x-1">
                      <StarIcon className="w-3 h-3" />
                      <span>+{activity.statReward} STAT kazandın</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {getStatusIcon(activity.status)}
                  <span>{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STAT Leaderboard Preview */}
      {leaderboard.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
              <TrophyIcon className="w-6 h-6 text-yellow-500" />
              <span>STAT Liderlik Tablosu</span>
            </h3>
            <Link to="/leaderboard" className="text-dao-blue hover:text-blue-700 text-sm font-medium">
              Tümünü Gör →
            </Link>
          </div>

          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((leader, index) => (
              <div key={leader.address} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                    index === 1 ? 'bg-gray-100 text-gray-600' : 
                    'bg-amber-100 text-amber-600'}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {leader.address === user.id ? 'Sen' : `Kullanıcı ${index + 1}`}
                  </div>
                  <div className="text-sm text-gray-600">{leader.role}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-dao-blue">{leader.balance} STAT</div>
                  <div className="text-xs text-gray-500">{leader.contributions} katkı</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 