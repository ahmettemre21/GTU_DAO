import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia, hardhat, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { 
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets'

export const config = getDefaultConfig({
  appName: 'GTU DAO',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c0fac7a0fb8e460a3f3a44ba46f01f04',
  chains: [hardhat, sepolia, mainnet, polygon, polygonMumbai],
  ssr: true, // Enable Server Side Rendering
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        coinbaseWallet,
        injectedWallet,
      ],
    },
  ],
}) 