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
  TrophyIcon,
  RocketLaunchIcon,
  HandRaisedIcon,
  CheckBadgeIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import { EthPragueService } from '../services/ethPragueIntegrations'
import contractService from '../services/contractService'

const Home = () => {
  const [ethPragueData, setEthPragueData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [contractAddresses] = useState(contractService.getContractAddresses())
  const [networkInfo] = useState(contractService.getNetworkInfo())
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [loading, setLoading] = useState(false)

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

  const connectWallet = async () => {
    setLoading(true)
    try {
      const result = await contractService.connectWallet()
      if (result.success) {
        setIsConnected(true)
        setUserAddress(result.address)
        toast.success('🎉 Connected to Rootstock Testnet!')
      } else {
        toast.error('❌ ' + result.error)
      }
    } catch (error) {
      toast.error('❌ Connection failed')
    }
    setLoading(false)
  }

  const openExplorer = (address) => {
    window.open(`${networkInfo.explorerUrl}/address/${address}`, '_blank')
  }

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

  const ethPragueStats = {
    totalPrizePool: '$40,000',
    integrations: 3,
    contractsDeployed: 5,
    network: 'Rootstock Testnet'
  }

  const features = [
    {
      icon: TrophyIcon,
      title: 'ETH Prague 2025',
      subtitle: '$40,000 Prize Pool',
      description: 'Complete integration with all three ETH Prague sponsor platforms for maximum prize eligibility.',
      color: 'from-yellow-400 to-orange-500',
      prizes: ['Blockscout: $20k', 'World App: $10k', 'vlayer: $10k']
    },
    {
      icon: EyeIcon,
      title: 'Blockscout Integration',
      subtitle: '$20,000 Prize Category',
      description: 'Advanced transaction tracking, smart contract verification, and Merits system for enhanced transparency.',
      color: 'from-blue-400 to-blue-600',
      features: ['Transaction Analytics', 'Contract Verification', 'Merits System']
    },
    {
      icon: GlobeAltIcon,
      title: 'World ID Verification',
      subtitle: '$10,000 Prize Category',
      description: 'Human verification through World ID with MiniKit SDK integration for secure identity management.',
      color: 'from-green-400 to-green-600',
      features: ['Orb Verification', 'Device Verification', 'WLD Payments']
    },
    {
      icon: LockClosedIcon,
      title: 'vlayer Privacy',
      subtitle: '$10,000 Prize Category',  
      description: 'Zero-knowledge proofs for privacy-preserving governance with web and email verification.',
      color: 'from-purple-400 to-purple-600',
      features: ['ZK Proofs', 'Web Verification', 'Anonymous Voting']
    }
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
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzQgNi0ydjE4bC02IDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* ETH Prague Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm mb-8 shadow-lg">
              <TrophyIcon className="w-5 h-5 mr-2" />
              ETH Prague 2025 • $40,000 Prize Pool
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="block">GTU DAO</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Blockchain Club
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Decentralized governance platform with cutting-edge Web3 integrations. 
              Built for ETH Prague 2025 with Blockscout, World ID, and vlayer technologies.
            </p>

            {/* Connection Status */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {!isConnected ? (
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LinkIcon className="w-5 h-5 mr-2" />
                      Connect to Rootstock
                    </div>
                  )}
                </button>
              ) : (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl px-6 py-3">
                  <div className="flex items-center text-green-300">
                    <CheckBadgeIcon className="w-5 h-5 mr-2" />
                    Connected: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                  </div>
                </div>
              )}
              
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex items-center">
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  Launch Dashboard
                </div>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {Object.entries(ethPragueStats).map(([key, value]) => (
                <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-sm text-blue-200 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ETH Prague Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ETH Prague 2025 Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete integration with all sponsor platforms to maximize prize pool eligibility 
              across three categories totaling $40,000 USD.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm font-medium text-green-600 mb-3">{feature.subtitle}</p>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    
                    <div className="space-y-2">
                      {(feature.features || feature.prizes || []).map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-500">
                          <SparklesIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployed Contracts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Live Smart Contracts
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              All contracts deployed and verified on Rootstock Testnet
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <CheckBadgeIcon className="w-4 h-4 mr-2" />
              Network: {networkInfo.name}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'STAT Token', address: contractAddresses.STAT_TOKEN, icon: '💎', desc: 'Governance & Reputation' },
              { name: 'Blockscout Integration', address: contractAddresses.BLOCKSCOUT_INTEGRATION, icon: '🔍', desc: '$20k Prize Category' },
              { name: 'World App Integration', address: contractAddresses.WORLDAPP_INTEGRATION, icon: '🌍', desc: '$10k Prize Category' },
              { name: 'vlayer Integration', address: contractAddresses.VLAYER_INTEGRATION, icon: '🔒', desc: '$10k Prize Category' },
              { name: 'Voting System', address: contractAddresses.VOTING_SYSTEM, icon: '🗳️', desc: 'Weighted Governance' }
            ].map((contract, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">{contract.icon}</div>
                  <button
                    onClick={() => openExplorer(contract.address)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{contract.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{contract.desc}</p>
                
                <div className="bg-white/50 rounded-lg p-3 font-mono text-xs break-all text-gray-700 group-hover:bg-white/80 transition-colors">
                  {contract.address}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={networkInfo.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
              View on Blockscout Explorer
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Web3 Governance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join GTU DAO and be part of the decentralized future with cutting-edge blockchain technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-center">
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Launch Dashboard
              </div>
            </Link>
            
            <Link
              to="/kyc"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center justify-center">
                <CheckBadgeIcon className="w-5 h-5 mr-2" />
                Try ETH Prague Demo
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 