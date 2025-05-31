import React from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const Admin = () => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Cog6ToothIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Erişimi</h2>
          <p className="text-gray-600 mb-8">Admin paneline erişmek için wallet bağlamanız gerekiyor.</p>
          <ConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-red-100">Yönetim ve moderasyon araçları</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <Cog6ToothIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Sistemi</h2>
        <p className="text-gray-600 mb-8">Yönetim paneli yakında aktif olacak.</p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Sadece yetkili kullanıcılar erişebilir!</p>
        </div>
      </div>
    </div>
  )
}

export default Admin 