const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 GTU DAO Deployment Started - ETH Prague 2025 ($40k Prize Pool)");
  console.log("═".repeat(70));
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());
  console.log("");

  // Deploy contracts in dependency order
  let deployedContracts = {};

  try {
    // 1. Deploy StatToken (Independent)
    console.log("1️⃣  Deploying StatToken (Soulbound Governance Token)...");
    const StatToken = await ethers.getContractFactory("StatToken");
    const statToken = await StatToken.deploy();
    await statToken.deployed();
    deployedContracts.StatToken = statToken.address;
    console.log("✅ StatToken deployed to:", statToken.address);
    console.log("");

    // 2. Deploy VotingWithWeight (Depends on StatToken)
    console.log("2️⃣  Deploying VotingWithWeight (STAT-weighted voting)...");
    const VotingWithWeight = await ethers.getContractFactory("VotingWithWeight");
    const voting = await VotingWithWeight.deploy(statToken.address);
    await voting.deployed();
    deployedContracts.VotingWithWeight = voting.address;
    console.log("✅ VotingWithWeight deployed to:", voting.address);
    console.log("");

    // 3. Deploy WorldIDVerifier (World App - $10k Prize Pool)
    console.log("3️⃣  Deploying WorldIDVerifier (World App - $10k Prize)...");
    const WorldIDVerifier = await ethers.getContractFactory("WorldIDVerifier");
    const worldVerifier = await WorldIDVerifier.deploy(
      "gtu_dao_app",      // App ID
      "member_verification" // Action ID
    );
    await worldVerifier.deployed();
    deployedContracts.WorldIDVerifier = worldVerifier.address;
    console.log("✅ WorldIDVerifier deployed to:", worldVerifier.address);
    console.log("");

    // 4. Deploy VlayerZKVerifier (vlayer - $10k Prize Pool)
    console.log("4️⃣  Deploying VlayerZKVerifier (vlayer ZK - $10k Prize)...");
    const VlayerZKVerifier = await ethers.getContractFactory("VlayerZKVerifier");
    const vlayerVerifier = await VlayerZKVerifier.deploy(
      "0x0000000000000000000000000000000000000000" // Placeholder for vlayer verifier
    );
    await vlayerVerifier.deployed();
    deployedContracts.VlayerZKVerifier = vlayerVerifier.address;
    console.log("✅ VlayerZKVerifier deployed to:", vlayerVerifier.address);
    console.log("");

    // 5. Deploy BlockscoutRegistry (Blockscout - $20k Prize Pool)
    console.log("5️⃣  Deploying BlockscoutRegistry (Blockscout - $20k Prize)...");
    const BlockscoutRegistry = await ethers.getContractFactory("BlockscoutRegistry");
    const blockscoutRegistry = await BlockscoutRegistry.deploy(
      deployer.address // Blockscout operator
    );
    await blockscoutRegistry.deployed();
    deployedContracts.BlockscoutRegistry = blockscoutRegistry.address;
    console.log("✅ BlockscoutRegistry deployed to:", blockscoutRegistry.address);
    console.log("");

    // 6. Deploy GTUDAOGovernance (Main governance contract)
    console.log("6️⃣  Deploying GTUDAOGovernance (Main governance)...");
    const GTUDAOGovernance = await ethers.getContractFactory("GTUDAOGovernance");
    const governance = await GTUDAOGovernance.deploy();
    await governance.deployed();
    deployedContracts.GTUDAOGovernance = governance.address;
    console.log("✅ GTUDAOGovernance deployed to:", governance.address);
    console.log("");

    // Setup permissions and connections
    console.log("🔧 Setting up contract permissions and connections...");
    
    // Give VotingWithWeight minting permissions for STAT tokens
    await statToken.transferOwnership(voting.address);
    console.log("✅ StatToken ownership transferred to VotingWithWeight");

    // Give GTUDAOGovernance minting permissions for STAT tokens  
    await voting.updateAdmin(governance.address);
    console.log("✅ VotingWithWeight admin updated to GTUDAOGovernance");

    // Update governance contract with deployed addresses
    await governance.updateContracts(
      statToken.address,
      voting.address, 
      worldVerifier.address,
      vlayerVerifier.address,
      blockscoutRegistry.address
    );
    console.log("✅ GTUDAOGovernance updated with contract addresses");

    console.log("");
    console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
    console.log("═".repeat(70));
    console.log("📋 DEPLOYED CONTRACTS SUMMARY:");
    console.log("═".repeat(70));
    
    for (const [name, address] of Object.entries(deployedContracts)) {
      console.log(`${name.padEnd(20)} : ${address}`);
    }

    console.log("");
    console.log("🏆 ETH PRAGUE 2025 INTEGRATIONS:");
    console.log("═".repeat(70));
    console.log("🌍 World App ($10k)    : Identity verification with World ID");
    console.log("🔒 vlayer ($10k)       : Zero-knowledge proofs for privacy");
    console.log("🔍 Blockscout ($20k)   : Enhanced blockchain transparency");
    console.log("💰 Total Prize Pool    : $40,000");

    console.log("");
    console.log("📝 NEXT STEPS:");
    console.log("═".repeat(70));
    console.log("1. Copy contract addresses to frontend configuration");
    console.log("2. Verify contracts on block explorer");
    console.log("3. Set up Blockscout indexing");
    console.log("4. Configure World App MiniKit integration");
    console.log("5. Set up vlayer ZK circuit compilation");

    // Save deployment info to file
    const fs = require('fs');
    const deploymentInfo = {
      network: hre.network.name,
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      contracts: deployedContracts,
      ethPragueIntegrations: {
        worldApp: { prize: "$10k", contract: deployedContracts.WorldIDVerifier },
        vlayer: { prize: "$10k", contract: deployedContracts.VlayerZKVerifier },
        blockscout: { prize: "$20k", contract: deployedContracts.BlockscoutRegistry }
      }
    };

    fs.writeFileSync(
      'deployment-info.json', 
      JSON.stringify(deploymentInfo, null, 2)
    );
    console.log("");
    console.log("💾 Deployment info saved to: deployment-info.json");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment script failed:", error);
    process.exit(1);
  }); 