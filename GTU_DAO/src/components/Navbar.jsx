import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  HandRaisedIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { verifyWithWorldID } from '../lib/minikit';
import toast from 'react-hot-toast';

const Navbar = ({ user, setUser }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Öneriler', href: '/proposals', icon: DocumentTextIcon },
    { name: 'Oylamalar', href: '/voting', icon: HandRaisedIcon },
    { name: 'Başvurular', href: '/applications', icon: UserGroupIcon },
  ];

  // Admin paneli için özel yetki kontrolü
  if (user?.role === 'PRESIDENT' || user?.role === 'CORE_TEAM') {
    navigation.push({ name: 'Admin Panel', href: '/admin', icon: CogIcon });
  }

  const handleWorldIDVerification = async () => {
    try {
      const result = await verifyWithWorldID();
      if (result.success) {
        toast.success('World ID doğrulaması başarılı!');
        // KYC durumunu güncelle
        setUser(prev => ({ ...prev, kycStatus: 'APPROVED', verified: true }));
      } else {
        toast.error('World ID doğrulaması başarısız: ' + result.error);
      }
    } catch (error) {
      toast.error('Doğrulama hatası: ' + error.message);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'PRESIDENT': return 'bg-purple-100 text-purple-800';
      case 'CORE_TEAM': return 'bg-blue-100 text-blue-800';
      case 'ADMIN_CANDIDATE': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'PRESIDENT': return 'Başkan';
      case 'CORE_TEAM': return 'Çekirdek Ekip';
      case 'ADMIN_CANDIDATE': return 'Aday';
      case 'MEMBER': return 'Üye';
      default: return role;
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo ve Başlık */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-dao-blue to-dao-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-gray-800">GTU DAO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-dao-blue text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Kullanıcı Bilgileri */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* KYC Durumu */}
                {user.kycStatus !== 'APPROVED' && (
                  <button
                    onClick={handleWorldIDVerification}
                    className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors"
                  >
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>World ID Doğrula</span>
                  </button>
                )}

                {/* Rol Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {getRoleText(user.role)}
                </span>

                {/* Kullanıcı Profili */}
                <div className="flex items-center space-x-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      {user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-dao-blue to-dao-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleWorldIDVerification}
                className="btn-primary flex items-center space-x-2"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                <span>World ID ile Giriş</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-dao-blue text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 