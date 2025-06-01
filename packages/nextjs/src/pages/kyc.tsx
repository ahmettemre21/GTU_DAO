import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/layout/Layout';
import { 
  ShieldCheckIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  UserIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function KYC() {
  const { address, isConnected } = useAccount();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleWorldIDVerification = async () => {
    setIsVerifying(true);
    // World ID verification logic burada olacak
    // Şimdilik mock verification
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <Layout title="KYC Doğrulama - GTU DAO">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <ShieldCheckIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              KYC Doğrulama
            </h1>
            <p className="text-gray-400 mb-8">
              KYC işlemini başlatmak için lütfen cüzdanınızı bağlayın
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="KYC Doğrulama - GTU DAO">
      <div className="px-4 py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            KYC Doğrulama
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            World ID ile kimliğinizi doğrulayın ve GTU DAO'da tam erişim kazanın
          </p>
        </div>

        {/* Verification Status */}
        <div className="card text-center mb-8">
          {isVerified ? (
            <div>
              <CheckBadgeIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                Doğrulama Tamamlandı!
              </h2>
              <p className="text-gray-400 mb-6">
                Kimliğiniz başarıyla doğrulandı. Artık tüm DAO özelliklerini kullanabilirsiniz.
              </p>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-center text-green-400">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Doğrulanmış Üye</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Cüzdan: {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <ShieldCheckIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Kimlik Doğrulama
              </h2>
              <p className="text-gray-400 mb-6">
                GTU DAO'da oy kullanabilmek ve teklif oluşturabilmek için World ID ile kimliğinizi doğrulamanız gerekiyor.
              </p>
              
              {!isVerifying ? (
                <button
                  onClick={handleWorldIDVerification}
                  className="btn-primary text-lg px-8 py-4"
                >
                  <GlobeAltIcon className="w-6 h-6 mr-2 inline" />
                  World ID ile Doğrula
                </button>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="spinner mr-3"></div>
                  <span className="text-purple-400">Doğrulama yapılıyor...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <CheckBadgeIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              Oylama Hakkı
            </h3>
            <p className="text-gray-400 text-sm">
              Tüm DAO tekliflerinde oy kullanabilirsiniz
            </p>
          </div>
          
          <div className="card text-center">
            <UserIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              Teklif Oluşturma
            </h3>
            <p className="text-gray-400 text-sm">
              Kendi tekliflerinizi oluşturabilirsiniz
            </p>
          </div>
          
          <div className="card text-center">
            <GlobeAltIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              STAT Token
            </h3>
            <p className="text-gray-400 text-sm">
              Doğrulama sonrası STAT token kazanın
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            World ID Nasıl Çalışır?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h4 className="font-semibold text-white mb-2">
                World App İndir
              </h4>
              <p className="text-gray-400 text-sm">
                Worldcoin'in resmi uygulamasını indirin
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h4 className="font-semibold text-white mb-2">
                Iris Tarama
              </h4>
              <p className="text-gray-400 text-sm">
                Orb ile iris taraması yapın
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h4 className="font-semibold text-white mb-2">
                Doğrulama
              </h4>
              <p className="text-gray-400 text-sm">
                World ID'nizi GTU DAO'da kullanın
              </p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mt-8">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-400 mb-1">
                Önemli Bilgi
              </h4>
              <p className="text-yellow-200 text-sm">
                World ID doğrulaması yalnızca bir kez yapılabilir ve geri alınamaz. 
                Doğrulama işlemi tamamen anonim ve güvenlidir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 