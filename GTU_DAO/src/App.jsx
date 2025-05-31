import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';

// Blockchain configuration
import { config, queryClient } from './config/blockchain';
import { worldcoinService } from './lib/worldcoin';
import { vlayerService } from './lib/vlayer';
import { blockscoutService } from './lib/blockscout';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Voting from './pages/Voting';
import Applications from './pages/Applications';
import AdminPanel from './pages/AdminPanel';
import KYCVerification from './pages/KYCVerification';

// Import CSS for RainbowKit
import '@rainbow-me/rainbowkit/styles.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blockchainInitialized, setBlockchainInitialized] = useState(false);

  useEffect(() => {
    // Initialize all ETH Prague prize pool integrations
    const initializeBlockchainServices = async () => {
      try {
        console.log('Initializing ETH Prague blockchain integrations...');
        
        // 1. World App ($10k) - MiniKit initialization
        await worldcoinService.initialize();
        
        // 2. vlayer ($10k) - Zero-knowledge proof initialization
        await vlayerService.initialize();
        
        // 3. Blockscout ($20k) - Block explorer WebSocket connection
        blockscoutService.connectWebSocket();
        
        setBlockchainInitialized(true);
        console.log('All ETH Prague integrations initialized successfully');
      } catch (error) {
        console.error('Failed to initialize blockchain services:', error);
      }
    };

    initializeBlockchainServices();
    
    // Demo kullanıcı verisi (geliştirme için)
    setTimeout(() => {
      setUser({
        id: 'demo-user-1',
        name: 'Ahmet Emre Yavuz',
        email: 'ahmet@gtu.edu.tr',
        walletAddress: '0x742d35Cc6634C0532925a3b8D34E1C7C796F5032',
        role: 'MEMBER',
        kycStatus: 'APPROVED',
        verified: true,
        worldIdVerified: false,
        zkProofGenerated: false,
        blockscoutTracked: true
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading || !blockchainInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-dao-blue mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">GTU DAO</h2>
          <p className="text-gray-600">Blockchain servisleri başlatılıyor...</p>
          <div className="mt-4 space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>World App MiniKit (ETH Prague $10k)</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>vlayer Zero-Knowledge (ETH Prague $10k)</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Blockscout Explorer (ETH Prague $20k)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
              <Navbar user={user} setUser={setUser} />
              
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home user={user} />} />
                  <Route path="/dashboard" element={<Dashboard user={user} />} />
                  <Route path="/proposals" element={<Proposals user={user} />} />
                  <Route path="/voting" element={<Voting user={user} />} />
                  <Route path="/applications" element={<Applications user={user} />} />
                  <Route path="/admin" element={<AdminPanel user={user} />} />
                  <Route path="/kyc" element={<KYCVerification user={user} setUser={setUser} />} />
                </Routes>
              </main>
              
              <Toaster 
                position="top-right"
                toastOptions={{
                  className: 'bg-white shadow-lg border border-gray-200',
                  duration: 4000,
                }}
              />
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
