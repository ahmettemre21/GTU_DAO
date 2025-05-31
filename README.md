# GTU DAO - Blockchain Kulübü Yönetişim Sistemi

![GTU DAO](https://img.shields.io/badge/GTU-DAO-blue) ![ETH Prague 2025](https://img.shields.io/badge/ETH_Prague-2025-purple) ![World App](https://img.shields.io/badge/World-App-green)

GTÜ Blockchain Kulübü için merkeziyetsiz, şeffaf, KYC onaylı ve role dayalı yönetişim sistemi. Bu proje **ETH Prague 2025** hackathonunda geliştirilmiş olup, üniversite kulüpleri için örnek alınabilecek açık kaynaklı bir DAO altyapısı sunmaktadır.

## 🎯 Proje Amacı

GTU DAO, üniversite kulüplerinin demokratik ve şeffaf yönetimi için blockchain tabanlı bir çözüm sunar:

- **Merkeziyetsiz Yönetişim**: Kulüp kararları DAO mekanizmaları ile alınır
- **KYC Doğrulama**: World ID ile tek kişi tek oy garantisi
- **Role Dayalı Yetkilendirme**: Üye, Core Team ve Yönetim seviyeleri
- **Şeffaf Oylama**: Tüm kararlar blockchain üzerinde kayıtlı

## 🏗️ Mimari ve Teknolojiler

### Frontend
- **React 19** + **Vite** - Modern web uygulaması
- **Tailwind CSS** - Responsive UI tasarımı
- **React Router** - Sayfa yönlendirme
- **React Hot Toast** - Kullanıcı bildirimleri

### Blockchain & Web3
- **World MiniKit** - World App entegrasyonu
- **World ID** - KYC doğrulama sistemi
- **Ethers.js** - Blockchain etkileşimi
- **World Chain** - ETH Prague için optimize edilmiş

### Veritabanı
- **Prisma ORM** - Type-safe veritabanı yönetimi
- **SQLite** - Geliştirme ortamı için hafif DB

### ETH Prague Sponsor Entegrasyonları
- 🌍 **World App**: MiniKit SDK ile 23M+ kullanıcıya erişim
- 🔗 **vlayer**: Web/Email proofs ile KYC doğrulama
- 📊 **Blockscout**: Merits API ile kullanıcı ödüllendirme

## 🚀 Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/your-username/gtu-dao.git
cd gtu-dao/ahmet
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

## 📱 World App MiniKit Entegrasyonu

GTU DAO, World App içerisinde Mini App olarak çalışacak şekilde tasarlanmıştır:

### Özellikler
- **World ID Doğrulama**: KYC süreci için güvenli kimlik onayı
- **Wallet Entegrasyonu**: Anlık ödemeler ve token işlemleri
- **Push Bildirimleri**: Oylama ve öneri güncellemeleri
- **Offline Çalışma**: PWA desteği ile çevrimdışı erişim

### MiniKit Komutları
```javascript
// World ID doğrulama
const result = await MiniKit.worldIDAuth({
  action: 'gtu-dao-kyc',
  signal: 'gtu-dao-verification'
});

// Ödeme gönderme
const payment = await MiniKit.sendTransaction({
  to: recipientAddress,
  value: amount,
  data: '0x'
});
```

## 🗄️ Veritabanı Yapısı

### Ana Tablolar

| Tablo | Açıklama |
|-------|----------|
| `Users` | Kullanıcı profilleri, roller ve KYC durumu |
| `AdminCouncil` | Aktif yönetim kurulu üyeleri |
| `Proposals` | Kulüp önerileri ve detayları |
| `Votes` | Verilen oylar ve sonuçlar |
| `Applications` | Pozisyon başvuruları |
| `KYCVerifications` | Kimlik doğrulama kayıtları |
| `ActivityLogs` | Sistem aktivite geçmişi |

### Roller Hiyerarşisi
1. **Üyeler**: Öneri sunma ve oylama hakkı
2. **Core Team**: Özel konularda ek oylama yetkisi
3. **Yönetim Kurulu**: Süreç yönetimi ve onay yetkisi
4. **Başkan**: Tam yönetim yetkisi (1 yıl sınırlı)

## 🏛️ DAO Yönetişim Kuralları

### Oylama Mekanizması
- **Genel Kararlar**: %60 üye çoğunluğu gerekli
- **İç Yapı Değişiklikleri**: %51 Core Team onayı
- **Yönetim Kararları**: Yönetim kurulu oylaması

### Başkanlık Sistemi
- Görev süresi: Maksimum 1 yıl
- Tekrar seçilme: Bir sonraki dönem yasak
- Aday olma koşulu: Önceki yönetim veya aktif Core Team üyesi

### KYC Zorunluluğu
- Tüm kullanıcılar World ID doğrulaması yapmalı
- Tek kişi tek hesap garantisi
- Sahte profil koruması

## 🎖️ ETH Prague 2025 Ödül Hedefleri

### World App ($10,000)
- ✅ **Best Mini App**: Tam MiniKit entegrasyonu
- ✅ **World Chain Deployment**: Smart contract'lar deploy edilecek
- ✅ **Real User Base**: GTÜ Blockchain Kulübü için canlı kullanım

### vlayer ($10,000)
- ✅ **Web Proofs**: Email doğrulama ile KYC
- ✅ **Verifiable Data**: Kullanıcı kimlik bilgileri
- ✅ **Smart Contract Integration**: On-chain verification

### Blockscout ($20,000)
- ✅ **API Integration**: Kullanıcı aktivite takibi
- ✅ **Merits System**: Katılım puanları
- ✅ **Explorer Integration**: Şeffaf işlem görüntüleme

## 🔧 Geliştirme Araçları

### Kod Kalitesi
```bash
# Linting
npm run lint

# Veritabanı Studio
npm run db:studio

# Production Build
npm run build
```

### Docker Desteği (Opsiyonel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🌐 Deployment

### World App Mini App
1. World Developer Portal'da app kayıt
2. MiniKit SDK konfigürasyonu
3. World Chain testnet deploy
4. App Store submission

### Geleneksel Web Hosting
- Vercel, Netlify veya benzer platformlar
- Çevre değişkenleri ayarı
- Domain yönlendirme

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklıdır ve topluluk katkılarına açıktır:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında dağıtılmaktadır. Detaylar için `LICENSE` dosyasına bakın.

## 👥 Takım

- **Ahmet Emre Yavuz** - Proje Geliştirici
- **GTÜ Blockchain Kulübü** - Test ve Feedback

## 🔗 Bağlantılar

- [World App Developer Docs](https://docs.world.org/mini-apps)
- [vlayer Documentation](https://book.vlayer.xyz)
- [Blockscout API](https://docs.blockscout.com/devs/blockscout-sdk)
- [ETH Prague 2025](https://ethprague.com/)

---

**GTU DAO** - Üniversite kulüplerinin geleceği için blockchain çözümü 🚀

*ETH Prague 2025 ile gurururla sunulmuştur* 🇨🇿
