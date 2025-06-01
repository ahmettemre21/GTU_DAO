import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../../components/layout/Layout';
import { DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline';

const categories = ['Teknoloji', 'Çevre', 'Sosyal', 'Eğitim', 'Güvenlik'];

export default function CreateProposal() {
  const { isConnected } = useAccount();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Smart contract interaction burada olacak
    console.log('Teklif oluşturuluyor:', formData);
  };

  if (!isConnected) {
    return (
      <Layout title="Teklif Oluştur - GTU DAO">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">
              Teklif Oluştur
            </h1>
            <p className="text-gray-400 mb-8">
              Teklif oluşturmak için lütfen cüzdanınızı bağlayın
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Teklif Oluştur - GTU DAO">
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Yeni Teklif Oluştur
          </h1>
          <p className="text-lg text-gray-400">
            Toplulukla paylaşmak istediğiniz fikrinizi teklif haline getirin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Teklif Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Teklifinizin kısa ve açıklayıcı başlığı"
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Kategori *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" className="bg-gray-800">Kategori seçin</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Kısa Açıklama *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Teklifinizin kısa özeti (maksimum 200 karakter)"
                  maxLength={200}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/200 karakter
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Detaylı Açıklama *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  placeholder="Teklifinizin detaylı açıklaması, gerekçeleri ve beklenen sonuçları..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary text-lg px-8 py-4"
            >
              <PlusIcon className="w-6 h-6 mr-2 inline" />
              Teklifi Oluştur
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-8">
          <h4 className="font-semibold text-blue-400 mb-2">
            Teklif Oluşturma Kuralları
          </h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Teklifler topluluk yararına olmalıdır</li>
            <li>• Açık ve anlaşılır bir dil kullanın</li>
            <li>• Gerçekçi ve uygulanabilir öneriler sunun</li>
            <li>• Teklif oluşturmak için STAT token gereklidir</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
} 