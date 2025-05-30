# GTU DAO - Blockchain Kulübü Yönetişim Sistemi

![GTU DAO](https://img.shields.io/badge/GTU-DAO-blue) ![ETH Prague 2025](https://img.shields.io/badge/ETH_Prague-2025-purple) ![World App](https://img.shields.io/badge/World-App-green)

GTÜ Blockchain Kulübü için merkeziyetsiz, şeffaf, KYC onaylı ve role dayalı yönetişim sistemi. Bu proje **ETH Prague 2025** hackathonunda geliştirilmiş olup, üniversite kulüpleri için örnek alınabilecek açık kaynaklı bir DAO altyapısı sunmaktadır.

## 🎯 Proje Amacı

GTU DAO, üniversite kulüplerinin demokratik ve şeffaf yönetimi için blockchain tabanlı bir çözüm sunar:

- **Merkeziyetsiz Yönetişim**: Kulüp kararları DAO mekanizmaları ile alınır
- **KYC Doğrulama**: World ID ile tek kişi tek oy garantisi
- **Role Dayalı Yetkilendirme**: Üye, Core Team ve Yönetim seviyeleri
- **Şeffaf Oylama**: Tüm kararlar blockchain üzerinde kayıtlı

## 🏗️ Teknolojiler

### Frontend
- **React 18** + **Vite** - Modern web uygulaması
- **Tailwind CSS** - Responsive UI tasarımı
- **React Router** - Sayfa yönlendirme
- **Prisma ORM** - Type-safe veritabanı yönetimi

### Blockchain & Web3
- **World MiniKit** - World App entegrasyonu
- **World ID** - KYC doğrulama sistemi
- **Ethers.js** - Blockchain etkileşimi

### ETH Prague Sponsor Entegrasyonları
- 🌍 **World App**: MiniKit SDK ile 23M+ kullanıcıya erişim
- 🔗 **vlayer**: Web/Email proofs ile KYC doğrulama
- 📊 **Blockscout**: Merits API ile kullanıcı ödüllendirme

## 🚀 Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/your-username/GTU_DAO.git
cd GTU_DAO/ahmet
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Veritabanını Hazırlayın
```bash
npx prisma generate
npx prisma db push
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📱 Özellikler

### Tamamlanan Özellikler ✅
- **Role Tabanlı Yetkilendirme**: Üye, Core Team, Yönetim Kurulu, Başkan
- **Öneri Sistemi**: Yeni öneriler oluşturma ve filtreleme
- **Oylama Mekanizması**: Demokratik karar alma süreci
- **KYC Entegrasyonu**: World ID mock implementasyonu
- **Dashboard**: Kullanıcı istatistikleri ve hızlı erişim
- **Admin Panel**: Yönetim araçları
- **Modern UI/UX**: Responsive ve erişilebilir tasarım

### Planlanan Özellikler 🚧
- **Gerçek World MiniKit Entegrasyonu**
- **vlayer Web/Email Proofs**
- **Blockscout API Entegrasyonu**
- **Smart Contract Deployment**
- **Token Sistemi**

## 🗄️ Veritabanı Yapısı

Sistem 7 ana tablodan oluşmaktadır:
- **Users**: Kullanıcı profilleri ve roller
- **AdminCouncil**: Yönetim kurulu üyeleri
- **Proposals**: Kulüp önerileri
- **Votes**: Oylama kayıtları
- **Applications**: Pozisyon başvuruları
- **KYCVerifications**: Kimlik doğrulama
- **ActivityLogs**: Sistem aktiviteleri

## 🎖️ ETH Prague 2025 Ödül Hedefleri

### World App ($10,000)
- ✅ **MiniKit Mock Integration**: Development ready
- 🚧 **Production Deployment**: Ready for implementation
- ✅ **User Experience**: Optimized for mobile

### vlayer ($10,000)
- ✅ **KYC Architecture**: Ready for web proofs
- 🚧 **Email Verification**: Integration planned

### Blockscout ($20,000)
- ✅ **Merit System Design**: Point-based rewards
- 🚧 **API Integration**: User activity tracking

## 📁 Proje Yapısı

```
GTU_DAO/
├── ahmet/                 # Ana React uygulaması
│   ├── src/
│   │   ├── components/    # UI bileşenleri
│   │   ├── pages/         # Sayfa bileşenleri
│   │   ├── lib/          # Yardımcı kütüphaneler
│   │   └── ...
│   ├── prisma/           # Veritabanı şeması
│   ├── public/           # Statik dosyalar
│   └── ...
└── README.md             # Bu dosya
```

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklıdır ve topluluk katkılarına açıktır. Katkıda bulunmak için:

1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull Request açın

## 📄 Lisans

MIT License - Detaylar için `LICENSE` dosyasına bakın.

## 👥 Takım

- **Ahmet Emre Yavuz** - Proje Geliştirici
- **GTÜ Blockchain Kulübü** - Test ve Feedback

---

**GTU DAO** - Üniversite kulüplerinin geleceği için blockchain çözümü 🚀

*ETH Prague 2025 ile gurururla sunulmuştur* 🇨🇿 