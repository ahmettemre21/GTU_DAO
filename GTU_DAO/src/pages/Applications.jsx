import { useState } from 'react';
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Applications = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [application, setApplication] = useState({
    type: 'CORE_TEAM',
    appliedForRole: '',
    reason: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Başvurunuz gönderildi!');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Başvurular</h1>
          <p className="text-gray-600 mt-1">Pozisyon başvuruları ve değerlendirmeler</p>
        </div>
        
        {user && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2 mt-4 sm:mt-0"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Yeni Başvuru</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Yeni Başvuru</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başvuru Türü
              </label>
              <select
                value={application.type}
                onChange={(e) => setApplication(prev => ({ ...prev, type: e.target.value }))}
                className="input-field"
              >
                <option value="CORE_TEAM">Core Team</option>
                <option value="PRESIDENCY">Başkanlık</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pozisyon
              </label>
              <input
                type="text"
                value={application.appliedForRole}
                onChange={(e) => setApplication(prev => ({ ...prev, appliedForRole: e.target.value }))}
                className="input-field"
                placeholder="Örn: Yazılım Ekibi"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başvuru Gerekçesi
              </label>
              <textarea
                value={application.reason}
                onChange={(e) => setApplication(prev => ({ ...prev, reason: e.target.value }))}
                className="input-field h-32 resize-none"
                placeholder="Neden bu pozisyona uygun olduğunuzu açıklayın..."
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                İptal
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Başvuru Gönder
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="text-center py-12">
        <UserGroupIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Başvuru Geçmişi</h3>
        <p className="text-gray-600">Henüz bir başvuru geçmişiniz bulunmuyor.</p>
      </div>
    </div>
  );
};

export default Applications; 