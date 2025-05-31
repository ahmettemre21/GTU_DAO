import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, optimism, arbitrum, sepolia, polygonMumbai } from 'wagmi/chains'

// GTU DAO için wallet konfigürasyonu
export const config = getDefaultConfig({
  appName: 'GTU DAO - ETH Prague 2025',
  projectId: 'f8dab9c6cc9c2f611227eca84b24cec6', // Reown Project ID
  chains: [
    mainnet,
    polygon, 
    optimism,
    arbitrum,
    sepolia, // Test network
    polygonMumbai, // Test network
  ],
  ssr: false, // React app olduğu için false
}) 