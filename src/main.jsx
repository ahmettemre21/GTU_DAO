import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

import { config } from './config/wagmi.js'

// React Query client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#3B82F6', // GTU mavi rengi
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          locale="en" // Türkçe için 'tr' kullanabilirsiniz
        >
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
