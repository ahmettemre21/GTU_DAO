"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, TrendingUp, Vote, Clock, CheckCircle, AlertCircle, Zap, Crown, Star } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/layout/Navigation"

export default function Dashboard() {
  const userRole = "Core Member" // This would come from user data
  const statBalance = 1250
  const votingPower = 85

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0B0E12] text-[#F3F4F6]">
        {/* Header */}
        <div className="border-b border-gray-800/50 bg-gray-900/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 border-2 border-[#00C4FF]">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-[#00C4FF] to-[#0080CC] text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, John</h1>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-[#00C4FF]/20 text-[#00C4FF] border-[#00C4FF]/30">
                      <Crown className="w-3 h-3 mr-1" />
                      {userRole}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      <Zap className="w-3 h-3 mr-1" />
                      {statBalance} STAT
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" className="border-gray-600 hover:border-[#00C4FF]">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]">
                  Create Proposal
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">STAT Balance</p>
                    <p className="text-2xl font-bold text-[#00C4FF]">{statBalance}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Voting Power</p>
                    <p className="text-2xl font-bold text-green-400">{votingPower}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Proposals</p>
                    <p className="text-2xl font-bold text-yellow-400">3</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Participation Rate</p>
                    <p className="text-2xl font-bold text-purple-400">92%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Proposals */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-[#00C4FF]">Active Proposals</span>
                    <Button variant="outline" size="sm" asChild className="border-gray-600 hover:border-[#00C4FF]">
                      <Link href="/proposals">View All</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-gray-800 rounded-lg p-4 hover:border-[#00C4FF]/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">New Student Center Funding</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Clock className="w-3 h-3 mr-1" />2 days left
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Proposal to allocate $50,000 for new student center renovations...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">65% Yes</span>
                        <Progress value={65} className="w-24 h-2" />
                      </div>
                      <Button size="sm" className="bg-[#00C4FF] hover:bg-[#0080CC]">
                        Vote Now
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-800 rounded-lg p-4 hover:border-[#00C4FF]/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">Campus Sustainability Initiative</h3>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <Clock className="w-3 h-3 mr-1" />5 days left
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Implementation of solar panels and recycling programs...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">78% Yes</span>
                        <Progress value={78} className="w-24 h-2" />
                      </div>
                      <Button size="sm" className="bg-[#00C4FF] hover:bg-[#0080CC]">
                        Vote Now
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-800 rounded-lg p-4 hover:border-[#00C4FF]/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">Extended Library Hours</h3>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <Clock className="w-3 h-3 mr-1" />1 day left
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Extend library operating hours during exam periods...</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">89% Yes</span>
                        <Progress value={89} className="w-24 h-2" />
                      </div>
                      <Button size="sm" className="bg-[#00C4FF] hover:bg-[#0080CC]">
                        Vote Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00C4FF]">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Voted on Library Hours</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00C4FF]/20 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#00C4FF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Earned 50 STAT tokens</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New proposal created</p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-[#00C4FF]">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]"
                    asChild
                  >
                    <Link href="/proposals/create">Create Proposal</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 hover:border-[#00C4FF]" asChild>
                    <Link href="/proposals">Browse Proposals</Link>
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 hover:border-[#00C4FF]" asChild>
                    <Link href="/verify">Verify Identity</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 