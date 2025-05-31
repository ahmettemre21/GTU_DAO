import { useState, useEffect } from 'react';
import { ShieldCheckIcon, CheckCircleIcon, LinkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useAccount, useConnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWorldcoin } from '../lib/worldcoin';
import { useVlayer } from '../lib/vlayer';
import { useBlockscout } from '../lib/blockscout';
import { useSmartContracts } from '../hooks/useSmartContracts';
import toast from 'react-hot-toast';

const KYCVerification = ({ user, setUser }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [kycData, setKycData] = useState(null);
  const [zkProofGenerated, setZkProofGenerated] = useState(false);
  const [blockscoutTxHash, setBlockscoutTxHash] = useState(null);
  
  const { address, isConnected } = useAccount();
  const worldcoin = useWorldcoin();
  const vlayer = useVlayer();
  const blockscout = useBlockscout();
  const { contracts } = useSmartContracts();

  useEffect(() => {
    if (address && user) {
      setUser(prev => ({ ...prev, walletAddress: address }));
    }
  }, [address, setUser]);

  // ETH Prague Prize Pool Integration - Complete KYC Process
  const handleVerify = async () => {
    if (!isConnected) {
      toast.error('Lütfen önce cüzdanınızı bağlayın');
      return;
    }

    setIsVerifying(true);
    try {
      // 1. World App ($10k Prize Pool) - Identity Verification
      toast.loading('World ID doğrulaması yapılıyor...');
      const worldIdResult = await worldcoin.verify(address);
      
      if (!worldIdResult.success) {
        throw new Error('World ID doğrulaması başarısız: ' + worldIdResult.error);
      }

      setKycData(worldIdResult);
      toast.dismiss();
      toast.success('World ID doğrulaması başarılı!');

      // 2. vlayer ($10k Prize Pool) - Generate ZK Proof for KYC
      toast.loading('Zero-knowledge proof oluşturuluyor...');
      const zkProof = await vlayer.createKYCProof({
        address: address,
        verificationLevel: worldIdResult.verification_level,
        worldIdNullifier: worldIdResult.nullifier_hash,
        timestamp: Math.floor(Date.now() / 1000)
      });

      if (!zkProof.success) {
        throw new Error('ZK proof oluşturulamadı: ' + zkProof.error);
      }

      setZkProofGenerated(true);
      toast.dismiss();
      toast.success('Zero-knowledge proof oluşturuldu!');

      // 3. Verify ZK proof on-chain
      toast.loading('Blockchain\'de doğrulama yapılıyor...');
      const onChainVerification = await vlayer.verifyProof(
        zkProof.proof,
        zkProof.publicSignals,
        'kyc-verification'
      );

      if (!onChainVerification.success) {
        throw new Error('Blockchain doğrulaması başarısız');
      }

      setBlockscoutTxHash(onChainVerification.transactionHash);
      toast.dismiss();
      toast.success('Blockchain doğrulaması tamamlandı!');

      // 4. Update user status
      setUser(prev => ({ 
        ...prev, 
        kycStatus: 'APPROVED', 
        verified: true,
        worldIdVerified: true,
        zkProofGenerated: true,
        blockscoutTracked: true,
        worldIdNullifier: worldIdResult.nullifier_hash,
        zkProofHash: zkProof.proof,
        verificationTxHash: onChainVerification.transactionHash
      }));

      toast.success('KYC doğrulaması tamamen tamamlandı!');

    } catch (error) {
      console.error('KYC verification error:', error);
      toast.error('Doğrulama hatası: ' + error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  // Get Blockscout links for transparency
  const getBlockscoutUrl = (txHash) => {
    return blockscout.getTransactionUrl(txHash);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <ShieldCheckIcon className="w-16 h-16 text-dao-blue mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          KYC Doğrulama
          <span className="ml-2 text-sm bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded">
            ETH Prague 2025
          </span>
        </h1>
        <p className="text-gray-600">
          World App + vlayer + Blockscout entegrasyonu ile güvenli kimlik doğrulama
        </p>
      </div>

      {/* Wallet Connection */}
      {!isConnected && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Cüzdan Bağlantısı</h2>
          <p className="text-gray-600 mb-4">
            KYC işlemi için önce cüzdanınızı bağlamanız gerekmektedir.
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      )}

      {user?.kycStatus === 'APPROVED' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Success Status */}
          <div className="card text-center">
            <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Doğrulama Tamamlandı
            </h2>
            <p className="text-gray-600">
              KYC doğrulamanız başarıyla tamamlanmıştır.
            </p>
          </div>

          {/* World ID Status */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">World ID</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                $10k Prize Pool
              </span>
            </div>
            {user.worldIdVerified ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-sm">Doğrulandı</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Beklemede</span>
            )}
            {user.worldIdNullifier && (
              <p className="text-xs text-gray-500 mt-2 break-all">
                Nullifier: {user.worldIdNullifier.slice(0, 20)}...
              </p>
            )}
          </div>

          {/* vlayer ZK Proof Status */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">ZK Proof</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                vlayer $10k
              </span>
            </div>
            {user.zkProofGenerated ? (
              <div className="flex items-center space-x-2 text-blue-600">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-sm">Oluşturuldu</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Beklemede</span>
            )}
            {user.zkProofHash && (
              <p className="text-xs text-gray-500 mt-2 break-all">
                Proof: {user.zkProofHash.slice(0, 20)}...
              </p>
            )}
          </div>

          {/* Blockscout Tracking */}
          <div className="card md:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Blockchain Transparency</h3>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                Blockscout $20k
              </span>
            </div>
            {user.verificationTxHash ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-purple-600">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span className="text-sm">Blockchain\'de kaydedildi</span>
                </div>
                <a
                  href={getBlockscoutUrl(user.verificationTxHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 text-sm"
                >
                  <EyeIcon className="w-4 h-4" />
                  <span>İşlemi Görüntüle</span>
                  <LinkIcon className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Beklemede</span>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ETH Prague 2025 Entegrasyonlu KYC Doğrulama
            </h2>
            <p className="text-gray-600 mb-4">
              Bu KYC sistemi üç ETH Prague 2025 ödül kategorisini birleştiriyor:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* World App */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-green-900">World App</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    $10k
                  </span>
                </div>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• World ID MiniKit entegrasyonu</li>
                  <li>• 23M+ kullanıcı erişimi</li>
                  <li>• Biometric kimlik doğrulama</li>
                  <li>• Orb verified hesaplar</li>
                </ul>
              </div>

              {/* vlayer */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-900">vlayer</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    $10k
                  </span>
                </div>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Zero-knowledge proof üretimi</li>
                  <li>• Gizlilik korumalı doğrulama</li>
                  <li>• On-chain proof verification</li>
                  <li>• Anonim kimlik kanıtı</li>
                </ul>
              </div>

              {/* Blockscout */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-purple-900">Blockscout</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    $20k
                  </span>
                </div>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Block explorer entegrasyonu</li>
                  <li>• Real-time transaction tracking</li>
                  <li>• Şeffaf işlem geçmişi</li>
                  <li>• Contract interaction logs</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-yellow-900 mb-2">Doğrulama Süreci:</h3>
              <ol className="text-yellow-800 text-sm space-y-1">
                <li>1. World ID ile biometric kimlik doğrulama</li>
                <li>2. vlayer ile zero-knowledge proof üretimi</li>
                <li>3. Blockchain'de proof verification</li>
                <li>4. Blockscout'ta şeffaf kayıt tutma</li>
              </ol>
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={isVerifying || !isConnected}
            className={`btn-primary w-full flex items-center justify-center space-x-2 ${
              !isConnected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ShieldCheckIcon className="w-5 h-5" />
            <span>
              {isVerifying 
                ? 'Blockchain doğrulaması yapılıyor...' 
                : 'ETH Prague Entegrasyonlu KYC Başlat'
              }
            </span>
          </button>

          {!isConnected && (
            <p className="text-sm text-gray-500 text-center mt-2">
              Önce cüzdanınızı bağlayın
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default KYCVerification; 