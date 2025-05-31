# GTU DAO - Scaffold-ETH-2 Yapısı

Bu proje scaffold-eth-2 mimarisine uygun şekilde yeniden yapılandırılmıştır.

## 📁 Proje Yapısı

```
packages/
├── nextjs/           # Frontend (Next.js + TypeScript)
│   ├── src/
│   │   ├── components/   # React bileşenleri
│   │   ├── pages/        # Next.js sayfaları
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility fonksiyonları
│   │   ├── config/       # Konfigürasyon dosyaları
│   │   └── styles/       # CSS ve Tailwind stilleri
│   └── public/           # Statik dosyalar
├── hardhat/          # Smart contracts
│   ├── contracts/       # Solidity kontratları
│   ├── deploy/          # Deploy scriptleri
│   ├── scripts/         # Utility scriptleri
│   └── test/            # Test dosyaları
└── subgraph/         # (Opsiyonel: The Graph entegrasyonu)
```

## 🚀 Kurulum

### 1. Bağımlılıkları Yükleyin
```bash
cd packages
npm install
```

### 2. Hardhat Kontratlarını Derleyin
```bash
cd hardhat
npm run compile
```

### 3. Frontend'i Başlatın
```bash
cd nextjs
npm run dev
```

## 🔧 Geliştirme

### Smart Contract Geliştirme
```bash
cd packages/hardhat
npm run compile      # Kontratları derle
npm run test         # Testleri çalıştır
npm run deploy       # Deploy et
```

### Frontend Geliştirme
```bash
cd packages/nextjs
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run lint         # Linting
```

## 🎯 Özellikler

- ✅ **Scaffold-ETH-2 Uyumlu Yapı**
- ✅ **TypeScript Desteği**
- ✅ **Modüler Mimari**
- ✅ **Temiz Klasör Yapısı**
- ✅ **ETH Prague Entegrasyonları Korundu**

## 📦 Paketler

- **@gtu-dao/nextjs**: Frontend uygulaması
- **@gtu-dao/hardhat**: Smart contract geliştirme ortamı

## 🔗 Bağlantılar

- [ETH Prague 2025](https://ethprague.com/)
- [Scaffold-ETH-2](https://github.com/scaffold-eth/scaffold-eth-2)
- [GTU Blockchain Kulübü](https://github.com/gtu-blockchain) 