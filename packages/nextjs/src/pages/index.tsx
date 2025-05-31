"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, Vote, Wallet, Zap, Globe, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/layout/Navigation"

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0B0E12] text-[#F3F4F6] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300C4FF' fillOpacity='0.1'%3E%3Cpath d='M30 30l15-8.66v17.32L30 30zm0 0L15 21.34v17.32L30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-[#00C4FF]/20 text-[#00C4FF] border-[#00C4FF]/30">
              Decentralized Student Governance
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#00C4FF] to-white bg-clip-text text-transparent">
              Shape Your University's Future
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join GTU DAO - the first on-chain student governance platform. Vote on proposals, earn STAT tokens, and
              build the future of decentralized education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF] text-white border-0 text-lg px-8"
                asChild
              >
                <Link href="/proposals">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Platform
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-[#00C4FF] text-[#00C4FF] hover:bg-[#00C4FF]/10 text-lg px-8"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </div>

            {/* STAT Token Explanation */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#00C4FF]">STAT Token System</h3>
                <p className="text-gray-300">
                  Earn reputation-based STAT tokens through participation. Your voting power increases with your
                  contribution to the community - no financial investment required.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-[#00C4FF] bg-clip-text text-transparent">
              Platform Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-[#00C4FF]/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Vote className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#00C4FF]">Weighted Voting</h3>
                  <p className="text-gray-300">
                    Your vote carries weight based on your STAT token balance and role within the organization.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-[#00C4FF]/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#00C4FF]">Role-Based Access</h3>
                  <p className="text-gray-300">
                    Different dashboards and permissions for Executive, Core Team, and General Members.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-[#00C4FF]/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#00C4FF]">World ID Verification</h3>
                  <p className="text-gray-300">
                    Secure identity verification ensures one person, one vote while maintaining privacy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-[#00C4FF] bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">Join the future of student governance today</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF] text-white border-0 text-lg px-8"
              >
                <Link href="/proposals">
                  View Proposals
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#00C4FF] text-[#00C4FF] hover:bg-[#00C4FF]/10 text-lg px-8"
              >
                <Link href="/kyc">
                  Verify Identity
                  <Shield className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#00C4FF]" />
        </div>
      </div>
    </>
  )
} 