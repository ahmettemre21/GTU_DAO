import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { 
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EyeIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { EthPragueService } from '../services/ethPragueIntegrations'

const Home = () => {
  const [ethPragueData, setEthPragueData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeEthPrague = async () => {
      try {
        const result = await EthPragueService.initializeAll()
        setEthPragueData(result)
        
        if (result.success) {
          toast.success('🏆 ETH Prague 2025 entegrasyonları başlatıldı!')
        }
      } catch (error) {
        console.error('ETH Prague initialization error:', error)
        toast.error('ETH Prague entegrasyonları başlatılamadı')
      } finally {
        setIsLoading(false)
      }
    }

    initializeEthPrague()
  }, [])

  const prizePoolInfo = EthPragueService.getPrizePoolInfo()

  const stats = [
    { name: 'Toplam Üye', value: '1,247', icon: UserGroupIcon, change: '+12%' },
    { name: 'Aktif Proposaller', value: '23', icon: DocumentTextIcon, change: '+5%' },
    { name: 'Toplam Oy', value: '8,492', icon: ChartBarIcon, change: '+18%' },
    { name: 'ETH Prague Ödül', value: '$40K', icon: TrophyIcon, change: 'NEW!' }
  ]

  const ethPragueIntegrations = [
    {
      title: 'Blockscout Integration',
      description: 'Advanced blockchain explorer with Merits system',
      prize: '$20,000',
      icon: EyeIcon,
      color: 'text-blue-600 bg-blue-100',
      features: ['Transaction Tracking', 'Smart Contract Verification', 'Merits & Badges', 'Analytics API'],
      status: ethPragueData?.integrations?.blockscout?.success ? 'active' : 'loading'
    },
    {
      title: 'World App MiniKit',
      description: 'World ID verification & payment integration',
      prize: '$10,000', 
      icon: GlobeAltIcon,
      color: 'text-green-600 bg-green-100',
      features: ['World ID Verification', 'WLD/USDC Payments', 'MiniApp Ecosystem', 'Haptic Feedback'],
      status: ethPragueData?.integrations?.worldApp?.success ? 'active' : 'loading'
    },
    {
      title: 'vlayer ZK Proofs',
      description: 'Zero-knowledge proof verification system',
      prize: '$10,000',
      icon: LockClosedIcon,
      color: 'text-purple-600 bg-purple-100',
      features: ['Web Proofs', 'Email Proofs', 'Time Travel', 'Teleport'],
      status: ethPragueData?.integrations?.vlayer?.success ? 'active' : 'loading'
    }
  ]

  const quickActions = [
    { name: 'Proposal Oluştur', href: '/proposals', icon: DocumentTextIcon, color: 'bg-blue-600' },
    { name: 'Oy Kullan', href: '/voting', icon: ChartBarIcon, color: 'bg-green-600' },
    { name: 'KYC Doğrulama', href: '/kyc', icon: ShieldCheckIcon, color: 'bg-purple-600' },
    { name: 'Dashboard', href: '/dashboard', icon: UserGroupIcon, color: 'bg-indigo-600' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">ETH Prague 2025 entegrasyonları yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              GTÜ Blockchain Club DAO
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Decentralized Autonomous Organization
            </p>
            <div className="flex items-center space-x-4">
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
                📚 Gebze Teknik Üniversitesi
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
                🏆 ETH Prague 2025
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <TrophyIcon className="w-16 h-16 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl font-bold">{prizePoolInfo.total}</div>
              <div className="text-sm text-blue-100">Prize Pool</div>
            </div>
          </div>
        </div>
      </div>

      {/* ETH Prague 2025 Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SparklesIcon className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">ETH Prague 2025 Hackathon</h3>
              <p className="text-yellow-100">3 Platform Entegrasyonu - $40,000 Toplam Ödül Havuzu</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-yellow-100">Statü</div>
            <div className="font-semibold">
              {ethPragueData?.success ? '✅ Aktif' : '🔄 Yükleniyor'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.change.includes('+') ? 'text-green-600' : 
                  stat.change === 'NEW!' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ETH Prague Integrations */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🏆 ETH Prague 2025 Entegrasyonları
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ethPragueIntegrations.map((integration) => {
            const Icon = integration.icon
            return (
              <div key={integration.title} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${integration.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Ödül Havuzu</div>
                    <div className="font-bold text-green-600">{integration.prize}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {integration.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {integration.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {integration.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    integration.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {integration.status === 'active' ? '✅ Aktif' : '🔄 Yükleniyor'}
                  </span>
                  <Link 
                    to="/kyc" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Test Et →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.name}
                to={action.href}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color} mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">
                  {action.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Son Aktiviteler</h2>
        <div className="space-y-4">
          {[
            { action: 'ETH Prague entegrasyonları aktifleştirildi', time: '2 dakika önce', type: 'success' },
            { action: 'Yeni proposal: "Token Economics Update"', time: '1 saat önce', type: 'info' },
            { action: 'Blockscout verification tamamlandı', time: '3 saat önce', type: 'success' },
            { action: 'World ID doğrulaması başarılı', time: '5 saat önce', type: 'success' },
            { action: 'vlayer ZK proof oluşturuldu', time: '1 gün önce', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <span className="text-sm text-gray-900">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ETH Prague Info Card */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center space-x-4">
          <TrophyIcon className="w-12 h-12 text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">ETH Prague 2025 Hackathon</h3>
            <p className="text-gray-600 mb-4">
              GTU DAO, 3 farklı platformla entegrasyon yaparak toplam $40,000 ödül havuzunu hedefliyor
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 rounded-lg p-3">
                <div className="font-semibold text-blue-600">Blockscout ($20k)</div>
                <div className="text-gray-600">Explorer & Analytics</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <div className="font-semibold text-green-600">World App ($10k)</div>
                <div className="text-gray-600">MiniKit & World ID</div>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <div className="font-semibold text-purple-600">vlayer ($10k)</div>
                <div className="text-gray-600">ZK Proofs & Privacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 