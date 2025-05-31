import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
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
  TrophyIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { EthPragueService } from '../services/ethPragueIntegrations'

const Dashboard = () => {
  // Mock user data
  const user = {
    name: 'Demo User',
    email: 'demo@gtu.edu.tr',
    role: 'MEMBER',
    walletAddress: '0x742d35Cc6634C0532925a3b8D34E1C7C796F5032',
    isConnected: true
  }

  const [userStats, setUserStats] = useState({
    myProposals: 0,
    myVotes: 0,
    pendingActions: 0,
    membershipDays: 0,
  })

  const [ethPragueData, setEthPragueData] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [pendingItems, setPendingItems] = useState([])

  useEffect(() => {
    loadDashboardData()
    initializeEthPrague()
  }, [])

  const loadDashboardData = async () => {
    // Demo veri yükle
    setTimeout(() => {
      setUserStats({
        myProposals: 3,
        myVotes: 12,
        pendingActions: 2,
        membershipDays: 180,
      })

      setRecentActivity([
        { 
          id: 1, 
          type: 'vote', 
          title: 'ETH Prague entegrasyonu tamamlandı', 
          action: 'Blockscout verification başarılı',
          time: '2 saat önce',
          status: 'completed',
          platform: 'blockscout'
        },
        { 
          id: 2, 
          type: 'proposal', 
          title: 'World ID doğrulaması', 
          action: 'MiniKit entegrasyonu aktif',
          time: '1 gün önce',
          status: 'active',
          platform: 'worldapp'
        },
        { 
          id: 3, 
          type: 'stat_earned', 
          title: 'vlayer ZK proof oluşturuldu', 
          action: 'Web proof verification tamamlandı',
          time: '3 gün önce',
          status: 'completed',
          platform: 'vlayer'
        },
      ])

      setPendingItems([
        {
          id: 1,
          type: 'vote',
          title: 'ETH Prague 2025 Final Submission',
          description: 'Hackathon final sunumu için son kontroller ve ödül başvuruları.',
          deadline: '2 gün kaldı',
          urgent: true,
          platform: 'eth-prague'
        },
        {
          id: 2,
          type: 'proposal_review',
          title: 'Blockscout Merits Sistemi',
          description: 'Merits entegrasyonu için community voting gerekiyor.',
          deadline: '5 gün kaldı',
          urgent: false,
          platform: 'blockscout'
        },
      ])
    }, 1000)
  }

  const initializeEthPrague = async () => {
    try {
      const result = await EthPragueService.initializeAll()
      setEthPragueData(result)
      
      if (result.success) {
        toast.success('🏆 ETH Prague dashboard yüklendi!')
      }
    } catch (error) {
      console.error('ETH Prague initialization error:', error)
      toast.error('ETH Prague verileri yüklenemedi')
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4 text-green-600" />
      case 'active': return <ClockIcon className="w-4 h-4 text-blue-600" />
      case 'pending': return <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600" />
      default: return null
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'proposal': return DocumentTextIcon
      case 'vote': return HandRaisedIcon
      case 'application': return UserGroupIcon
      case 'stat_earned': return StarIcon
      default: return DocumentTextIcon
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'proposal': return 'text-blue-600 bg-blue-100'
      case 'vote': return 'text-green-600 bg-green-100'
      case 'application': return 'text-purple-600 bg-purple-100'
      case 'stat_earned': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'blockscout': return <EyeIcon className="w-4 h-4" />
      case 'worldapp': return <GlobeAltIcon className="w-4 h-4" />
      case 'vlayer': return <LockClosedIcon className="w-4 h-4" />
      default: return <StarIcon className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section with ETH Prague Stats */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Hoş geldin, {user.name}! 👋
            </h1>
            <p className="text-blue-100 mb-3">
              {user.role === 'PRESIDENT' ? 'Başkan' : 
               user.role === 'CORE_TEAM' ? 'Core Team Üyesi' : 'Kulüp Üyesi'} • 
              {userStats.membershipDays} gündür üyesin
            </p>
            
            {/* ETH Prague Status */}
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="w-5 h-5" />
                  <span className="font-bold">ETH Prague 2025</span>
                </div>
                <div className="text-xs text-blue-100">$40k Prize Pool</div>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">
                    {ethPragueData?.success ? '✅ Aktif' : '🔄 Yükleniyor'}
                  </span>
                </div>
                <div className="text-xs text-blue-100">3 Platform</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{userStats.pendingActions}</div>
            <div className="text-sm text-blue-100">Bekleyen İşlem</div>
          </div>
        </div>
      </div>

      {/* ETH Prague Integration Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Blockscout</h3>
                <p className="text-sm text-gray-600">$20k Prize Pool</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ✅ Aktif
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div>• Transaction tracking</div>
            <div>• Smart contract verification</div>
            <div>• Merits & Analytics</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GlobeAltIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">World App</h3>
                <p className="text-sm text-gray-600">$10k Prize Pool</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ✅ Aktif
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div>• World ID verification</div>
            <div>• MiniKit integration</div>
            <div>• WLD/USDC payments</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <LockClosedIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">vlayer</h3>
                <p className="text-sm text-gray-600">$10k Prize Pool</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              ✅ Aktif
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div>• Zero-knowledge proofs</div>
            <div>• Web & Email proofs</div>
            <div>• Time travel & Teleport</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Proposallarım</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.myProposals}</p>
            </div>
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Oy Sayım</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.myVotes}</p>
            </div>
            <HandRaisedIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen İşlem</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.pendingActions}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Üyelik Günü</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.membershipDays}</p>
            </div>
            <UserGroupIcon className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity & Pending Items */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Son Aktiviteler</h3>
            <Link to="/proposals" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Tümünü Gör →
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              const colorClass = getActivityColor(activity.type)
              
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 truncate">{activity.title}</p>
                      {activity.platform && getPlatformIcon(activity.platform)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {getStatusIcon(activity.status)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pending Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Bekleyen İşlemler</h3>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {pendingItems.length} Adet
            </span>
          </div>

          <div className="space-y-4">
            {pendingItems.map((item) => (
              <div key={item.id} className={`p-4 rounded-lg border-l-4 ${
                item.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  {item.platform && getPlatformIcon(item.platform)}
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.deadline}
                  </span>
                  <Link to="/voting" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    İncele →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Hızlı İşlemler</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/proposals" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
            <PlusIcon className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 text-center">Yeni Proposal</span>
          </Link>
          
          <Link to="/voting" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
            <HandRaisedIcon className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 text-center">Oy Kullan</span>
          </Link>
          
          <Link to="/kyc" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
            <TrophyIcon className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 text-center">ETH Prague Test</span>
          </Link>
          
          <Link to="/admin" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
            <UserGroupIcon className="w-8 h-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-gray-900 text-center">Admin Panel</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 