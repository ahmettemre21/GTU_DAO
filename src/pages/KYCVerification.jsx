import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const KYCVerification = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [verificationStatus, setVerificationStatus] = useState({
    worldID: false,
    zkProof: false,
    blockscoutTracked: false
  })
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data
  const user = {
    name: 'Demo User',
    email: 'demo@gtu.edu.tr',
    walletAddress: '0x742d35Cc6634C0532925a3b8D34E1C7C796F5032',
    role: 'MEMBER',
    kycStatus: 'PENDING'
  }

  const steps = [
    {
      id: 1,
      title: 'World ID Verification',
      description: 'World App MiniKit ile kimlik doğrulama (ETH Prague $10k)',
      icon: GlobeAltIcon,
      color: 'text-green-600 bg-green-100',
      status: verificationStatus.worldID ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: 'Zero-Knowledge Proof',
      description: 'vlayer ile gizlilik korumalı doğrulama (ETH Prague $10k)',
      icon: LockClosedIcon,
      color: 'text-purple-600 bg-purple-100',
      status: verificationStatus.zkProof ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: 'Blockscout Tracking',
      description: 'Blockchain şeffaflığı için işlem kayıt (ETH Prague $20k)',
      icon: EyeIcon,
      color: 'text-blue-600 bg-blue-100',
      status: verificationStatus.blockscoutTracked ? 'completed' : 'pending'
    }
  ]

  // Mock verification functions
  const handleWorldIDVerification = async () => {
    setIsLoading(true)
    try {
      // Simulate World ID verification delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setVerificationStatus(prev => ({ ...prev, worldID: true }))
      setCurrentStep(2)
      toast.success('World ID doğrulaması başarılı! 🌍')
    } catch (error) {
      toast.error('World ID doğrulaması başarısız')
    } finally {
      setIsLoading(false)
    }
  }

  const handleZKProofGeneration = async () => {
    setIsLoading(true)
    try {
      // Simulate ZK proof generation delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setVerificationStatus(prev => ({ ...prev, zkProof: true }))
      setCurrentStep(3)
      toast.success('Zero-knowledge proof oluşturuldu! 🔒')
    } catch (error) {
      toast.error('ZK proof oluşturulamadı')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlockscoutTracking = async () => {
    setIsLoading(true)
    try {
      // Simulate Blockscout registration delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setVerificationStatus(prev => ({ ...prev, blockscoutTracked: true }))
      toast.success('Blockscout tracking aktifleştirildi! 🔍')
    } catch (error) {
      toast.error('Blockscout tracking başarısız')
    } finally {
      setIsLoading(false)
    }
  }

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  const allStepsCompleted = Object.values(verificationStatus).every(status => status)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          KYC Verification System
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          ETH Prague 2025 entegrasyonları ile kapsamlı kimlik doğrulama
        </p>
        
        {/* ETH Prague Badge */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 inline-block mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-bold text-lg text-gray-900">ETH Prague 2025</div>
              <div className="text-sm text-gray-600">Total Prize Pool: $40,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Kullanıcı Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
            <div className="text-gray-900">{user.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="text-gray-900">{user.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
            <div className="text-gray-900 font-mono text-sm">
              {user.walletAddress?.slice(0, 10)}...{user.walletAddress?.slice(-8)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Doğrulama Adımları</h2>
        
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const stepStatus = getStepStatus(step.id)
            
            return (
              <div key={step.id} className="flex items-start space-x-4">
                {/* Step Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                  stepStatus === 'completed' ? 'bg-green-100 text-green-600' :
                  stepStatus === 'current' ? step.color :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {stepStatus === 'completed' ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : stepStatus === 'current' && isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-medium ${
                        stepStatus === 'completed' ? 'text-green-600' :
                        stepStatus === 'current' ? 'text-gray-900' :
                        'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                    </div>

                    {/* Step Action */}
                    <div className="ml-4">
                      {stepStatus === 'completed' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Tamamlandı
                        </span>
                      ) : stepStatus === 'current' ? (
                        <button
                          onClick={() => {
                            if (step.id === 1) handleWorldIDVerification()
                            else if (step.id === 2) handleZKProofGeneration()
                            else if (step.id === 3) handleBlockscoutTracking()
                          }}
                          disabled={isLoading}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                            isLoading 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-700'
                          } transition-colors`}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              İşleniyor...
                            </>
                          ) : (
                            'Başlat'
                          )}
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-500">
                          Bekliyor
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Step Details */}
                  {stepStatus === 'current' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      {step.id === 1 && (
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-2">World ID ile doğrulama:</p>
                          <ul className="space-y-1 text-blue-700">
                            <li>• Unique human verification</li>
                            <li>• Sybil attack protection</li>
                            <li>• ORB or Device level verification</li>
                            <li>• MiniKit integration demo</li>
                          </ul>
                        </div>
                      )}
                      {step.id === 2 && (
                        <div className="text-sm text-purple-800">
                          <p className="font-medium mb-2">Zero-knowledge proof oluşturma:</p>
                          <ul className="space-y-1 text-purple-700">
                            <li>• Privacy-preserving verification</li>
                            <li>• vlayer protocol integration</li>
                            <li>• Anonymous voting capability</li>
                            <li>• ZK-SNARK proof generation</li>
                          </ul>
                        </div>
                      )}
                      {step.id === 3 && (
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-2">Blockscout tracking:</p>
                          <ul className="space-y-1 text-blue-700">
                            <li>• Transaction transparency</li>
                            <li>• Enhanced block explorer</li>
                            <li>• Real-time monitoring</li>
                            <li>• Detailed analytics</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Completion Status */}
      {allStepsCompleted && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                🎉 KYC Doğrulaması Tamamlandı!
              </h3>
              <p className="text-green-700 mt-1">
                Tüm ETH Prague 2025 entegrasyonları başarıyla aktifleştirildi. 
                Artık DAO'da tam yetkilerle katılım sağlayabilirsiniz.
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Dashboard'a Git
            </button>
            <button className="bg-white text-green-600 border border-green-300 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors">
              Doğrulama Sertifikası İndir
            </button>
          </div>
        </div>
      )}

      {/* ETH Prague Integration Details */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ETH Prague 2025 Integration Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-medium text-gray-900">World App</div>
            <div className="text-sm text-gray-600">$10k Prize Pool</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-medium text-gray-900">vlayer</div>
            <div className="text-sm text-gray-600">$10k Prize Pool</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-medium text-gray-900">Blockscout</div>
            <div className="text-sm text-gray-600">$20k Prize Pool</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KYCVerification 