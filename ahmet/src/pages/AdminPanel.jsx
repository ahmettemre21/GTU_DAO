import { CogIcon } from '@heroicons/react/24/outline';

const AdminPanel = ({ user }) => {
  if (!user || (user.role !== 'PRESIDENT' && user.role !== 'CORE_TEAM')) {
    return (
      <div className="text-center py-16">
        <CogIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Yetkisiz Erişim</h2>
        <p className="text-gray-600">Bu sayfaya erişim için admin yetkileriniz bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
        <p className="text-gray-600 mt-1">Yönetim araçları ve kontrolleri</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Kullanıcı Yönetimi</h3>
          <p className="text-gray-600 text-sm mb-4">Üye rolleri ve yetkileri düzenleme</p>
          <button className="btn-primary w-full">Yönet</button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">KYC Onayları</h3>
          <p className="text-gray-600 text-sm mb-4">Bekleyen kimlik doğrulama işlemleri</p>
          <button className="btn-primary w-full">İncele</button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Başvuru Değerlendirme</h3>
          <p className="text-gray-600 text-sm mb-4">Pozisyon başvurularını değerlendir</p>
          <button className="btn-primary w-full">Değerlendir</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 