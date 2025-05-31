import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import contractService from '../services/contractService'

const Proposals = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [networkInfo] = useState(contractService.getNetworkInfo())

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'governance',
    proposalType: 0,
    duration: 7 * 24 * 60 * 60 // 7 days in seconds
  })

  useEffect(() => {
    initializePage()
  }, [])

  const initializePage = async () => {
    try {
      // Check if already connected
      if (window.ethereum && window.ethereum.selectedAddress) {
        const result = await contractService.connectWallet()
        if (result.success) {
          setIsConnected(true)
          setUserAddress(result.address)
        }
      }
      
      await loadProposals()
    } catch (error) {
      console.error('Page initialization error:', error)
    }
    setLoading(false)
  }

  const loadProposals = async () => {
    try {
      const allProposals = await contractService.getAllProposals()
      setProposals(allProposals.reverse()) // Show newest first
    } catch (error) {
      console.error('Error loading proposals:', error)
    }
  }

  const connectWallet = async () => {
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
  }

  const handleCreateProposal = async (e) => {
    e.preventDefault()
    
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!newProposal.title.trim() || !newProposal.description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setCreating(true)
    
    try {
      const loadingToast = toast.loading('Creating proposal on blockchain...')
      
      const result = await contractService.createProposal(
        newProposal.title,
        newProposal.description,
        newProposal.category,
        newProposal.proposalType,
        newProposal.duration
      )

      toast.dismiss(loadingToast)

      if (result.success) {
        toast.success(`🎉 Proposal created! ID: ${result.proposalId}`)
        
        // Reset form
        setNewProposal({
          title: '',
          description: '',
          category: 'governance',
          proposalType: 0,
          duration: 7 * 24 * 60 * 60
        })
        setShowCreateForm(false)
        
        // Reload proposals
        await loadProposals()
      } else {
        toast.error('❌ ' + result.error)
      }
    } catch (error) {
      toast.error('❌ Failed to create proposal')
      console.error('Create proposal error:', error)
    }
    
    setCreating(false)
  }

  const openExplorer = (txHash) => {
    window.open(`${networkInfo.explorerUrl}/tx/${txHash}`, '_blank')
  }

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Recently'
    const now = Date.now() / 1000
    const diff = now - timestamp
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  const formatDeadline = (deadline) => {
    if (!deadline) return 'No deadline'
    const now = Date.now() / 1000
    const timeLeft = deadline - now
    
    if (timeLeft <= 0) return 'Expired'
    
    const days = Math.floor(timeLeft / 86400)
    const hours = Math.floor((timeLeft % 86400) / 3600)
    
    if (days > 0) return `${days}d ${hours}h left`
    return `${hours}h left`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 0: return 'bg-blue-100 text-blue-800 border-blue-200' // Active
      case 1: return 'bg-green-100 text-green-800 border-green-200' // Approved
      case 2: return 'bg-red-100 text-red-800 border-red-200' // Rejected
      case 3: return 'bg-purple-100 text-purple-800 border-purple-200' // Executed
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 0: return 'Active'
      case 1: return 'Approved'
      case 2: return 'Rejected'
      case 3: return 'Executed'
      default: return 'Unknown'
    }
  }

  const getProposalTypeText = (type) => {
    switch (type) {
      case 0: return 'General'
      case 1: return 'Funding'
      case 2: return 'Technical'
      case 3: return 'ETH Prague'
      default: return 'Other'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'governance': return TrophyIcon
      case 'technical': return SparklesIcon
      case 'funding': return DocumentTextIcon
      default: return TagIcon
    }
  }

  const proposalCategories = [
    { value: 'governance', label: 'Governance', icon: TrophyIcon },
    { value: 'technical', label: 'Technical', icon: SparklesIcon },
    { value: 'funding', label: 'Funding', icon: DocumentTextIcon },
    { value: 'community', label: 'Community', icon: UserIcon },
    { value: 'eth-prague', label: 'ETH Prague', icon: TrophyIcon }
  ]

  const proposalTypes = [
    { value: 0, label: 'General Proposal' },
    { value: 1, label: 'Funding Request' },
    { value: 2, label: 'Technical Upgrade' },
    { value: 3, label: 'ETH Prague Integration' }
  ]

  const durationOptions = [
    { value: 3 * 24 * 60 * 60, label: '3 Days' },
    { value: 7 * 24 * 60 * 60, label: '1 Week' },
    { value: 14 * 24 * 60 * 60, label: '2 Weeks' },
    { value: 30 * 24 * 60 * 60, label: '1 Month' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Proposals...</p>
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
                  Governance Proposals
                </h1>
                <p className="text-gray-600">
                  Create and vote on proposals to shape the future of GTU DAO
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
                  <>
                    <div className="bg-green-100 border border-green-200 rounded-lg px-4 py-2 text-green-800 text-sm font-medium">
                      <div className="flex items-center">
                        <CheckBadgeIcon className="w-5 h-5 mr-2" />
                        {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Create Proposal
                      </div>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Proposal Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Proposal</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreateProposal} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proposal Title *
                    </label>
                    <input
                      type="text"
                      value={newProposal.title}
                      onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                      placeholder="Enter a clear and concise title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={newProposal.description}
                      onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                      placeholder="Provide detailed information about your proposal"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Category and Type */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newProposal.category}
                        onChange={(e) => setNewProposal({ ...newProposal, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {proposalCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={newProposal.proposalType}
                        onChange={(e) => setNewProposal({ ...newProposal, proposalType: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {proposalTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voting Duration
                    </label>
                    <select
                      value={newProposal.duration}
                      onChange={(e) => setNewProposal({ ...newProposal, duration: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {durationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold disabled:opacity-50 transition-all duration-200"
                    >
                      {creating ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        'Create Proposal'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Proposals List */}
        <div className="space-y-6">
          {proposals.length > 0 ? (
            proposals.map((proposal) => {
              const CategoryIcon = getCategoryIcon(proposal.category)
              return (
                <div key={proposal.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Main Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <CategoryIcon className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 truncate">
                              {proposal.title}
                            </h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                              {getStatusText(proposal.status)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {proposal.description}
                          </p>
                          
                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <UserIcon className="w-4 h-4 mr-1" />
                              {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                            </div>
                            <div className="flex items-center">
                              <TagIcon className="w-4 h-4 mr-1" />
                              {proposal.category}
                            </div>
                            <div className="flex items-center">
                              <SparklesIcon className="w-4 h-4 mr-1" />
                              {getProposalTypeText(proposal.proposalType)}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              Created {formatTimeAgo(proposal.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Voting Info */}
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-600">Voting Status</span>
                          <span className="text-xs text-gray-500">
                            {formatDeadline(proposal.deadline)}
                          </span>
                        </div>
                        
                        {/* Vote Progress */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-600 font-medium">
                              Yes: {parseFloat(proposal.yesVotes).toFixed(2)}
                            </span>
                            <span className="text-red-600 font-medium">
                              No: {parseFloat(proposal.noVotes).toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${proposal.yesVotes + proposal.noVotes > 0 
                                  ? (proposal.yesVotes / (parseFloat(proposal.yesVotes) + parseFloat(proposal.noVotes))) * 100 
                                  : 0}%` 
                              }}
                            ></div>
                          </div>
                          
                          <div className="text-xs text-gray-500 text-center">
                            Total: {parseFloat(proposal.totalVotingPower).toFixed(2)} voting power
                          </div>
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                          View Details & Vote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Proposals Yet</h3>
              <p className="text-gray-600 mb-6">
                Be the first to create a proposal and shape the future of GTU DAO!
              </p>
              {isConnected ? (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Create First Proposal
                  </div>
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Connect Wallet to Create
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Proposals 