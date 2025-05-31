// Mock MiniKit implementation for development
// Bu dosya gerçek World MiniKit entegrasyonu için hazırlanmıştır

// MiniKit konfigürasyonu (mock)
export const initMiniKit = () => {
  if (typeof window !== 'undefined') {
    console.log('GTU DAO MiniKit initialized (mock mode)');
    // Gerçek implementasyon:
    // MiniKit.init({
    //   app: {
    //     name: 'GTU DAO',
    //     description: 'GTÜ Blockchain Kulübü DAO Yönetişim Sistemi',
    //     logo: '/logo.png',
    //   },
    //   enablePayments: true,
    //   signInWithWorldID: true,
    // });
  }
};

// World ID doğrulama fonksiyonu (mock)
export const verifyWithWorldID = async () => {
  try {
    // Mock doğrulama - gerçek implementasyon için World MiniKit gerekli
    console.log('World ID verification started (mock)');
    
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success response
    return {
      success: true,
      proof: 'mock_proof_' + Date.now(),
      nullifierHash: 'mock_nullifier_' + Date.now(),
    };
  } catch (error) {
    console.error('World ID verification failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Ödeme işlemi (mock)
export const makePayment = async (to, amount, description) => {
  try {
    console.log('Payment initiated (mock):', { to, amount, description });
    
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      txHash: 'mock_tx_' + Date.now(),
    };
  } catch (error) {
    console.error('Payment failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Wallet adresini al (mock)
export const getWalletAddress = () => {
  return '0x742d35Cc6634C0532925a3b8D34E1C7C796F5032'; // Mock address
};

// Kullanıcı bilgilerini al (mock)
export const getUserInfo = () => {
  return {
    wallet_address: '0x742d35Cc6634C0532925a3b8D34E1C7C796F5032',
    verified: true,
  };
}; 