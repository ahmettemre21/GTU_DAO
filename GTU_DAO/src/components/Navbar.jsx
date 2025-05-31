import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Mock user data for demo
  const user = {
    name: 'Demo User',
    email: 'demo@gtu.edu.tr',
    role: 'MEMBER',
    isConnected: true
  }

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: '🏠' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Proposals', href: '/proposals', icon: '📋' },
    { name: 'Voting', href: '/voting', icon: '🗳️' },
    { name: 'Applications', href: '/applications', icon: '📝' },
    { name: 'KYC Verification', href: '/kyc', icon: '🔐' },
    { name: 'Admin Panel', href: '/admin', icon: '⚙️' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GTU</span>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">GTU DAO</div>
                <div className="text-xs text-gray-500">ETH Prague 2025</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* ETH Prague Badge */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-purple-700">🏆 $40k Prize Pool</span>
            </div>

            {/* Mock Wallet Connection */}
            <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">Demo Mode</div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile User Info */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center px-3 py-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">Demo Mode</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 