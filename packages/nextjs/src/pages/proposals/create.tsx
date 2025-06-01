"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield, Plus, Calendar, Users, CheckCircle } from "lucide-react"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSmartContracts } from '../../hooks/useSmartContracts'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import Link from "next/link"
import { useRouter } from 'next/router'

export default function CreateProposalPage() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { createProposal, isPending, isConfirming } = useSmartContracts()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    duration: 7 // days
  })

  const categories = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'academic', label: 'Academic' },
    { value: 'environment', label: 'Environment' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'technology', label: 'Technology' },
    { value: 'governance', label: 'Governance' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      await createProposal(formData.title, formData.description, formData.duration)
      toast.success('Proposal created successfully!')
      
      // Wait a moment then redirect
      setTimeout(() => {
        router.push('/proposals')
      }, 2000)
    } catch (error) {
      console.error('Create proposal error:', error)
      toast.error('Failed to create proposal')
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

            <div className="flex items-center space-x-6">
              <Link href="/" className="hover:text-[#00C4FF] transition-colors">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-[#00C4FF] transition-colors">
                Dashboard
              </Link>
              <Link href="/proposals" className="text-[#00C4FF]">
                Proposals
              </Link>
              <Link href="/verify" className="hover:text-[#00C4FF] transition-colors">
                Verify
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/proposals" 
            className="inline-flex items-center text-gray-400 hover:text-[#00C4FF] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Proposals
          </Link>
          
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#00C4FF] bg-clip-text text-transparent">
            Create New Proposal
          </h1>
          <p className="text-gray-400">
            Submit a proposal for the GTU DAO community to vote on
          </p>
        </div>

        {/* Wallet Connection Check */}
        {!isConnected && (
          <Card className="bg-gradient-to-br from-amber-900/20 to-amber-800/20 border-amber-600/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-400">Wallet Connection Required</h3>
                  <p className="text-sm text-amber-300/80">
                    You need to connect your wallet to create proposals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Creation Form */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Plus className="w-5 h-5 text-[#00C4FF]" />
              Proposal Details
            </CardTitle>
            <CardDescription className="text-gray-400">
              Provide clear and detailed information about your proposal
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Proposal Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Improve Campus WiFi Infrastructure"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                  disabled={isPending || isConfirming}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category *
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value: string) => handleInputChange('category', value)}
                  disabled={isPending || isConfirming}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.value} 
                        value={category.value}
                        className="text-white hover:bg-gray-700"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of your proposal, including the problem it solves, implementation plan, and expected benefits..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 min-h-[120px]"
                  disabled={isPending || isConfirming}
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white">
                  Voting Duration (Days) *
                </Label>
                <Select 
                  value={formData.duration.toString()} 
                  onValueChange={(value: string) => handleInputChange('duration', parseInt(value))}
                  disabled={isPending || isConfirming}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="3" className="text-white hover:bg-gray-700">3 Days</SelectItem>
                    <SelectItem value="7" className="text-white hover:bg-gray-700">7 Days (Recommended)</SelectItem>
                    <SelectItem value="14" className="text-white hover:bg-gray-700">14 Days</SelectItem>
                    <SelectItem value="30" className="text-white hover:bg-gray-700">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guidelines */}
              <Card className="bg-gray-800/30 border-gray-700">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-[#00C4FF] mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Proposal Guidelines
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Be clear and specific about what you're proposing</li>
                    <li>• Include implementation details and timeline</li>
                    <li>• Consider budget and resource requirements</li>
                    <li>• Explain how this benefits the GTU community</li>
                    <li>• Proposals require majority approval to pass</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => router.push('/proposals')}
                  disabled={isPending || isConfirming}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#00C4FF] to-[#0080CC] hover:from-[#0080CC] hover:to-[#00C4FF] text-white border-0"
                  disabled={!isConnected || isPending || isConfirming || !formData.title || !formData.description || !formData.category}
                >
                  {isPending || isConfirming ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isPending ? 'Creating...' : 'Confirming...'}
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Proposal
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-gray-900/30 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-blue-400">Voting Process</h3>
              </div>
              <p className="text-sm text-gray-300">
                Once submitted, community members can vote using their STAT tokens. 
                Voting power is weighted based on token balance and user role.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-green-400">Community Impact</h3>
              </div>
              <p className="text-sm text-gray-300">
                Successful proposals are implemented by the GTU DAO governance system. 
                All proposals are transparent and tracked on-chain.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 