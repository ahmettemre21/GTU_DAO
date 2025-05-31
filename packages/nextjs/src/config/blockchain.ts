// GTU DAO - Blockchain Configuration

interface ContractAddresses {
  votingContract: `0x${string}`;
  tokenContract: `0x${string}`;
}

interface ChainConfig {
  id: number;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: Array<{
    name: string;
    url: string;
  }>;
}

// Contract Addresses
export const getContractAddresses = (chainId: number): ContractAddresses => {
  const contracts: Record<number, ContractAddresses> = {
    // Ethereum Mainnet
    1: {
      votingContract: '0x...' as `0x${string}`, // Gerçek kontrat adresi gelecek
      tokenContract: '0x...' as `0x${string}`, // Gerçek kontrat adresi gelecek
    },
    // Sepolia Testnet  
    11155111: {
      votingContract: '0x...' as `0x${string}`, // Test kontrat adresi
      tokenContract: '0x...' as `0x${string}`, // Test kontrat adresi
    },
    // Polygon
    137: {
      votingContract: '0x...' as `0x${string}`, // Polygon kontrat adresi
      tokenContract: '0x...' as `0x${string}`, // Polygon kontrat adresi
    },
    // Mumbai Testnet
    80001: {
      votingContract: '0x...' as `0x${string}`, // Mumbai test kontrat adresi
      tokenContract: '0x...' as `0x${string}`, // Mumbai test kontrat adresi
    }
  }

  return contracts[chainId] || contracts[11155111] // Default olarak Sepolia
}

export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    id: 1,
    name: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorers: [{ name: 'Etherscan', url: 'https://etherscan.io' }]
  },
  {
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://ethereum-sepolia.publicnode.com'],
    blockExplorers: [{ name: 'Etherscan', url: 'https://sepolia.etherscan.io' }]
  }
]

// ETH Prague Prize Pool Configurations - Geliştirme için basit konfigürasyonlar
export const worldAppConfig = {
  appId: 'demo-app-id',
  action: 'gtu-dao-verification',
  signal: 'gtu-dao-kyc',
  enableTelemetry: true,
  walletConnectProjectId: 'demo-project-id'
}

export const vlayerConfig = {
  rpcUrl: 'https://rpc.vlayer.xyz',
  chainId: 31648428,
  contractAddress: '0x...' as `0x${string}`,
  verifierContract: '0x...' as `0x${string}`
}

export const blockscoutConfig = {
  apiUrl: 'https://eth.blockscout.com/api',
  wsUrl: 'wss://eth.blockscout.com/socket/websocket',
  explorerUrl: 'https://eth.blockscout.com',
  supportedChains: [1, 11155111, 1337] // mainnet, sepolia, hardhat
} 