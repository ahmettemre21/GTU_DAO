import React from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

const Applications = () => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Başvuru Erişimi</h2>
          <p className="text-gray-600 mb-8">Başvurulara erişmek için wallet bağlamanız gerekiyor.</p>
          <ConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Başvurular</h1>
        <p className="text-purple-100">Kulüp pozisyonları ve başvuru süreçleri</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Başvuru Sistemi</h2>
        <p className="text-gray-600 mb-8">Kulüp pozisyonları için başvuru sistemi yakında aktif olacak.</p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-purple-800 font-medium">Core Team ve yönetim pozisyonları için başvuru sistemi geliştiriliyor!</p>
        </div>
      </div>
    </div>
  )
}

export default Applications 