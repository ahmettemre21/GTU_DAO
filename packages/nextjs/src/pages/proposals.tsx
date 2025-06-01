"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Clock, CheckCircle, XCircle, TrendingUp, Users, Calendar, ArrowRight, Shield } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from "next/link"

export default function ProposalsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const proposals = [
    {
      id: 1,
      title: "New Student Center Funding",
      description: "Proposal to allocate $50,000 for new student center renovations including study spaces, recreational areas, and modern technology infrastructure.",
      status: "active",
      yesVotes: 65,
      noVotes: 35,
      totalVotes: 234,
      timeLeft: "2 days",
      category: "Infrastructure",
      author: "Student Council",
      created: "2024-01-15",
    },
    {
      id: 2,
      title: "Campus Sustainability Initiative",
      description: "Implementation of solar panels and comprehensive recycling programs across all campus buildings to reduce environmental impact.",
      status: "active",
      yesVotes: 78,
      noVotes: 22,
      totalVotes: 189,
      timeLeft: "5 days",
      category: "Environment",
      author: "Green Committee",
      created: "2024-01-12",
    },
    {
      id: 3,
      title: "Extended Library Hours",
      description: "Extend library operating hours during exam periods from 8 AM to 2 AM to provide students with more study time and resources.",
      status: "active",
      yesVotes: 89,
      noVotes: 11,
      totalVotes: 312,
      timeLeft: "1 day",
      category: "Academic",
      author: "Academic Affairs",
      created: "2024-01-10",
    },
    {
      id: 4,
      title: "Mental Health Support Program",
      description: "Establish a comprehensive mental health support program with additional counselors and wellness resources for students.",
      status: "passed",
      yesVotes: 92,
      noVotes: 8,
      totalVotes: 456,
      timeLeft: "Completed",
      category: "Wellness",
      author: "Health Committee",
      created: "2024-01-05",
    },
    {
      id: 5,
      title: "Parking Fee Increase",
      description: "Proposal to increase parking fees by 25% to fund new parking structure construction and maintenance of existing facilities.",
      status: "rejected",
      yesVotes: 23,
      noVotes: 77,
      totalVotes: 398,
      timeLeft: "Completed",
      category: "Infrastructure",
      author: "Facilities Management",
      created: "2024-01-01",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "passed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-3 h-3 mr-1" />
      case "passed":
        return <CheckCircle className="w-3 h-3 mr-1" />
      case "rejected":
        return <XCircle className="w-3 h-3 mr-1" />
      default:
        return <Clock className="w-3 h-3 mr-1" />
    }
  }

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#0B0E12] text-[#F3F4F6]">
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

            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-[#00C4FF] transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-[#00C4FF] transition-colors">
                Dashboard
              </Link>
              <Link href="/verify" className="hover:text-[#00C4FF] transition-colors">
                Verify
              </Link>
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-gray-800/50 bg-gray-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#00C4FF] bg-clip-text text-transparent">
                Governance Proposals
              </h1>
              <p className="text-gray-400 mt-2">Participate in shaping the future of our university</p>
            </div>
            <Button
              className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]"
              asChild
            >
              <Link href="/proposals/create">Create Proposal</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search proposals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Proposals</p>
                  <p className="text-2xl font-bold text-green-400">3</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Votes</p>
                  <p className="text-2xl font-bold text-[#00C4FF]">1,589</p>
                </div>
                <Users className="w-8 h-8 text-[#00C4FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Passed</p>
                  <p className="text-2xl font-bold text-blue-400">1</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Rejected</p>
                  <p className="text-2xl font-bold text-red-400">1</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proposals List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#00C4FF] data-[state=active]:text-white">
              All Proposals
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-[#00C4FF] data-[state=active]:text-white">
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-[#00C4FF] data-[state=active]:text-white">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredProposals.map((proposal) => (
              <Card key={proposal.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-[#00C4FF]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
                        <Badge className={`${getStatusColor(proposal.status)} flex items-center`}>
                          {getStatusIcon(proposal.status)}
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-3 line-clamp-2">{proposal.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {proposal.created}
                        </span>
                        <span>by {proposal.author}</span>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {proposal.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-3">
                      {proposal.status === "active" && (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-400">Yes: {proposal.yesVotes}%</span>
                              <span className="text-red-400">No: {proposal.noVotes}%</span>
                            </div>
                            <Progress value={proposal.yesVotes} className="bg-gray-700" />
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>{proposal.totalVotes} votes</span>
                            <span>{proposal.timeLeft} left</span>
                          </div>
                        </>
                      )}
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]"
                      >
                        <Link href={`/proposals/${proposal.id}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {filteredProposals
              .filter((p) => p.status === "active")
              .map((proposal) => (
                <Card key={proposal.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-[#00C4FF]/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3 line-clamp-2">{proposal.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {proposal.created}
                          </span>
                          <span>by {proposal.author}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {proposal.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="lg:w-64 space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">Yes: {proposal.yesVotes}%</span>
                            <span className="text-red-400">No: {proposal.noVotes}%</span>
                          </div>
                          <Progress value={proposal.yesVotes} className="bg-gray-700" />
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>{proposal.totalVotes} votes</span>
                          <span>{proposal.timeLeft} left</span>
                        </div>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]"
                        >
                          <Link href={`/proposals/${proposal.id}`}>
                            Vote Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filteredProposals
              .filter((p) => p.status === "passed" || p.status === "rejected")
              .map((proposal) => (
                <Card key={proposal.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{proposal.title}</h3>
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusIcon(proposal.status)}
                            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-300 mb-3 line-clamp-2">{proposal.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {proposal.created}
                          </span>
                          <span>by {proposal.author}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {proposal.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="lg:w-64 space-y-3">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">Yes: {proposal.yesVotes}%</span>
                            <span className="text-red-400">No: {proposal.noVotes}%</span>
                          </div>
                          <Progress value={proposal.yesVotes} className="bg-gray-700" />
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>{proposal.totalVotes} total votes</span>
                          <span>Completed</span>
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          <Link href={`/proposals/${proposal.id}`}>
                            View Results
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 