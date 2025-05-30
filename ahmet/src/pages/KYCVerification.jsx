import { useState } from 'react';
import { ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { verifyWithWorldID } from '../lib/minikit';
import toast from 'react-hot-toast';

const KYCVerification = ({ user, setUser }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyWithWorldID();
      if (result.success) {
        toast.success('KYC doğrulaması başarılı!');
        setUser(prev => ({ ...prev, kycStatus: 'APPROVED', verified: true }));
      } else {
        toast.error('Doğrulama başarısız: ' + result.error);
      }
    } catch (error) {
      toast.error('Doğrulama hatası: ' + error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <ShieldCheckIcon className="w-16 h-16 text-dao-blue mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Doğrulama</h1>
        <p className="text-gray-600">Sisteme erişim için kimlik doğrulaması gereklidir</p>
      </div>

      {user?.kycStatus === 'APPROVED' ? (
        <div className="card text-center">
          <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Doğrulama Tamamlandı</h2>
          <p className="text-gray-600">KYC doğrulamanız başarıyla tamamlanmıştır.</p>
        </div>
      ) : (
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">World ID Doğrulama</h2>
            <p className="text-gray-600 mb-4">
              GTU DAO'ya katılmak için World ID ile kimlik doğrulaması yapmanız gerekmektedir. 
              Bu işlem sadece bir kez yapılır ve kimliğinizin benzersizliğini garantiler.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">World ID Avantajları:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Tek kişi tek oy garantisi</li>
                <li>• Gizlilik korumalı doğrulama</li>
                <li>• Sahte hesap koruması</li>
                <li>• Global standart kimlik sistemi</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <ShieldCheckIcon className="w-5 h-5" />
            <span>
              {isVerifying ? 'Doğrulanıyor...' : 'World ID ile Doğrula'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default KYCVerification; 