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
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const Dashboard = ({ user }) => {
  const [userStats, setUserStats] = useState({
    myProposals: 0,
    myVotes: 0,
    pendingActions: 0,
    membershipDays: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
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
          action: 'EVET oyunu verdin',
          time: '2 saat önce',
          status: 'completed'
        },
        { 
          id: 2, 
          type: 'proposal', 
          title: 'ETH Prague Katılım Talebi', 
          action: 'Öneri sundun',
          time: '1 gün önce',
          status: 'active'
        },
        { 
          id: 3, 
          type: 'application', 
          title: 'Core Team Başvurusu', 
          action: 'Başvuru gönderildi',
          time: '3 gün önce',
          status: 'pending'
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
        },
        {
          id: 2,
          type: 'proposal_review',
          title: 'Finans Raporu İncelemesi',
          description: 'Geçen ay yapılan harcamaların onaylanması için Core Team oylaması.',
          deadline: '5 gün kaldı',
          urgent: false,
        },
      ]);
    }, 1000);
  }, []);

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
      default: return DocumentTextIcon;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'proposal': return 'text-blue-600 bg-blue-100';
      case 'vote': return 'text-green-600 bg-green-100';
      case 'application': return 'text-purple-600 bg-purple-100';
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
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-dao-blue to-dao-purple text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Hoş geldin, {user.name}! 👋
            </h1>
            <p className="opacity-90">
              {user.role === 'PRESIDENT' ? 'Başkan' : 
               user.role === 'CORE_TEAM' ? 'Core Team Üyesi' : 'Kulüp Üyesi'} • 
              {userStats.membershipDays} gündür üyesin
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userStats.pendingActions}</div>
            <div className="text-sm opacity-90">Bekleyen İşlem</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{userStats.myProposals}</h3>
          <p className="text-gray-600">Önerilerim</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <HandRaisedIcon className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{userStats.myVotes}</h3>
          <p className="text-gray-600">Verdiğim Oy</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round((userStats.myVotes / userStats.membershipDays) * 30)}
          </h3>
          <p className="text-gray-600">Aylık Katılım</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <UserGroupIcon className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {user.role === 'CORE_TEAM' ? 'Core' : user.role === 'PRESIDENT' ? 'Başkan' : 'Üye'}
          </h3>
          <p className="text-gray-600">Rolüm</p>
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
              <div>
                <h4 className="font-medium text-gray-900">Yeni Öneri Oluştur</h4>
                <p className="text-sm text-gray-600">Kulüp için yeni bir öneri sun</p>
              </div>
            </Link>

            <Link 
              to="/voting" 
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center">
                <HandRaisedIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Aktif Oylamalara Katıl</h4>
                <p className="text-sm text-gray-600">Bekleyen oylamalarda oy kullan</p>
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

        {/* Pending Items */}
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
                  {item.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                      Acil
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.deadline}</span>
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

      {/* Recent Activity */}
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
    </div>
  );
};

export default Dashboard; 