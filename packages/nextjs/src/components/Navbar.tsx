import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { address, isConnected } = useAccount()

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: '🏠' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Proposals', href: '/proposals', icon: '📋' },
    { name: 'Voting', href: '/voting', icon: '🗳️' },
    { name: 'Applications', href: '/applications', icon: '📝' },
    { name: 'KYC Verification', href: '/kyc', icon: '🔐' },
    { name: 'Admin Panel', href: '/admin', icon: '⚙️' }
  ]

  const isActive = (path: string) => router.pathname === path

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-sm">GTU</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  GTU DAO
                </div>
                <div className="text-xs text-gray-500 font-medium">ETH Prague 2025</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Wallet Connection & User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* ETH Prague Badge */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 px-3 py-2 rounded-full hover:shadow-md transition-shadow duration-200">
              <span className="text-xs font-bold text-orange-700">🏆 $40k Prize Pool</span>
            </div>

            {/* RainbowKit Connect Button */}
            <div className="flex items-center">
              <ConnectButton 
                chainStatus="icon"
                accountStatus={{
                  smallScreen: 'avatar',
                  largeScreen: 'full',
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </div>

            {/* Connected Wallet Info */}
            {isConnected && (
              <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-xl border border-green-200 hover:shadow-md transition-shadow duration-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">GTU Üyesi</div>
                  <div className="text-xs text-gray-500">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Connect Button */}
            <ConnectButton 
              chainStatus="icon"
              accountStatus="avatar"
              showBalance={false}
            />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile User Info */}
            {isConnected && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-4 py-3 bg-green-50 rounded-xl mx-2">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-semibold text-gray-800">GTU Üyesi</div>
                    <div className="text-sm text-gray-500">Wallet Bağlı</div>
                    <div className="text-xs text-gray-400 font-mono">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile ETH Prague Badge */}
            <div className="mx-2 mt-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 px-4 py-3 rounded-xl text-center">
                <span className="text-sm font-bold text-orange-700">
                  🏆 ETH Prague 2025 • $40k Prize Pool
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 