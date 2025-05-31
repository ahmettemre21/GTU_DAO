import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, hardhat } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'
import { QueryClient } from '@tanstack/react-query'

// ETH Prague Prize Pool Configurations

// 1. World App ($10k) - MiniKit Configuration
export const worldAppConfig = {
  appId: process.env.VITE_WORLD_APP_ID || 'app_staging_your_app_id',
  action: 'gtu-dao-verification',
  signal: 'gtu-dao-kyc',
  enableTelemetry: true,
  walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID
}

// 2. vlayer ($10k) - Zero-Knowledge Proof Configuration
export const vlayerConfig = {
  rpcUrl: process.env.VITE_VLAYER_RPC_URL || 'https://rpc.vlayer.xyz',
  chainId: 31648428,
  contractAddress: process.env.VITE_VLAYER_CONTRACT_ADDRESS,
  verifierContract: process.env.VITE_VLAYER_VERIFIER_ADDRESS
}

// 3. Blockscout ($20k) - Block Explorer Integration
export const blockscoutConfig = {
  apiUrl: 'https://eth.blockscout.com/api',
  wsUrl: 'wss://eth.blockscout.com/socket/websocket',
  explorerUrl: 'https://eth.blockscout.com',
  supportedChains: [1, 11155111, 1337] // mainnet, sepolia, hardhat
}

// Wagmi Configuration
export const config = createConfig({
  chains: [mainnet, sepolia, hardhat],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: 'GTU DAO' }),
    walletConnect({ 
      projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'your_project_id'
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
})

// React Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

// Contract Addresses
export const contractAddresses = {
  // Development
  development: {
    votingContract: process.env.VITE_VOTING_CONTRACT_DEV,
    tokenContract: process.env.VITE_TOKEN_CONTRACT_DEV,
    vlayerVerifier: process.env.VITE_VLAYER_VERIFIER_DEV
  },
  // Production (Sepolia Testnet)
  sepolia: {
    votingContract: process.env.VITE_VOTING_CONTRACT_SEPOLIA,
    tokenContract: process.env.VITE_TOKEN_CONTRACT_SEPOLIA,
    vlayerVerifier: process.env.VITE_VLAYER_VERIFIER_SEPOLIA
  },
  // Mainnet
  mainnet: {
    votingContract: process.env.VITE_VOTING_CONTRACT_MAINNET,
    tokenContract: process.env.VITE_TOKEN_CONTRACT_MAINNET,
    vlayerVerifier: process.env.VITE_VLAYER_VERIFIER_MAINNET
  }
}

// Chain Configuration
export const supportedChains = {
  1: 'Ethereum Mainnet',
  11155111: 'Sepolia Testnet',
  1337: 'Hardhat Local'
}

export const getContractAddresses = (chainId) => {
  switch (chainId) {
    case 1:
      return contractAddresses.mainnet
    case 11155111:
      return contractAddresses.sepolia
    case 1337:
    default:
      return contractAddresses.development
  }
} 