import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  UserGroupIcon,
  DocumentTextIcon,
  HandRaisedIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  CheckBadgeIcon,
  EyeIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  UserIcon,
  ChartBarIcon,
  BanknotesIcon,
  CogIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import contractService from '../services/contractService'

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [userStats, setUserStats] = useState(null)
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [contractAddresses] = useState(contractService.getContractAddresses())
  const [networkInfo] = useState(contractService.getNetworkInfo())

  useEffect(() => {
    initializeDashboard()
  }, [])

  const initializeDashboard = async () => {
    try {
      // Check if already connected
      if (window.ethereum && window.ethereum.selectedAddress) {
        const result = await contractService.connectWallet()
        if (result.success) {
          setIsConnected(true)
          setUserAddress(result.address)
          await loadUserData(result.address)
        }
      }
      
      // Load proposals even without connection
      await loadProposals()
    } catch (error) {
      console.error('Dashboard initialization error:', error)
    }
    setLoading(false)
  }

  const loadUserData = async (address) => {
    try {
      const stats = await contractService.getUserStats(address)
      setUserStats(stats)
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const loadProposals = async () => {
    try {
      const allProposals = await contractService.getAllProposals()
      setProposals(allProposals.slice(0, 5)) // Show latest 5
    } catch (error) {
      console.error('Error loading proposals:', error)
    }
  }

  const connectWallet = async () => {
    setLoading(true)
    try {
      const result = await contractService.connectWallet()
      if (result.success) {
        setIsConnected(true)
        setUserAddress(result.address)
        await loadUserData(result.address)
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

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently'
    const now = Date.now() / 1000
    const diff = now - timestamp
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const getProposalStatusColor = (status) => {
    switch (status) {
      case 0: return 'bg-blue-100 text-blue-800' // Active
      case 1: return 'bg-green-100 text-green-800' // Approved
      case 2: return 'bg-red-100 text-red-800' // Rejected
      case 3: return 'bg-gray-100 text-gray-800' // Executed
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProposalStatusText = (status) => {
    switch (status) {
      case 0: return 'Active'
      case 1: return 'Approved'
      case 2: return 'Rejected'
      case 3: return 'Executed'
      default: return 'Unknown'
    }
  }

  const ethPragueIntegrations = [
    {
      title: 'Blockscout Explorer',
      prize: '$20,000',
      description: 'Transaction tracking with Merits system and enhanced analytics',
      icon: EyeIcon,
      color: 'from-blue-400 to-blue-600',
      address: contractAddresses.BLOCKSCOUT_INTEGRATION,
      status: 'deployed',
      features: ['Transaction Analytics', 'Smart Contract Verification', 'Merits System', 'Activity Monitoring']
    },
    {
      title: 'World App Integration',
      prize: '$10,000',
      description: 'World ID verification with MiniKit SDK and payment integration',
      icon: GlobeAltIcon,
      color: 'from-green-400 to-green-600',
      address: contractAddresses.WORLDAPP_INTEGRATION,
      status: 'deployed',
      features: ['World ID Verification', 'Orb/Device Auth', 'WLD/USDC Payments', 'Permission Management']
    },
    {
      title: 'vlayer Privacy',
      prize: '$10,000',
      description: 'Zero-knowledge proofs for privacy-preserving governance',
      icon: LockClosedIcon,
      color: 'from-purple-400 to-purple-600',
      address: contractAddresses.VLAYER_INTEGRATION,
      status: 'deployed',
      features: ['Web Proofs', 'Email Verification', 'Time Travel', 'Anonymous Voting']
    }
  ]

  const quickStats = [
    {
      title: 'STAT Balance',
      value: userStats ? `${parseFloat(userStats.balance).toFixed(2)}` : '0.00',
      subtitle: 'Governance Tokens',
      icon: BanknotesIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Proposals Created',
      value: userStats?.stats?.proposalsCreated || '0',
      subtitle: 'Your Proposals',
      icon: DocumentTextIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Votes Cast',
      value: userStats?.stats?.votesParticipated || '0',
      subtitle: 'Participation',
      icon: HandRaisedIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Total Contributions',
      value: userStats?.stats?.totalContributions || '0',
      subtitle: 'Community Points',
      icon: TrophyIcon,
      color: 'bg-orange-500'
    }
  ]

  const quickActions = [
    { title: 'Create Proposal', href: '/proposals', icon: DocumentTextIcon, color: 'bg-blue-600' },
    { title: 'Vote on Proposals', href: '/voting', icon: HandRaisedIcon, color: 'bg-green-600' },
    { title: 'View Applications', href: '/applications', icon: UserGroupIcon, color: 'bg-purple-600' },
    { title: 'ETH Prague Demo', href: '/kyc', icon: SparklesIcon, color: 'bg-orange-600' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  GTU DAO Dashboard
                </h1>
                <p className="text-gray-600">
                  ETH Prague 2025 Integration • $40,000 Prize Pool
                </p>
              </div>
              
              <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="bg-green-100 border border-green-200 rounded-lg px-4 py-2 text-green-800 text-sm font-medium">
                    <div className="flex items-center">
                      <CheckBadgeIcon className="w-5 h-5 mr-2" />
                      {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-2 text-blue-800 text-sm font-medium">
                  <div className="flex items-center">
                    <GlobeAltIcon className="w-5 h-5 mr-2" />
                    {networkInfo.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ETH Prague Integrations */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ETH Prague 2025 Integrations</h2>
              <p className="text-gray-600">Live smart contracts on Rootstock Testnet</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              <TrophyIcon className="w-4 h-4 inline mr-1" />
              $40,000 Total
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {ethPragueIntegrations.map((integration, index) => (
              <div key={index} className="relative group">
                <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-2 h-2 absolute top-4 right-4 rounded-full ${
                    integration.status === 'deployed' ? 'bg-green-500' : 'bg-yellow-500'
                  } animate-pulse`}></div>
                  
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${integration.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <integration.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.title}</h3>
                  <p className="text-sm font-medium text-green-600 mb-3">{integration.prize} Prize Pool</p>
                  <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <SparklesIcon className="w-3 h-3 mr-2 text-gray-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Deployed
                    </span>
                    <button
                      onClick={() => openExplorer(integration.address)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      View Contract
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Proposals */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Proposals</h2>
                <Link
                  to="/voting"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All →
                </Link>
              </div>
              
              {proposals.length > 0 ? (
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{proposal.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProposalStatusColor(proposal.status)}`}>
                          {getProposalStatusText(proposal.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{proposal.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>By {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}</span>
                        <span className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {formatTimeAgo(proposal.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No proposals yet</p>
                  <p className="text-sm text-gray-400">Create the first proposal to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & User Info */}
          <div className="space-y-6">
            {/* User Role & Stats */}
            {isConnected && userStats && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Profile</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role</span>
                    <span className="font-medium text-gray-900">
                      {userStats.stats?.role || 'Member'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Activity</span>
                    <span className="font-medium text-gray-900">
                      {formatTimeAgo(userStats.stats?.lastActivityTimestamp)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{action.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contract Addresses */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contract Registry</h3>
              <div className="space-y-3">
                {Object.entries(contractAddresses).map(([name, address]) => (
                  <div key={name} className="group">
                    <div className="text-xs text-gray-600 mb-1 capitalize">
                      {name.replace(/_/g, ' ')}
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="text-xs font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </code>
                      <button
                        onClick={() => openExplorer(address)}
                        className="text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 