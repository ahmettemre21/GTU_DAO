"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Users, 
  Vote, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Bell,
  Settings,
  Wallet,
  Coins,
  Send,
  Plus,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { useSmartContracts } from '../hooks/useSmartContracts'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import toast from 'react-hot-toast'

interface QuickAction {
  id: number
  title: string
  description: string
  icon: any
  action: string
}

interface RecentActivity {
  id: number
  type: string
  description: string
  time: string
  status: string
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const { 
    contracts,
    tokenBalance, 
    totalSupply,
    tokenName,
    tokenSymbol,
    votingWeight, 
    proposalCount,
    userRole,
    treasuryBalance,
    governanceStats,
    isPending,
    isConfirming,
    transferSTATTokens,
    mintSTATTokens,
    STAT_TOKEN_CONFIG
  } = useSmartContracts()

  const userStats = {
    statTokens: 142,
    votingPower: 8.5,
    proposalsVoted: 12,
    proposalsCreated: 3,
    memberSince: "Jan 2024",
    role: "Core Member"
  }

  const [recentActivity] = useState<RecentActivity[]>([
    { id: 1, type: 'vote', description: 'You voted on Campus WiFi Improvement Project', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'proposal', description: 'You created a new student activity center proposal', time: '1 day ago', status: 'active' },
    { id: 3, type: 'token', description: 'You received 50 STAT tokens (Event participation)', time: '3 days ago', status: 'completed' },
    { id: 4, type: 'delegate', description: 'You delegated your votes to @student_rep_42', time: '1 week ago', status: 'active' }
  ])

  const [quickActions] = useState<QuickAction[]>([
    { id: 1, title: 'Create New Proposal', description: 'Create a new proposal for campus management', icon: Plus, action: '/proposals?new=true' },
    { id: 2, title: 'Send STAT Tokens', description: 'Send STAT tokens to other students', icon: Send, action: '#transfer' },
    { id: 3, title: 'Vote on Proposals', description: 'Vote on active proposals', icon: Vote, action: '/proposals' },
    { id: 4, title: 'Connect Wallet', description: 'Connect your Web3 wallet', icon: Wallet, action: '#connect' }
  ])

  const formatNumber = (num: string | number) => {
    const value = typeof num === 'string' ? parseFloat(num) : num
    return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(value)
  }

  const truncateAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Safely access governance stats with proper typing
  const getGovernanceStatsValue = (key: string, defaultValue: number = 0): number => {
    if (!governanceStats || typeof governanceStats !== 'object') return defaultValue
    const stats = governanceStats as any
    return stats[key] ? Number(stats[key]) : defaultValue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0E12] via-[#1a1f2e] to-[#0B0E12] text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00C4FF] to-white bg-clip-text text-transparent">
                GTU DAO
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-[#00C4FF]">
                Dashboard
              </Link>
              <Link href="/proposals" className="hover:text-[#00C4FF] transition-colors">
                Proposals
              </Link>
              <Link href="/verify" className="hover:text-[#00C4FF] transition-colors">
                Verify
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-400 hover:text-[#00C4FF] cursor-pointer" />
              <Settings className="w-5 h-5 text-gray-400 hover:text-[#00C4FF] cursor-pointer" />
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300C4FF' fillOpacity='0.1'%3E%3Cpath d='M30 30l15-8.66v17.32L30 30zm0 0L15 21.34v17.32L30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            GTU DAO Dashboard - Blockchain-based student governance
          </p>
          {isConnected && address && (
            <div className="mt-2 flex items-center gap-2 text-sm text-blue-400">
              <Wallet className="w-4 h-4" />
              <span>Connected Wallet: {truncateAddress(address)}</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* STAT Token Balance */}
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">STAT Token Balance</CardTitle>
              <Coins className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(tokenBalance)} {tokenSymbol}</div>
              <p className="text-xs text-gray-400 mt-1">
                Total Supply: {formatNumber(totalSupply)} {tokenSymbol}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Portfolio Ratio</span>
                  <span>{totalSupply !== '0' ? ((parseFloat(tokenBalance) / parseFloat(totalSupply)) * 100).toFixed(2) : 0}%</span>
                </div>
                <Progress 
                  value={totalSupply !== '0' ? (parseFloat(tokenBalance) / parseFloat(totalSupply)) * 100 : 0} 
                  className="h-1" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Voting Power */}
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-green-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Voting Power</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(votingWeight)}</div>
              <p className="text-xs text-gray-400 mt-1">
                Active Vote Power
              </p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  userRole === 'EXECUTIVE' ? 'bg-purple-900/50 text-purple-300' :
                  userRole === 'CORE_TEAM' ? 'bg-blue-900/50 text-blue-300' :
                  'bg-gray-900/50 text-gray-300'
                }`}>
                  {userRole}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Active Proposals */}
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Proposals</CardTitle>
              <Vote className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{proposalCount}</div>
              <p className="text-xs text-gray-400 mt-1">
                {getGovernanceStatsValue('activeProposals')} active
              </p>
            </CardContent>
          </Card>

          {/* Treasury Balance */}
          <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Treasury</CardTitle>
              <Users className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(treasuryBalance)} ETH</div>
              <p className="text-xs text-gray-400 mt-1">
                Total: {getGovernanceStatsValue('totalParticipants')} participant
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contract Information */}
        {contracts && (
          <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                Smart Contract Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                GTU DAO contract addresses and connection information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-400">STAT Token Contract</h4>
                  <p className="text-sm text-gray-300 font-mono break-all">{contracts.tokenContract}</p>
                  <div className="text-xs text-gray-400">
                    Token Name: {tokenName} ({tokenSymbol})
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-400">Voting Contract</h4>
                  <p className="text-sm text-gray-300 font-mono break-all">{contracts.votingContract}</p>
                  <div className="text-xs text-gray-400">
                    Total Proposals: {proposalCount}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-400">Governance Contract</h4>
                  <p className="text-sm text-gray-300 font-mono break-all">
                    {contracts.governanceContract || 'Not yet defined'}
                  </p>
                  <div className="text-xs text-gray-400">
                    User Role: {userRole}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activities</CardTitle>
              <CardDescription className="text-gray-400">Your recent DAO activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'completed' 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-blue-900/50 text-blue-300'
                    }`}>
                      {activity.status === 'completed' ? 'Completed' : 'Active'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Common DAO actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="h-auto p-4 border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 text-left"
                    onClick={() => {
                      if (action.action.startsWith('#')) {
                        toast.success('This feature is coming soon!')
                      } else {
                        window.location.href = action.action
                      }
                    }}
                    disabled={isPending || isConfirming}
                  >
                    <div className="flex items-start space-x-3">
                      <action.icon className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white text-sm">{action.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Status */}
        {(isPending || isConfirming) && (
          <Card className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-blue-400">
                  {isPending ? 'Waiting for transaction confirmation...' : 'Transaction being processed on blockchain...'}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 