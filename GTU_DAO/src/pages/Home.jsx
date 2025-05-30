import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  HandRaisedIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  SparklesIcon,
  GlobeAltIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const Home = ({ user }) => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeProposals: 0,
    completedVotes: 0,
    kycVerified: 0,
  });

  useEffect(() => {
    // Demo istatistikleri yükle
    setTimeout(() => {
      setStats({
        totalMembers: 142,
        activeProposals: 5,
        completedVotes: 23,
        kycVerified: 98,
      });
    }, 1000);
  }, []);

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'KYC Doğrulama',
      description: 'World ID ile güvenli kimlik doğrulama sistemi',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: HandRaisedIcon,
      title: 'Şeffaf Oylama',
      description: 'Blockchain tabanlı adil ve şeffaf oylama sistemi',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: UserGroupIcon,
      title: 'Role Dayalı Yetkilendirme',
      description: 'Üye, Core Team ve Yönetim seviyelerinde yetki dağılımı',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: GlobeAltIcon,
      title: 'World App Entegrasyonu',
      description: 'MiniKit ile 23M+ kullanıcıya anında erişim',
      color: 'text-indigo-600 bg-indigo-100',
    },
  ];

  const recentActivity = [
    { type: 'proposal', title: 'Blockchain Workshop Organizasyonu', user: 'Mehmet K.', time: '2 saat önce' },
    { type: 'vote', title: 'Kulüp Logo Tasarımı Oylaması', user: 'Ayşe D.', time: '5 saat önce' },
    { type: 'application', title: 'Core Team Başvurusu', user: 'Can Y.', time: '1 gün önce' },
    { type: 'proposal', title: 'ETH Prague Katılım Talebi', user: 'Zeynep A.', time: '2 gün önce' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'proposal': return DocumentTextIcon;
      case 'vote': return HandRaisedIcon;
      case 'application': return UserGroupIcon;
      default: return ChartBarIcon;
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

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-dao-blue to-dao-purple rounded-2xl flex items-center justify-center">
              <AcademicCapIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            GTÜ Blockchain Kulübü
            <span className="bg-gradient-to-r from-dao-blue to-dao-purple bg-clip-text text-transparent block">
              DAO Yönetişim Sistemi
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Merkeziyetsiz, şeffaf ve KYC onaylı yönetişim sistemi ile kulüp kararlarında 
            demokratik katılımı sağlayan Web3 tabanlı platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard" className="btn-primary inline-flex items-center space-x-2 px-8 py-3">
                <ChartBarIcon className="w-5 h-5" />
                <span>Dashboard'a Git</span>
              </Link>
            ) : (
              <button className="btn-primary inline-flex items-center space-x-2 px-8 py-3">
                <ShieldCheckIcon className="w-5 h-5" />
                <span>World ID ile Katıl</span>
              </button>
            )}
            
            <Link to="/proposals" className="btn-secondary inline-flex items-center space-x-2 px-8 py-3">
              <DocumentTextIcon className="w-5 h-5" />
              <span>Önerileri İncele</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-dao-blue bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <UserGroupIcon className="w-6 h-6 text-dao-blue" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalMembers}</h3>
          <p className="text-gray-600">Toplam Üye</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-dao-green bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <DocumentTextIcon className="w-6 h-6 text-dao-green" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeProposals}</h3>
          <p className="text-gray-600">Aktif Öneri</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-dao-purple bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <HandRaisedIcon className="w-6 h-6 text-dao-purple" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completedVotes}</h3>
          <p className="text-gray-600">Tamamlanan Oylama</p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-dao-orange bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-dao-orange" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.kycVerified}%</h3>
          <p className="text-gray-600">KYC Onaylı</p>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Özellikleri</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Modern blockchain teknolojileri ile güçlendirilmiş DAO yönetişim sistemi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center group hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Son Aktiviteler</h3>
            <Link to="/dashboard" className="text-dao-blue hover:text-blue-700 text-sm font-medium">
              Tümünü Gör →
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              
              return (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ETH Prague Info */}
        <div className="card bg-gradient-to-br from-dao-blue to-dao-purple text-white">
          <div className="flex items-center space-x-3 mb-4">
            <SparklesIcon className="w-8 h-8" />
            <h3 className="text-xl font-semibold">ETH Prague 2025</h3>
          </div>
          
          <p className="mb-6 opacity-90">
            Bu proje ETH Prague hackathon'unda geliştirilmiş olup, World App, vlayer ve Blockscout 
            sponsor ödüllerine aday gösterilmiştir.
          </p>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>World App MiniKit entegrasyonu</span>
            </div>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>vlayer Web/Email Proofs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm opacity-90">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span>Blockscout API entegrasyonu</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white border-opacity-20">
            <p className="text-sm opacity-90">
              Açık kaynak kodlu ve tüm üniversite kulüpleri için örnek alınabilir
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 