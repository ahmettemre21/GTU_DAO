# 🎓 GTU DAO - Gebze Teknik Üniversitesi Merkezi Olmayan Öğrenci Organizasyonu

![ETH Prague 2025](https://img.shields.io/badge/ETH%20Prague%202025-Hackathon%20Project-blue)
![Prize Pool](https://img.shields.io/badge/Prize%20Pool-$40,000-green)
![World ID](https://img.shields.io/badge/World%20ID-$10k-orange)
![Blockscout](https://img.shields.io/badge/Blockscout-$20k-purple)
![vlayer](https://img.shields.io/badge/vlayer-$10k-red)

GTU DAO, Gebze Teknik Üniversitesi öğrencileri için tasarlanmış modern bir merkezi olmayan otonom organizasyon (DAO) platformudur. ETH Prague 2025 hackathonunda World ID, Blockscout ve vlayer entegrasyonları ile geliştirilmiştir.

## 🚀 Özellikler

### 🎯 Temel Fonksiyonlar
- **World ID Entegrasyonu**: Güvenilir KYC ve doğrulama sistemi
- **Ağırlıklı Oylama**: Öğrenci durumu ve aktiflik bazlı oy gücü
- **Proposal Sistemi**: Demokratik karar alma mekanizması
- **Kulüp Yönetimi**: Öğrenci kulüpleri için başvuru ve yönetim
- **Admin Paneli**: Yönetici araçları ve kontroller

### 💻 Teknik Özellikler
- Next.js 14 ile modern frontend
- TypeScript tam destek
- TailwindCSS ve Shadcn/UI bileşenleri
- RainbowKit wallet entegrasyonu
- Hardhat smart contract geliştirme
- Sepolia ve Rootstock ağ desteği

## 📁 Proje Yapısı

```
GTU_DAO/
├── packages/
│   ├── nextjs/              # Frontend uygulaması
│   │   ├── src/
│   │   │   ├── pages/       # Next.js sayfaları
│   │   │   ├── components/  # React bileşenleri
│   │   │   │   ├── ui/      # Shadcn/UI bileşenleri
│   │   │   │   └── layout/  # Layout bileşenleri
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── services/    # API servisleri
│   │   │   └── styles/      # CSS ve Tailwind konfigürasyonu
│   │   └── public/          # Statik dosyalar
│   └── hardhat/             # Smart contract geliştirme
│       ├── contracts/       # Solidity kontratları
│       ├── scripts/         # Deployment scriptleri
│       └── test/           # Test dosyaları
├── package.json             # Workspace konfigürasyonu
└── README.md               # Bu dosya
```

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Git

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/your-username/GTU_DAO.git
cd GTU_DAO
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Development Sunucusunu Başlatın
```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📊 Sayfalar ve Özellikler

### 🏠 Ana Sayfa (`/`)
- Proje tanıtımı ve genel bilgiler
- ETH Prague 2025 detayları
- Quick start rehberi

### 📈 Dashboard (`/dashboard`)
- Kişisel istatistikler
- Aktiflik geçmişi
- Hızlı aksiyonlar

### 📋 Teklifler (`/proposals`)
- Aktif tekliflere göz atma
- Yeni teklif oluşturma
- Oylama sistemi

### 🗳️ Oylama (`/voting`)
- Detaylı oylama arayüzü
- Oy geçmişi
- Sonuç analizi

### 📝 Başvurular (`/applications`)
- Kulüp pozisyonlarına başvuru
- Başvuru durumu takibi

### 🔐 KYC Doğrulama (`/kyc`)
- World ID entegrasyonu
- Güvenli kimlik doğrulama

### ⚙️ Admin Panel (`/admin`)
- Sistem yönetimi
- Kullanıcı yönetimi
- İstatistikler

## 🔗 Smart Contract Adresleri

### Sepolia Testnet
- **StatToken**: `0x...` (Yakında)
- **VotingWithWeight**: `0x...` (Yakında)
- **GTUDAOGovernance**: `0x...` (Yakında)

## 🏆 ETH Prague 2025 Entegrasyonları

### World ID ($10,000 Ödül Havuzu)
- KYC sistemi için World ID kullanımı
- Sybil saldırılarına karşı koruma
- Gerçek öğrenci doğrulaması

### Blockscout ($20,000 Ödül Havuzu)
- Transaction explorer entegrasyonu
- Block explorer analytics
- Smart contract verification

### vlayer ($10,000 Ödül Havuzu)
- Layer 2 optimizasyonları
- Gas optimizasyonu
- Scaling çözümleri

## 🧪 Test Etme

```bash
# Frontend testleri
npm run test --workspace=packages/nextjs

# Smart contract testleri
npm run hardhat:test
```

## 🚀 Deployment

```bash
# Frontend build
npm run build

# Smart contract deployment
npm run hardhat:deploy
```

## 📚 Teknoloji Stack'i

### Frontend
- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **TailwindCSS**: Styling
- **Shadcn/UI**: UI bileşenleri
- **RainbowKit**: Wallet connection
- **Wagmi**: Ethereum integration

### Blockchain
- **Hardhat**: Development environment
- **Solidity**: Smart contracts
- **Sepolia**: Test network
- **Rootstock**: Mainnet alternative

### Integrations
- **World ID**: Identity verification
- **Blockscout**: Block explorer
- **vlayer**: Layer 2 solutions

## 👥 Takım

- **Frontend Developer**: Modern React/Next.js geliştirme
- **Smart Contract Developer**: Solidity ve DeFi protokolleri
- **UI/UX Designer**: Kullanıcı deneyimi tasarımı

## 📞 İletişim

- **Website**: [gtu-dao.com](https://gtu-dao.com)
- **Twitter**: [@GTU_DAO](https://twitter.com/GTU_DAO)
- **Telegram**: [GTU DAO Community](https://t.me/gtu_dao)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

---

**ETH Prague 2025** 🏆 | **$40,000 Prize Pool** 💰 | **Made with ❤️ in Istanbul** 