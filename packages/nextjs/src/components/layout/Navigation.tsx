import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  HomeIcon, 
  ChartBarIcon, 
  DocumentTextIcon, 
  CheckBadgeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Ana Sayfa', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Teklifler', href: '/proposals', icon: DocumentTextIcon },
  { name: 'Oylama', href: '/voting', icon: CheckBadgeIcon },
  { name: 'Başvurular', href: '/applications', icon: UserGroupIcon },
  { name: 'KYC', href: '/kyc', icon: ShieldCheckIcon },
  { name: 'Yönetim', href: '/admin', icon: CogIcon },
];

export default function Navigation() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GTU</span>
              </div>
              <span className="text-xl font-bold text-gradient">GTU DAO</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-link ${isActiveRoute(item.href) ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2 inline" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Wallet Connect & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <ConnectButton />
              
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-link block w-full ${isActiveRoute(item.href) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3 inline" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  );
} 