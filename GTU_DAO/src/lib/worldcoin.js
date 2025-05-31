import { MiniKit } from '@worldcoin/minikit-js'
import { VerificationLevel } from '@worldcoin/id'

// World App MiniKit Configuration for ETH Prague ($10k Prize Pool)
export class WorldcoinService {
  constructor() {
    this.minikit = null
    this.isInitialized = false
    
    this.config = {
      appId: process.env.VITE_WORLD_APP_ID || 'app_staging_gtu_dao',
      action: 'gtu-dao-kyc-verification',
      signal: 'gtu-dao-member-verification',
      enableTelemetry: true,
      walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID
    }
  }

  async initialize() {
    try {
      if (!this.isInitialized) {
        this.minikit = new MiniKit({
          appId: this.config.appId,
          enableTelemetry: this.config.enableTelemetry
        })
        
        await this.minikit.install()
        this.isInitialized = true
        
        console.log('World App MiniKit initialized successfully')
        return true
      }
      return true
    } catch (error) {
      console.error('Failed to initialize World App MiniKit:', error)
      return false
    }
  }

  async verifyWithWorldID(userAddress) {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const verification = await this.minikit.verifyAction({
        action: this.config.action,
        signal: userAddress || this.config.signal,
        verification_level: VerificationLevel.Orb
      })

      if (verification.success) {
        return {
          success: true,
          proof: verification.proof,
          merkle_root: verification.merkle_root,
          nullifier_hash: verification.nullifier_hash,
          verification_level: verification.verification_level
        }
      } else {
        throw new Error(verification.error || 'Verification failed')
      }
    } catch (error) {
      console.error('World ID verification failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async connectWallet() {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const wallet = await this.minikit.connectWallet()
      
      if (wallet.success) {
        return {
          success: true,
          address: wallet.address,
          chainId: wallet.chainId
        }
      } else {
        throw new Error('Wallet connection failed')
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async sendTransaction(to, value, data = '0x') {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const result = await this.minikit.sendTransaction({
        to,
        value,
        data
      })

      return {
        success: true,
        hash: result.hash
      }
    } catch (error) {
      console.error('Transaction failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  async signMessage(message) {
    try {
      if (!this.isInitialized) {
        await this.initialize()
      }

      const result = await this.minikit.signMessage(message)
      
      return {
        success: true,
        signature: result.signature
      }
    } catch (error) {
      console.error('Message signing failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  isWorldAppUser() {
    return this.minikit?.isWorldApp() || false
  }

  getUserInfo() {
    return this.minikit?.getUserInfo() || null
  }
}

// Create singleton instance
export const worldcoinService = new WorldcoinService()

// Utility functions for React components
export const useWorldcoin = () => {
  return {
    verify: (userAddress) => worldcoinService.verifyWithWorldID(userAddress),
    connectWallet: () => worldcoinService.connectWallet(),
    sendTransaction: (to, value, data) => worldcoinService.sendTransaction(to, value, data),
    signMessage: (message) => worldcoinService.signMessage(message),
    isWorldApp: () => worldcoinService.isWorldAppUser(),
    getUserInfo: () => worldcoinService.getUserInfo(),
    initialize: () => worldcoinService.initialize()
  }
} 