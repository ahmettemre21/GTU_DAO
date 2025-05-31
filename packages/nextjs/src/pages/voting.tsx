import React from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChartBarIcon } from '@heroicons/react/24/outline'

const Voting = () => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oylama Erişimi</h2>
          <p className="text-gray-600 mb-8">Oylamalara erişmek için wallet bağlamanız gerekiyor.</p>
          <ConnectButton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Oylama</h1>
        <p className="text-green-100">Aktif oylamalarda oy kullanın</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Oylama Sistemi</h2>
        <p className="text-gray-600 mb-8">STAT token bazlı demokratik oylama sistemi yakında aktif olacak.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">Proposallar sayfasından aktif oylamalara katılabilirsiniz!</p>
        </div>
      </div>
    </div>
  )
}

export default Voting 