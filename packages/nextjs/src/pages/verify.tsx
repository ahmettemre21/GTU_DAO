"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, Globe, Smartphone, Eye, Lock, ArrowRight, Zap } from "lucide-react"
import { Navigation } from "@/components/layout/Navigation"

export default function VerifyIdentity() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isVerified, setIsVerified] = useState(false)

  const steps = [
    {
      id: 1,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to get started",
      icon: Lock,
      completed: true,
    },
    {
      id: 2,
      title: "World ID Verification",
      description: "Verify your identity using World ID",
      icon: Globe,
      completed: false,
    },
    {
      id: 3,
      title: "Biometric Scan",
      description: "Complete biometric verification",
      icon: Eye,
      completed: false,
    },
    {
      id: 4,
      title: "Mobile Verification",
      description: "Verify using your mobile device",
      icon: Smartphone,
      completed: false,
    },
  ]

  const handleVerification = () => {
    // Simulate verification process
    setIsVerified(true)
    setCurrentStep(5)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0B0E12] text-[#F3F4F6]">
        {/* Header */}
        <div className="border-b border-gray-800/50 bg-gray-900/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#00C4FF] bg-clip-text text-transparent mb-2">
                Identity Verification
              </h1>
              <p className="text-gray-400">Secure your account and enable voting with World ID verification</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {!isVerified ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Verification Progress</span>
                  <span className="text-sm text-[#00C4FF]">Step {currentStep} of 4</span>
                </div>
                <Progress value={(currentStep / 4) * 100} className="h-2" />
              </div>

              {/* Steps */}
              <div className="grid gap-6 mb-8">
                {steps.map((step) => (
                  <Card
                    key={step.id}
                    className={`bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-300 ${
                      step.id === currentStep ? "border-[#00C4FF]/50 bg-[#00C4FF]/5" : ""
                    } ${step.completed ? "border-green-500/50 bg-green-500/5" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            step.completed
                              ? "bg-green-500/20 text-green-400"
                              : step.id === currentStep
                                ? "bg-[#00C4FF]/20 text-[#00C4FF]"
                                : "bg-gray-700/50 text-gray-400"
                          }`}
                        >
                          {step.completed ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{step.title}</h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                        {step.id === currentStep && !step.completed && (
                          <Badge className="bg-[#00C4FF]/20 text-[#00C4FF] border-[#00C4FF]/30">Current</Badge>
                        )}
                        {step.completed && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Current Step Content */}
              {currentStep === 1 && (
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#00C4FF] flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Connect Your Wallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300">
                      Connect your Web3 wallet to begin the verification process. This ensures secure authentication and
                      enables blockchain-based voting.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        className="h-16 bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]"
                        onClick={() => setCurrentStep(2)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <Lock className="w-4 h-4" />
                          </div>
                          <span>Connect Wallet</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16 border-gray-600 hover:border-[#00C4FF]">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <span>WalletConnect</span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#00C4FF] flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      World ID Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#00C4FF] to-[#0080CC] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Verify with World ID</h3>
                      <p className="text-gray-400 mb-6">
                        Use World ID to prove you're a unique human without revealing your identity
                      </p>
                    </div>

                    <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-400 mb-1">Privacy Protected</h4>
                          <p className="text-sm text-gray-300">
                            World ID uses zero-knowledge proofs to verify your humanity while keeping your personal
                            information private.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full h-12 bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]"
                      onClick={() => setCurrentStep(3)}
                    >
                      Start World ID Verification
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 3 && (
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#00C4FF] flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Biometric Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Biometric Scan</h3>
                      <p className="text-gray-400 mb-6">
                        Complete the biometric verification to ensure account security
                      </p>
                    </div>

                    <Button
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      onClick={() => setCurrentStep(4)}
                    >
                      Start Biometric Scan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {currentStep === 4 && (
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#00C4FF] flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      Mobile Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Mobile Device Verification</h3>
                      <p className="text-gray-400 mb-6">
                        Complete the final step using your mobile device
                      </p>
                    </div>

                    <Button
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      onClick={handleVerification}
                    >
                      Complete Verification
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Verification Complete!</h2>
                <p className="text-gray-300 mb-6">
                  Your identity has been successfully verified. You can now participate in governance voting.
                </p>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge className="bg-[#00C4FF]/20 text-[#00C4FF] border-[#00C4FF]/30">
                    <Zap className="w-3 h-3 mr-1" />
                    +100 STAT Bonus
                  </Badge>
                </div>
                <Button className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF]">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
} 