import React from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const KYC = () => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShieldCheckIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">KYC Erişimi</h2>
          <p className="text-gray-600 mb-8">KYC doğrulamasına erişmek için wallet bağlamanız gerekiyor.</p>
          <ConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">KYC Verification</h1>
        <p className="text-green-100">World ID ile kimlik doğrulama</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <GlobeAltIcon className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">World ID Doğrulama</h2>
          </div>
          <p className="text-gray-600 mb-6">
            World ID ile kimliğinizi doğrulayarak GTU DAO'da oy hakkı kazanın. 
            Bu işlem tek seferlik olup, benzersizliğinizi garanti eder.
          </p>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
            World ID ile Doğrula
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Doğrulama Durumu</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-800 font-medium">World ID Doğrulaması</span>
              <span className="text-yellow-600 text-sm">Beklemede</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-gray-800 font-medium">STAT Token Eligibility</span>
              <span className="text-gray-600 text-sm">Doğrulama Sonrası</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">ETH Prague 2025 - World ID Integration</h3>
        <p className="text-blue-800 mb-4">
          Bu proje ETH Prague 2025 hackathonu kapsamında World ID entegrasyonu ile geliştirilmiştir. 
          $10,000 ödül kategorisi için World App MiniKit SDK kullanılmaktadır.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">🌍 World ID</h4>
            <p className="text-sm text-gray-600">Orb & Device verification</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">💰 WLD Payments</h4>
            <p className="text-sm text-gray-600">USDC & WLD support</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">📱 MiniApp</h4>
            <p className="text-sm text-gray-600">Native mobile experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KYC 