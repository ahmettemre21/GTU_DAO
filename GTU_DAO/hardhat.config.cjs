require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    },
    rootstock_testnet: {
      url: "https://rpc.testnet.rootstock.io/QAGf1YDAZvCoofOOmFtCf1UPfcReuS-T",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 31,
      gas: 3000000,
      gasPrice: 60000000,
      timeout: 60000
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  // ABI Export Configuration
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  }
};

// Custom task to export ABIs to frontend
const { task } = require("hardhat/config");
const fs = require('fs');
const path = require('path');

task("export-abis", "Export contract ABIs to frontend")
  .setAction(async (taskArgs, hre) => {
    console.log("🔄 Exporting contract ABIs...");
    
    const artifactsDir = path.join(__dirname, "artifacts", "contracts");
    const abiExportDir = path.join(__dirname, "src", "contracts");
    
    // Create ABI export directory if it doesn't exist
    if (!fs.existsSync(abiExportDir)) {
      fs.mkdirSync(abiExportDir, { recursive: true });
    }
    
    // Contract names to export
    const contractsToExport = [
      "StatToken",
      "VotingWithWeight", 
      "BlockscoutIntegration",
      "WorldAppIntegration",
      "VlayerIntegration",
      "GTUDAOGovernance"
    ];
    
    const exportedContracts = {};
    
    for (const contractName of contractsToExport) {
      try {
        const artifactPath = path.join(artifactsDir, `${contractName}.sol`, `${contractName}.json`);
        
        if (fs.existsSync(artifactPath)) {
          const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
          
          // Extract ABI and bytecode
          exportedContracts[contractName] = {
            abi: artifact.abi,
            bytecode: artifact.bytecode,
            contractName: contractName
          };
          
          // Save individual ABI file
          fs.writeFileSync(
            path.join(abiExportDir, `${contractName}.json`),
            JSON.stringify({
              contractName: contractName,
              abi: artifact.abi,
              bytecode: artifact.bytecode
            }, null, 2)
          );
          
          console.log(`✅ Exported ${contractName} ABI`);
        } else {
          console.log(`⚠️  ${contractName} artifact not found`);
        }
      } catch (error) {
        console.error(`❌ Error exporting ${contractName}:`, error.message);
      }
    }
    
    // Create a combined contracts file
    const combinedFile = {
      timestamp: new Date().toISOString(),
      network: "rootstock_testnet",
      contracts: exportedContracts
    };
    
    fs.writeFileSync(
      path.join(abiExportDir, "index.js"),
      `// Auto-generated contract ABIs\n// Generated on: ${new Date().toISOString()}\n\nexport const contracts = ${JSON.stringify(exportedContracts, null, 2)};\n\nexport default contracts;`
    );
    
    console.log(`🎉 Successfully exported ${Object.keys(exportedContracts).length} contract ABIs`);
    console.log(`📁 ABIs saved to: ${abiExportDir}`);
  });

// Auto-export ABIs after compilation
task("compile", "Compiles the entire project, building all artifacts")
  .setAction(async (taskArgs, hre, runSuper) => {
    await runSuper(taskArgs);
    await hre.run("export-abis");
  }); 