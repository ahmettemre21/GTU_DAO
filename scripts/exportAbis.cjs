/**
 * GTU DAO - Contract ABI Export Script
 * Exports contract ABIs to frontend for easy integration
 */

const fs = require('fs');
const path = require('path');

async function exportAbis() {
  console.log("🔄 Starting ABI export process...");
  
  const artifactsDir = path.join(__dirname, "..", "artifacts", "contracts");
  const abiExportDir = path.join(__dirname, "..", "src", "contracts");
  
  // Create export directory
  if (!fs.existsSync(abiExportDir)) {
    fs.mkdirSync(abiExportDir, { recursive: true });
    console.log(`📁 Created directory: ${abiExportDir}`);
  }
  
  // Contract addresses on Rootstock Testnet
  const contractAddresses = {
    STAT_TOKEN: '0xc4B9fa8ac76de5c12Eee13Ee88DCd2423C5e1eC0',
    BLOCKSCOUT_INTEGRATION: '0xE07B774D488B72cA1112a5931dB2e1E961ce431d',
    WORLDAPP_INTEGRATION: '0xF2BDd0241a2eC462B849C4397349A87878E4EEB2',
    VLAYER_INTEGRATION: '0xC7304a7780acaD3044e0ED6b780ab090376684B5',
    VOTING_SYSTEM: '0x59cfbE10adcDcd418F386BE1B7d85C425579bE54'
  };
  
  // Contracts to export
  const contractsToExport = [
    { name: "StatToken", fileName: "StatToken.sol" },
    { name: "VotingWithWeight", fileName: "VotingWithWeight.sol" },
    { name: "BlockscoutIntegration", fileName: "BlockscoutIntegration.sol" },
    { name: "WorldAppIntegration", fileName: "WorldAppIntegration.sol" },
    { name: "VlayerIntegration", fileName: "VlayerIntegration.sol" },
    { name: "GTUDAOGovernance", fileName: "GTUDAOGovernance.sol" }
  ];
  
  const exportedContracts = {};
  
  for (const contract of contractsToExport) {
    try {
      const artifactPath = path.join(artifactsDir, contract.fileName, `${contract.name}.json`);
      
      if (fs.existsSync(artifactPath)) {
        const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
        
        // Get contract address if available
        const addressKey = Object.keys(contractAddresses).find(key => 
          contractAddresses[key] && contract.name.toLowerCase().includes(key.toLowerCase().split('_')[0])
        );
        
        const contractInfo = {
          name: contract.name,
          abi: artifact.abi,
          bytecode: artifact.bytecode,
          address: addressKey ? contractAddresses[addressKey] : null,
          network: "rootstock_testnet"
        };
        
        exportedContracts[contract.name] = contractInfo;
        
        // Save individual contract file
        fs.writeFileSync(
          path.join(abiExportDir, `${contract.name}.json`),
          JSON.stringify(contractInfo, null, 2)
        );
        
        console.log(`✅ Exported ${contract.name}`);
      } else {
        console.log(`⚠️  ${contract.name} artifact not found at: ${artifactPath}`);
      }
    } catch (error) {
      console.error(`❌ Error exporting ${contract.name}:`, error.message);
    }
  }
  
  // Create contracts index file
  const contractsIndex = `// Auto-generated contract ABIs and addresses
// Generated on: ${new Date().toISOString()}
// Network: Rootstock Testnet

export const NETWORK_CONFIG = {
  chainId: 31,
  name: 'Rootstock Testnet',
  rpcUrl: 'https://rpc.testnet.rootstock.io/QAGf1YDAZvCoofOOmFtCf1UPfcReuS-T',
  explorerUrl: 'https://rootstock-testnet.blockscout.com',
  currency: {
    name: 'Test RBTC',
    symbol: 'RBTC',
    decimals: 18
  }
};

export const CONTRACT_ADDRESSES = {
  STAT_TOKEN: '${contractAddresses.STAT_TOKEN}',
  BLOCKSCOUT_INTEGRATION: '${contractAddresses.BLOCKSCOUT_INTEGRATION}',
  WORLDAPP_INTEGRATION: '${contractAddresses.WORLDAPP_INTEGRATION}',
  VLAYER_INTEGRATION: '${contractAddresses.VLAYER_INTEGRATION}',
  VOTING_SYSTEM: '${contractAddresses.VOTING_SYSTEM}'
};

export const contracts = ${JSON.stringify(exportedContracts, null, 2)};

export default contracts;
`;
  
  fs.writeFileSync(path.join(abiExportDir, "index.js"), contractsIndex);
  
  // Create TypeScript declarations
  const tsDeclarations = `// Auto-generated TypeScript declarations
export interface ContractInfo {
  name: string;
  abi: any[];
  bytecode: string;
  address: string | null;
  network: string;
}

export interface Contracts {
  [key: string]: ContractInfo;
}

export declare const contracts: Contracts;
export declare const CONTRACT_ADDRESSES: {
  STAT_TOKEN: string;
  BLOCKSCOUT_INTEGRATION: string;
  WORLDAPP_INTEGRATION: string;
  VLAYER_INTEGRATION: string;
  VOTING_SYSTEM: string;
};

export declare const NETWORK_CONFIG: {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
};
`;
  
  fs.writeFileSync(path.join(abiExportDir, "index.d.ts"), tsDeclarations);
  
  console.log(`🎉 Successfully exported ${Object.keys(exportedContracts).length} contracts`);
  console.log(`📁 ABIs exported to: ${abiExportDir}`);
  console.log(`🔗 Contract addresses included for Rootstock Testnet`);
  
  return exportedContracts;
}

// Run if called directly
if (require.main === module) {
  exportAbis().catch(console.error);
}

module.exports = { exportAbis }; 