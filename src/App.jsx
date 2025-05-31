import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Components
import Navbar from './components/Navbar'

// Pages  
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Proposals from './pages/Proposals'
import Voting from './pages/Voting'
import Applications from './pages/Applications'
import KYCVerification from './pages/KYCVerification'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/kyc" element={<KYCVerification />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
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
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },

            // Custom styling per toast type
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
              style: {
                background: '#10B981',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
              style: {
                background: '#EF4444',
              },
            },
            loading: {
              iconTheme: {
                primary: '#6366F1',
                secondary: '#fff',
              },
              style: {
                background: '#6366F1',
              },
            },
          }}
        />

        {/* ETH Prague 2025 Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="text-xs font-semibold">ETH Prague 2025</div>
            <div className="text-sm">$40k Prize Pool 🏆</div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
