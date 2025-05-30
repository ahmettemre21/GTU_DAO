import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { initMiniKit } from './lib/minikit';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Voting from './pages/Voting';
import Applications from './pages/Applications';
import AdminPanel from './pages/AdminPanel';
import KYCVerification from './pages/KYCVerification';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MiniKit'i başlat
    initMiniKit();
    
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
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-dao-blue mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">GTU DAO</h2>
          <p className="text-gray-600">Sistem yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
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
  );
}

export default App;
