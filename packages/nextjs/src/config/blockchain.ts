// GTU DAO - Blockchain Configuration

interface ContractAddresses {
  votingContract: `0x${string}`;
  tokenContract: `0x${string}`;
  governanceContract: `0x${string}`;
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

// GTU DAO Contract Addresses - ETH Prague 2025
export const getContractAddresses = (chainId: number): ContractAddresses => {
  const contracts: Record<number, ContractAddresses> = {
    // Ethereum Mainnet
    1: {
      votingContract: '0x1234567890123456789012345678901234567890' as `0x${string}`, // Production address
      tokenContract: '0x2345678901234567890123456789012345678901' as `0x${string}`, // STAT Token Production
      governanceContract: '0x3456789012345678901234567890123456789012' as `0x${string}`, // Governance Production
    },
    // Sepolia Testnet - GTU DAO Test Contracts
    11155111: {
      votingContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`, // Test Voting Contract
      tokenContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`, // STAT Token Test
      governanceContract: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as `0x${string}`, // Test Governance
    },
    // Polygon Mainnet
    137: {
      votingContract: '0x4567890123456789012345678901234567890123' as `0x${string}`, // Polygon Voting
      tokenContract: '0x5678901234567890123456789012345678901234' as `0x${string}`, // STAT Token Polygon
      governanceContract: '0x6789012345678901234567890123456789012345' as `0x${string}`, // Polygon Governance
    },
    // Mumbai Testnet
    80001: {
      votingContract: '0x7890123456789012345678901234567890123456' as `0x${string}`, // Mumbai Test Voting
      tokenContract: '0x8901234567890123456789012345678901234567' as `0x${string}`, // STAT Token Mumbai Test
      governanceContract: '0x9012345678901234567890123456789012345678' as `0x${string}`, // Mumbai Test Governance
    },
    // Hardhat Local Development
    31337: {
      votingContract: '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`, // Local Voting
      tokenContract: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`, // Local STAT Token
      governanceContract: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as `0x${string}`, // Local Governance
    }
  }

  return contracts[chainId] || contracts[11155111] // Default to Sepolia
}

// STAT Token Configuration
export const STAT_TOKEN_CONFIG = {
  name: 'Student Activity Token',
  symbol: 'STAT',
  decimals: 18,
  totalSupply: '1000000', // 1M STAT tokens
  mintable: true,
  burnable: true,
  roles: {
    EXECUTIVE: 'EXECUTIVE_ROLE',
    CORE_TEAM: 'CORE_TEAM_ROLE', 
    GENERAL_MEMBER: 'GENERAL_MEMBER_ROLE'
  }
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
  },
  {
    id: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorers: [{ name: 'PolygonScan', url: 'https://polygonscan.com' }]
  },
  {
    id: 31337,
    name: 'Hardhat',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['http://127.0.0.1:8545'],
    blockExplorers: [{ name: 'Local', url: 'http://localhost:8545' }]
  }
]

// ETH Prague 2025 Prize Pool Configurations
export const ETH_PRAGUE_CONFIG = {
  totalPrizePool: 40000, // $40,000 USD
  prizes: {
    worldId: { amount: 10000, currency: 'USD', description: 'World ID Integration Prize' },
    blockscout: { amount: 20000, currency: 'USD', description: 'Blockscout Explorer Integration' },
    vlayer: { amount: 10000, currency: 'USD', description: 'vlayer ZK Protocol Integration' }
  }
}

export const worldAppConfig = {
  appId: 'app_staging_d8e7f6c5b4a3d2e1',
  action: 'gtu-dao-verification',
  signal: 'gtu-dao-kyc-2025',
  enableTelemetry: true,
  walletConnectProjectId: 'gtu-dao-wc-project-id'
}

export const vlayerConfig = {
  rpcUrl: 'https://rpc.vlayer.xyz',
  chainId: 31648428,
  contractAddress: '0xA0b86a33E6441b8dB77c4aC22aA5b3a11eC4c5A8' as `0x${string}`,
  verifierContract: '0xB1c97a44F5d66E2c76d3F4b5A22c4B7a3F8D9C1e' as `0x${string}`
}

export const blockscoutConfig = {
  apiUrl: 'https://eth.blockscout.com/api',
  wsUrl: 'wss://eth.blockscout.com/socket/websocket',
  explorerUrl: 'https://eth.blockscout.com',
  supportedChains: [1, 11155111, 137, 80001, 31337], // mainnet, sepolia, polygon, mumbai, hardhat
  apiKey: 'gtu-dao-blockscout-api-key'
} 