import React from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/layout/Layout';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function Applications() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <Layout title="Başvurular - GTU DAO">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <UserGroupIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Başvurular
            </h1>
            <p className="text-gray-400 mb-8">
              Başvuruları görüntülemek için lütfen cüzdanınızı bağlayın
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Başvurular - GTU DAO">
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Başvurular
          </h1>
          <p className="text-lg text-gray-400">
            DAO üyelik başvuruları ve değerlendirmeler
          </p>
        </div>

        <div className="card text-center">
          <UserGroupIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Yakında Geliyor
          </h2>
          <p className="text-gray-400">
            Başvuru sistemi şu anda geliştiriliyor. Güncellemeler için takipte kalın.
          </p>
        </div>
      </div>
    </Layout>
  );
} 