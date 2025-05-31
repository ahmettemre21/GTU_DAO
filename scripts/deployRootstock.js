/**
 * GTU DAO - Rootstock Testnet Deployment Script
 * ETH Prague 2025 - $40k Prize Pool Integration
 * Network: Rootstock Testnet (RSK)
 * Chain ID: 31
 */

const hre = require("hardhat");

async function main() {
  console.log("🏆 Deploying GTU DAO to Rootstock Testnet...");
  console.log("🔗 Network: Rootstock Testnet (Chain ID: 31)");
  console.log("💰 ETH Prague 2025 - $40k Prize Pool Integration");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔑 Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "RBTC");
  
  if (balance === 0n) {
    console.log("❌ No RBTC balance! Get testnet RBTC from: https://faucet.rsk.co");
    process.exit(1);
  }
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  try {
    // 1. Deploy Main Governance Contract
    console.log("\n🏛️ 1. Deploying GTU DAO Governance Contract...");
    const GTUDAOGovernance = await hre.ethers.getContractFactory("GTUDAOGovernance");
    const governance = await GTUDAOGovernance.deploy();
    await governance.waitForDeployment();
    const governanceAddress = await governance.getAddress();
    console.log("✅ GTU DAO Governance deployed to:", governanceAddress);

    // 2. Deploy Blockscout Integration ($20k Prize Pool)
    console.log("\n🔍 2. Deploying Blockscout Integration ($20k)...");
    const BlockscoutIntegration = await hre.ethers.getContractFactory("BlockscoutIntegration");
    const blockscout = await BlockscoutIntegration.deploy("https://rootstock-testnet.blockscout.com/api");
    await blockscout.waitForDeployment();
    const blockscoutAddress = await blockscout.getAddress();
    console.log("✅ Blockscout Integration deployed to:", blockscoutAddress);

    // 3. Deploy World App Integration ($10k Prize Pool)
    console.log("\n🌍 3. Deploying World App Integration ($10k)...");
    const WorldAppIntegration = await hre.ethers.getContractFactory("WorldAppIntegration");
    const worldApp = await WorldAppIntegration.deploy("gtu-dao-miniapp");
    await worldApp.waitForDeployment();
    const worldAppAddress = await worldApp.getAddress();
    console.log("✅ World App Integration deployed to:", worldAppAddress);

    // 4. Deploy vlayer Integration ($10k Prize Pool)
    console.log("\n🔒 4. Deploying vlayer Integration ($10k)...");
    const VlayerIntegration = await hre.ethers.getContractFactory("VlayerIntegration");
    const vlayer = await VlayerIntegration.deploy(deployer.address);
    await vlayer.waitForDeployment();
    const vlayerAddress = await vlayer.getAddress();
    console.log("✅ vlayer Integration deployed to:", vlayerAddress);

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 All Contracts Successfully Deployed to Rootstock Testnet!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Contract Summary
    const contractAddresses = {
      network: "Rootstock Testnet",
      chainId: 31,
      rpcUrl: "https://public-node.testnet.rsk.co",
      blockscoutExplorer: "https://rootstock-testnet.blockscout.com",
      contracts: {
        GTUDAOGovernance: governanceAddress,
        BlockscoutIntegration: blockscoutAddress,
        WorldAppIntegration: worldAppAddress,
        VlayerIntegration: vlayerAddress
      }
    };

    console.log("\n📋 Contract Addresses Summary:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🏛️  GTU DAO Governance:      ${contractAddresses.contracts.GTUDAOGovernance}`);
    console.log(`🔍  Blockscout Integration:  ${contractAddresses.contracts.BlockscoutIntegration}`);
    console.log(`🌍  World App Integration:   ${contractAddresses.contracts.WorldAppIntegration}`);
    console.log(`🔒  vlayer Integration:      ${contractAddresses.contracts.VlayerIntegration}`);

    console.log("\n🌐 Rootstock Testnet Explorer Links:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🏛️  Governance: https://rootstock-testnet.blockscout.com/address/${contractAddresses.contracts.GTUDAOGovernance}`);
    console.log(`🔍  Blockscout: https://rootstock-testnet.blockscout.com/address/${contractAddresses.contracts.BlockscoutIntegration}`);
    console.log(`🌍  World App:  https://rootstock-testnet.blockscout.com/address/${contractAddresses.contracts.WorldAppIntegration}`);
    console.log(`🔒  vlayer:     https://rootstock-testnet.blockscout.com/address/${contractAddresses.contracts.VlayerIntegration}`);

    console.log("\n💰 ETH Prague 2025 Prize Pool Breakdown:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔍 Blockscout:  $20,000 USD");
    console.log("   • Transaction tracking & Merits");
    console.log("   • Smart contract verification");
    console.log("   • Enhanced analytics API");
    
    console.log("\n🌍 World App:   $10,000 USD");
    console.log("   • World ID verification");
    console.log("   • MiniKit SDK integration");
    console.log("   • WLD/USDC payments");
    
    console.log("\n🔒 vlayer:      $10,000 USD");
    console.log("   • Zero-knowledge proofs");
    console.log("   • Web & email verification");
    console.log("   • Privacy-preserving voting");

    // Save deployment info
    const deploymentInfo = {
      timestamp: new Date().toISOString(),
      network: "rootstock_testnet",
      chainId: 31,
      deployer: deployer.address,
      deployerBalance: hre.ethers.formatEther(balance),
      ...contractAddresses,
      hackathon: "ETH Prague 2025",
      totalPrizePool: "$40,000 USD",
      integrations: {
        blockscout: "$20,000 USD",
        worldApp: "$10,000 USD", 
        vlayer: "$10,000 USD"
      }
    };

    // Write deployment info to file
    const fs = require('fs');
    fs.writeFileSync(
      './deployment-rootstock-testnet.json',
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\n💾 Deployment info saved to: deployment-rootstock-testnet.json");
    console.log("🚀 GTU DAO successfully deployed to Rootstock Testnet!");
    console.log("🏆 Ready for ETH Prague 2025 hackathon submission!");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }); 