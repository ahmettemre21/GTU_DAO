# GTU DAO Smart Contracts - ETH Prague 2025 🏆

**Total Prize Pool: $40,000**

GTU DAO için hazırlanmış akıllı sözleşme koleksiyonu. ETH Prague 2025 yarışmasının üç kategorisinde yer alan özellikler ile geliştirilmiştir.

## 🏆 ETH Prague 2025 Entegrasyonları

### 🌍 World App ($10k Prize Pool)
- **WorldIDVerifier.sol**: World ID doğrulama sistemi
- MiniKit entegrasyonu ile kimlik doğrulama
- Sybil attack koruması
- ORB ve DEVICE seviyeli doğrulama

### 🔒 vlayer ($10k Prize Pool)  
- **VlayerZKVerifier.sol**: Zero-knowledge proof sistemi
- Gizlilik korumalı oylama
- Anonim kimlik doğrulama
- ZK-SNARK tabanlı ispatlar

### 🔍 Blockscout ($20k Prize Pool)
- **BlockscoutRegistry.sol**: Blockchain şeffaflık sistemi
- İşlem tracking ve metadata
- Gelişmiş analytics
- Real-time monitoring

## 📋 Sözleşme Listesi

### 1. StatToken.sol
**Soulbound Governance Token**
```solidity
// Aktarılamaz (soulbound) governance token
// Voting power ve reputation sistemi
// Role-based initial distribution
```

**Özellikler:**
- ✅ Soulbound behavior (transfer edilemez)
- ✅ Role-based minting (President, Core Team, Member)
- ✅ Activity tracking ve decay mechanism
- ✅ Automatic rewards for contributions

**Ana Fonksiyonlar:**
- `mint(address, uint256, string)` - Token mint etme
- `initializeUser(address, string)` - Yeni kullanıcı başlatma
- `updateActivity(address, string)` - Activity güncelleme
- `applyDecay(address)` - İnaktif kullanıcı decay

---

### 2. VotingWithWeight.sol
**STAT Token Weighted Voting System**
```solidity
// STAT token balance'a göre ağırlıklı oylama
// Farklı proposal türleri
// Automatic STAT rewards
```

**Özellikler:**
- ✅ STAT token weighted voting
- ✅ Multiple proposal types (ALL_MEMBERS, CORE_TEAM, COUNCIL)
- ✅ Time-limited voting periods
- ✅ Anti-double voting protection
- ✅ Automatic STAT rewards for participation

**Ana Fonksiyonlar:**
- `createProposal(string, string, string, ProposalType, uint256)` - Proposal oluşturma
- `vote(uint256, bool, string)` - Oy verme
- `executeProposal(uint256)` - Proposal sonuçlandırma
- `getProposal(uint256)` - Proposal bilgileri

---

### 3. WorldIDVerifier.sol 🌍
**World App Integration ($10k Prize)**
```solidity
// World ID ile kimlik doğrulama
// Nullifier hash kontrolü
// ORB/DEVICE level verification
```

**ETH Prague Özellikleri:**
- ✅ World ID Semaphore integration
- ✅ Nullifier hash uniqueness
- ✅ ORB ve DEVICE level verification
- ✅ Sybil attack prevention
- ✅ MiniKit compatibility

**Ana Fonksiyonlar:**
- `verifyWithWorldID(uint256, uint256, uint256[8], string)` - World ID doğrulama
- `isVerified(address)` - Doğrulama kontrolü
- `getVerification(address)` - Doğrulama detayları
- `revokeVerification(address, string)` - Doğrulama iptali

---

### 4. VlayerZKVerifier.sol 🔒
**vlayer ZK Integration ($10k Prize)**
```solidity
// Zero-knowledge proof verification
// Multiple circuit types
// Anonymous voting support
```

**ETH Prague Özellikleri:**
- ✅ ZK-SNARK proof verification
- ✅ Multiple circuit support (KYC, voting, membership)
- ✅ Nullifier-based anonymous voting  
- ✅ vlayer protocol integration
- ✅ Privacy-preserving verification

**Circuit Types:**
- `kyc-verification` - KYC verification with World ID
- `voting-eligibility` - Voting eligibility without revealing identity
- `anonymous-voting` - Anonymous voting with nullifier
- `membership-verification` - DAO membership proof

**Ana Fonksiyonlar:**
- `submitProof(uint256[8], uint256[], string, bytes32)` - ZK proof gönderme
- `verifyProof(bytes32)` - Proof doğrulama
- `getProof(bytes32)` - Proof detayları
- `addCircuit(string, string, uint256)` - Yeni circuit ekleme

---

### 5. BlockscoutRegistry.sol 🔍
**Blockscout Integration ($20k Prize)**
```solidity
// Blockchain transparency ve tracking
// Transaction metadata
// Contract registry
```

**ETH Prague Özellikleri:**
- ✅ Enhanced transaction tracking
- ✅ Contract metadata registry
- ✅ User activity analytics
- ✅ Blockscout indexing compatibility
- ✅ Real-time transparency

**Ana Fonksiyonlar:**
- `registerTransaction(bytes32, address, address, uint256, bytes, string, string)` - İşlem kaydetme
- `registerContract(address, string, string, string, string[])` - Contract kaydetme
- `getTransaction(bytes32)` - İşlem detayları
- `getUserActivity(address)` - Kullanıcı aktivitesi
- `generateBlockscoutMetadata(bytes32)` - Blockscout metadata

---

### 6. GTUDAOGovernance.sol 🏛️
**Main Governance Contract**
```solidity
// Ana governance sistemi
// Tüm ETH Prague entegrasyonları
// Member management
```

**Özellikler:**
- ✅ Tüm contract'ları koordine eder
- ✅ Member management sistemi
- ✅ World ID + ZK proof verification
- ✅ Enhanced proposal creation
- ✅ Anonymous voting support
- ✅ Blockscout transparency

**Ana Fonksiyonlar:**
- `addMember(address, string, string, MemberRole, string, string)` - Üye ekleme
- `verifyWithWorldID(uint256, uint256, uint256[8], string)` - World ID doğrulama
- `submitZKProof(uint256[8], uint256[], string)` - ZK proof gönderme
- `createProposal(string, string, string, ProposalType)` - Proposal oluşturma
- `voteOnProposal(uint256, bool, string, bool)` - Oylama (anonim seçeneği ile)

## 🚀 Deployment

### Prerequisites
```bash
npm install hardhat @openzeppelin/contracts
```

### Deploy Script
```bash
# Local network
npx hardhat run scripts/deploy.js --network localhost

# Testnet (Sepolia)
npx hardhat run scripts/deploy.js --network sepolia

# Mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

### Deployment Order
1. **StatToken** (Independent)
2. **VotingWithWeight** (Depends on StatToken)
3. **WorldIDVerifier** (Independent)
4. **VlayerZKVerifier** (Independent)
5. **BlockscoutRegistry** (Independent)
6. **GTUDAOGovernance** (Coordinates all)

## 🔧 Configuration

### Environment Variables
```env
# World App Integration
VITE_WORLD_APP_ID=app_staging_gtu_dao
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Network Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_key
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_key
PRIVATE_KEY=your_private_key
```

### Hardhat Configuration
```javascript
// hardhat.config.js already configured for:
// - Sepolia testnet
// - Mainnet
// - Local development
// - Contract verification
```

## 📊 ETH Prague 2025 Features

### World App ($10k) Features
- [x] World ID MiniKit integration
- [x] Identity verification workflow
- [x] Nullifier hash management
- [x] Sybil attack prevention
- [x] ORB/DEVICE level verification

### vlayer ($10k) Features
- [x] Zero-knowledge proof circuits
- [x] Anonymous voting mechanism
- [x] Privacy-preserving KYC
- [x] Multiple proof types
- [x] Nullifier-based uniqueness

### Blockscout ($20k) Features
- [x] Enhanced transaction tracking
- [x] Contract metadata registry
- [x] User activity analytics
- [x] Real-time transparency
- [x] Blockscout indexing compatibility

## 🔒 Security Features

### Access Control
- Role-based permissions (Admin, Member, Verified)
- Multi-signature requirements for critical functions
- Emergency pause functionality

### Anti-Attack Measures
- Sybil attack prevention via World ID
- Double voting prevention
- Nullifier hash uniqueness
- Time-locked proposals

### Privacy Protection
- Anonymous voting via ZK proofs
- Private membership verification
- Selective disclosure of information

## 📈 Tokenomics

### STAT Token Distribution
- **President**: 1000 STAT
- **Vice President**: 800 STAT  
- **Core Team**: 600 STAT
- **Member**: 100 STAT

### Reward System
- Proposal Creation: +50 STAT
- Vote Participation: +10 STAT
- World ID Verification: +50 STAT
- ZK Proof Submission: +30 STAT
- Successful Proposal: +100 STAT

### Decay Mechanism
- 5% decay every 30 days for inactive users
- Activity resets decay timer
- Encourages continuous participation

## 🔗 Frontend Integration

### Contract Addresses (After Deployment)
```javascript
const contracts = {
  StatToken: "0x...",
  VotingWithWeight: "0x...", 
  WorldIDVerifier: "0x...",
  VlayerZKVerifier: "0x...",
  BlockscoutRegistry: "0x...",
  GTUDAOGovernance: "0x..."
};
```

### React Integration
```javascript
// hooks/useSmartContracts.js already configured
import { useSmartContracts } from './hooks/useSmartContracts';

const { 
  createProposalWithVerification,
  voteWithPrivacy,
  verifyWithWorldID,
  submitZKProof 
} = useSmartContracts();
```

## 📋 Testing

### Unit Tests
```bash
npx hardhat test
```

### Integration Tests
```bash
npx hardhat test test/integration/
```

### ETH Prague Demo
```bash
npx hardhat run scripts/demo.js --network localhost
```

## 🏆 Competition Details

Bu akıllı sözleşme koleksiyonu ETH Prague 2025 yarışması için hazırlanmıştır:

- **World App Track**: Identity verification ve MiniKit integration
- **vlayer Track**: Zero-knowledge proofs ve privacy
- **Blockscout Track**: Enhanced transparency ve analytics
- **Total Prize Pool**: $40,000

## 📞 Support

GTU Blockchain Club tarafından geliştirilmiştir.
- Email: blockchain@gtu.edu.tr
- GitHub: https://github.com/ahmettemre21/GTU_DAO 