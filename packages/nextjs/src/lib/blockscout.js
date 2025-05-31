import axios from 'axios'
import { blockscoutConfig } from '../config/blockchain.js'

// Blockscout Block Explorer Service for ETH Prague ($20k Prize Pool)
export class BlockscoutService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: blockscoutConfig.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.wsConnection = null
    this.subscribers = new Map()
  }

  // Get transaction details
  async getTransaction(txHash) {
    try {
      const response = await this.apiClient.get(`/v2/transactions/${txHash}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get transaction:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get contract details
  async getContract(contractAddress) {
    try {
      const response = await this.apiClient.get(`/v2/addresses/${contractAddress}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get contract:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get contract source code
  async getContractSource(contractAddress) {
    try {
      const response = await this.apiClient.get(`/v2/addresses/${contractAddress}/contracts`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get contract source:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get token transfers
  async getTokenTransfers(contractAddress, page = 1, limit = 50) {
    try {
      const response = await this.apiClient.get(
        `/v2/addresses/${contractAddress}/token-transfers`,
        {
          params: { page, limit }
        }
      )
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get token transfers:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get address transactions
  async getAddressTransactions(address, page = 1, limit = 50) {
    try {
      const response = await this.apiClient.get(
        `/v2/addresses/${address}/transactions`,
        {
          params: { page, limit }
        }
      )
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get address transactions:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get block details
  async getBlock(blockNumber) {
    try {
      const response = await this.apiClient.get(`/v2/blocks/${blockNumber}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get block:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get contract events/logs
  async getContractLogs(contractAddress, fromBlock = 'latest', toBlock = 'latest') {
    try {
      const response = await this.apiClient.get(
        `/v2/addresses/${contractAddress}/logs`,
        {
          params: {
            from_block: fromBlock,
            to_block: toBlock
          }
        }
      )
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get contract logs:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Search functionality
  async search(query) {
    try {
      const response = await this.apiClient.get('/v2/search', {
        params: { q: query }
      })
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to search:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get statistics
  async getStats() {
    try {
      const response = await this.apiClient.get('/v2/stats')
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get stats:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get market cap and token info
  async getTokenInfo(contractAddress) {
    try {
      const response = await this.apiClient.get(`/v2/tokens/${contractAddress}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get token info:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get contract read functions
  async getContractReadMethods(contractAddress) {
    try {
      const response = await this.apiClient.get(
        `/v2/addresses/${contractAddress}/methods-read`
      )
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get contract read methods:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get contract write functions
  async getContractWriteMethods(contractAddress) {
    try {
      const response = await this.apiClient.get(
        `/v2/addresses/${contractAddress}/methods-write`
      )
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Failed to get contract write methods:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // WebSocket connection for real-time updates
  connectWebSocket() {
    try {
      this.wsConnection = new WebSocket(blockscoutConfig.wsUrl)
      
      this.wsConnection.onopen = () => {
        console.log('Blockscout WebSocket connected')
      }

      this.wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.handleWebSocketMessage(data)
      }

      this.wsConnection.onerror = (error) => {
        console.error('Blockscout WebSocket error:', error)
      }

      this.wsConnection.onclose = () => {
        console.log('Blockscout WebSocket disconnected')
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connectWebSocket(), 5000)
      }
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
    }
  }

  // Handle WebSocket messages
  handleWebSocketMessage(data) {
    const { topic, payload } = data
    
    if (this.subscribers.has(topic)) {
      const callbacks = this.subscribers.get(topic)
      callbacks.forEach(callback => callback(payload))
    }
  }

  // Subscribe to WebSocket events
  subscribe(topic, callback) {
    if (!this.subscribers.has(topic)) {
      this.subscribers.set(topic, [])
    }
    this.subscribers.get(topic).push(callback)

    // Subscribe to topic via WebSocket
    if (this.wsConnection && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify({
        topic: 'phoenix',
        event: 'phx_join',
        payload: {},
        ref: Date.now()
      }))
    }
  }

  // Unsubscribe from WebSocket events
  unsubscribe(topic, callback) {
    if (this.subscribers.has(topic)) {
      const callbacks = this.subscribers.get(topic)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
      if (callbacks.length === 0) {
        this.subscribers.delete(topic)
      }
    }
  }

  // Generate explorer URL for transaction
  getTransactionUrl(txHash) {
    return `${blockscoutConfig.explorerUrl}/tx/${txHash}`
  }

  // Generate explorer URL for address
  getAddressUrl(address) {
    return `${blockscoutConfig.explorerUrl}/address/${address}`
  }

  // Generate explorer URL for block
  getBlockUrl(blockNumber) {
    return `${blockscoutConfig.explorerUrl}/block/${blockNumber}`
  }

  // Generate explorer URL for token
  getTokenUrl(contractAddress) {
    return `${blockscoutConfig.explorerUrl}/token/${contractAddress}`
  }
}

// Create singleton instance
export const blockscoutService = new BlockscoutService()

// React hook for Blockscout functionality
export const useBlockscout = () => {
  return {
    getTransaction: (txHash) => blockscoutService.getTransaction(txHash),
    getContract: (contractAddress) => blockscoutService.getContract(contractAddress),
    getContractSource: (contractAddress) => blockscoutService.getContractSource(contractAddress),
    getTokenTransfers: (contractAddress, page, limit) => 
      blockscoutService.getTokenTransfers(contractAddress, page, limit),
    getAddressTransactions: (address, page, limit) => 
      blockscoutService.getAddressTransactions(address, page, limit),
    getBlock: (blockNumber) => blockscoutService.getBlock(blockNumber),
    getContractLogs: (contractAddress, fromBlock, toBlock) => 
      blockscoutService.getContractLogs(contractAddress, fromBlock, toBlock),
    search: (query) => blockscoutService.search(query),
    getStats: () => blockscoutService.getStats(),
    getTokenInfo: (contractAddress) => blockscoutService.getTokenInfo(contractAddress),
    getContractReadMethods: (contractAddress) => 
      blockscoutService.getContractReadMethods(contractAddress),
    getContractWriteMethods: (contractAddress) => 
      blockscoutService.getContractWriteMethods(contractAddress),
    subscribe: (topic, callback) => blockscoutService.subscribe(topic, callback),
    unsubscribe: (topic, callback) => blockscoutService.unsubscribe(topic, callback),
    connectWebSocket: () => blockscoutService.connectWebSocket(),
    getTransactionUrl: (txHash) => blockscoutService.getTransactionUrl(txHash),
    getAddressUrl: (address) => blockscoutService.getAddressUrl(address),
    getBlockUrl: (blockNumber) => blockscoutService.getBlockUrl(blockNumber),
    getTokenUrl: (contractAddress) => blockscoutService.getTokenUrl(contractAddress)
  }
} 