"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, AlertCircle, Globe, Users, Zap, ArrowRight, Eye, Fingerprint } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from "next/link"

export default function VerifyIdentityPage() {
  const [verificationStep, setVerificationStep] = useState<"init" | "pending" | "verified" | "failed">("init")

  const handleWorldIDVerification = async () => {
    setVerificationStep("pending")
    
    // Simulate World ID verification process
    setTimeout(() => {
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.2 // 80% success rate
      setVerificationStep(success ? "verified" : "failed")
    }, 3000)
  }

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

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-[#00C4FF] transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-[#00C4FF] transition-colors">
                Dashboard
              </Link>
              <Link href="/proposals" className="hover:text-[#00C4FF] transition-colors">
                Proposals
              </Link>
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
            🌍 World ID Integration - ETH Prague 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-300 to-[#00C4FF] bg-clip-text text-transparent">
            Verify Your Identity
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Use World ID to securely verify your identity and unlock full DAO participation while maintaining your privacy.
          </p>
        </div>

        {/* Verification Status */}
        {verificationStep === "init" && (
          <div className="space-y-8">
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">Privacy Preserved</h3>
                  <p className="text-gray-400 text-sm">
                    Zero-knowledge proofs ensure your personal data stays private while proving your humanity.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Fingerprint className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#00C4FF]">Sybil Resistance</h3>
                  <p className="text-gray-400 text-sm">
                    Prevents multiple accounts and ensures one person, one vote in governance decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-green-400">Instant Access</h3>
                  <p className="text-gray-400 text-sm">
                    Gain immediate access to voting, proposals, and all DAO governance features.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Verification Card */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Ready to Verify with World ID?
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    Click the button below to start the secure verification process. You'll be redirected to World ID
                    where you can verify your identity using biometric authentication.
                  </p>

                  <div className="space-y-4">
                    <Button
                      onClick={handleWorldIDVerification}
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 text-lg py-3"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Verify with World ID
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-sm text-gray-400">
                      This process is secure, private, and takes less than 30 seconds
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-center text-white">How World ID Verification Works</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-[#00C4FF] rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">
                      1
                    </div>
                    <h4 className="font-semibold mb-2 text-[#00C4FF]">Biometric Scan</h4>
                    <p className="text-sm text-gray-400">
                      Use your device's camera for a quick iris scan or facial recognition
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 bg-[#00C4FF] rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">
                      2
                    </div>
                    <h4 className="font-semibold mb-2 text-[#00C4FF]">Zero-Knowledge Proof</h4>
                    <p className="text-sm text-gray-400">
                      Generate a cryptographic proof of your humanity without revealing personal data
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-10 h-10 bg-[#00C4FF] rounded-full flex items-center justify-center text-white font-bold mb-3 mx-auto">
                      3
                    </div>
                    <h4 className="font-semibold mb-2 text-[#00C4FF]">Verification Complete</h4>
                    <p className="text-sm text-gray-400">
                      Get verified instantly and unlock full DAO participation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {verificationStep === "pending" && (
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-full flex items-center justify-center mb-6 mx-auto animate-pulse">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Verifying Your Identity...
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Please complete the verification process in the World ID window. This may take a few moments.
                </p>

                <div className="space-y-4">
                  <Progress value={65} className="bg-gray-700" />
                  <p className="text-sm text-gray-400">
                    Processing biometric data and generating zero-knowledge proof...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {verificationStep === "verified" && (
          <Card className="bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-600/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Verification Successful! 🎉
                </h2>
                
                <p className="text-gray-300 mb-6">
                  Your identity has been successfully verified with World ID. You now have full access to GTU DAO
                  governance features.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <Users className="w-6 h-6 text-green-400 mb-2 mx-auto" />
                    <p className="text-sm font-medium text-green-400">Voting Rights</p>
                    <p className="text-xs text-gray-400">Unlocked</p>
                  </div>

                  <div className="bg-gray-900/30 rounded-lg p-4">
                    <Zap className="w-6 h-6 text-green-400 mb-2 mx-auto" />
                    <p className="text-sm font-medium text-green-400">STAT Tokens</p>
                    <p className="text-xs text-gray-400">Earning Enabled</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF] text-white border-0 text-lg"
                  >
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    <Link href="/proposals">
                      View Proposals
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {verificationStep === "failed" && (
          <Card className="bg-gradient-to-br from-red-900/30 to-red-800/30 border-red-600/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <AlertCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Verification Failed
                </h2>
                
                <p className="text-gray-300 mb-6">
                  We couldn't verify your identity at this time. This might be due to a technical issue or network problem.
                  Please try again.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => setVerificationStep("init")}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 text-lg"
                  >
                    Try Again
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Link href="/">
                      Return Home
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ETH Prague 2025 Info */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-600/30 backdrop-blur-sm mt-12">
          <CardContent className="p-6">
            <div className="text-center">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                ETH Prague 2025 - $10,000 World ID Prize Pool
              </Badge>
              <h3 className="text-xl font-semibold mb-2 text-purple-300">World ID Integration</h3>
              <p className="text-gray-300 text-sm">
                This implementation showcases World ID's privacy-preserving identity verification in a DAO governance context,
                competing for the $10,000 World ID prize track at ETH Prague 2025.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 