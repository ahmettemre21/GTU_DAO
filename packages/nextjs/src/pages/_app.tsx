import React from 'react'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import '@rainbow-me/rainbowkit/styles.css'
import '../styles/globals.css'

// Wagmi ve RainbowKit konfigürasyonu
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia, rootstock } from 'wagmi/chains'

const config = getDefaultConfig({
  appName: 'GTU DAO',
  projectId: 'YOUR_PROJECT_ID', // WalletConnect Project ID
  chains: [sepolia, rootstock],
  ssr: false,
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-[#0B0E12] text-[#F3F4F6]">
            <Component {...pageProps} />

            {/* Toast Notifications - Dark Theme */}
            <Toaster
              position="top-right"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 4000,
                style: {
                  background: '#1F2937',
                  color: '#F3F4F6',
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                },

                // Custom styling per toast type
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                  style: {
                    background: '#064E3B',
                    border: '1px solid #10B981',
                    color: '#D1FAE5',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                  style: {
                    background: '#7F1D1D',
                    border: '1px solid #EF4444',
                    color: '#FEE2E2',
                  },
                },
                loading: {
                  iconTheme: {
                    primary: '#00C4FF',
                    secondary: '#fff',
                  },
                  style: {
                    background: '#0B4F71',
                    border: '1px solid #00C4FF',
                    color: '#DBEAFE',
                  },
                },
              }}
            />

            {/* ETH Prague 2025 Badge - Updated for Dark Theme */}
            <div className="fixed bottom-4 right-4 z-50">
              <div className="bg-gradient-to-r from-[#00C4FF] to-[#0080CC] text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10">
                <div className="text-xs font-semibold">ETH Prague 2025</div>
                <div className="text-sm font-medium">$40k Prize Pool 🏆</div>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default MyApp 