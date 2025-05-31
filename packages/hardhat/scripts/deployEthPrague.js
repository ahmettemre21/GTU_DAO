/**
 * ETH Prague 2025 Deployment Script
 * Deploy all ETH Prague integration contracts
 * Total Prize Pool: $40,000
 */

const hre = require("hardhat");

async function main() {
  console.log("🏆 Deploying ETH Prague 2025 Integration Contracts...");
  console.log("📍 Total Prize Pool: $40,000");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔑 Deploying with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  try {
    // 1. Deploy Blockscout Integration ($20k Prize Pool)
    console.log("\n🔍 1. Deploying Blockscout Integration ($20k)...");
    const BlockscoutIntegration = await hre.ethers.getContractFactory("BlockscoutIntegration");
    const blockscoutContract = await BlockscoutIntegration.deploy("https://eth.blockscout.com/api");
    await blockscoutContract.deployed();
    console.log("✅ Blockscout Integration deployed to:", blockscoutContract.address);

    // 2. Deploy World App Integration ($10k Prize Pool)
    console.log("\n🌍 2. Deploying World App Integration ($10k)...");
    const WorldAppIntegration = await hre.ethers.getContractFactory("WorldAppIntegration");
    const worldAppContract = await WorldAppIntegration.deploy("gtu-dao-miniapp");
    await worldAppContract.deployed();
    console.log("✅ World App Integration deployed to:", worldAppContract.address);

    // 3. Deploy vlayer Integration ($10k Prize Pool)
    console.log("\n🔒 3. Deploying vlayer Integration ($10k)...");
    const VlayerIntegration = await hre.ethers.getContractFactory("VlayerIntegration");
    const vlayerContract = await VlayerIntegration.deploy(deployer.address); // Prover address
    await vlayerContract.deployed();
    console.log("✅ vlayer Integration deployed to:", vlayerContract.address);

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 All ETH Prague 2025 Contracts Deployed Successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Contract addresses summary
    const contractAddresses = {
      BlockscoutIntegration: blockscoutContract.address,
      WorldAppIntegration: worldAppContract.address,
      VlayerIntegration: vlayerContract.address
    };

    console.log("\n📋 Contract Addresses:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🔍 Blockscout Integration: ${contractAddresses.BlockscoutIntegration}`);
    console.log(`🌍 World App Integration:  ${contractAddresses.WorldAppIntegration}`);
    console.log(`🔒 vlayer Integration:     ${contractAddresses.VlayerIntegration}`);

    // Verification instructions
    console.log("\n📝 Verification Commands:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`npx hardhat verify --network <network> ${contractAddresses.BlockscoutIntegration} "https://eth.blockscout.com/api"`);
    console.log(`npx hardhat verify --network <network> ${contractAddresses.WorldAppIntegration} "gtu-dao-miniapp"`);
    console.log(`npx hardhat verify --network <network> ${contractAddresses.VlayerIntegration} "${deployer.address}"`);

    // Integration details
    console.log("\n🏆 ETH Prague 2025 Integration Details:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔍 Blockscout ($20k):");
    console.log("   • Transaction tracking with Merits");
    console.log("   • Smart contract verification");
    console.log("   • Enhanced analytics API");
    console.log("   • SDK integration ready");
    
    console.log("\n🌍 World App ($10k):");
    console.log("   • World ID verification");
    console.log("   • MiniKit SDK integration");
    console.log("   • WLD/USDC payment processing");
    console.log("   • Permission management");
    
    console.log("\n🔒 vlayer ($10k):");
    console.log("   • Web proof verification");
    console.log("   • Email proof validation");
    console.log("   • Time travel capabilities");
    console.log("   • Cross-chain teleport");

    // Save deployment info
    const deploymentInfo = {
      timestamp: new Date().toISOString(),
      network: hre.network.name,
      deployer: deployer.address,
      contracts: contractAddresses,
      hackathon: "ETH Prague 2025",
      totalPrizePool: "$40,000",
      integrations: {
        blockscout: "$20,000",
        worldApp: "$10,000", 
        vlayer: "$10,000"
      }
    };

    // Write to file
    const fs = require('fs');
    fs.writeFileSync(
      './deployment-eth-prague.json',
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\n💾 Deployment info saved to: deployment-eth-prague.json");
    console.log("🚀 Ready for ETH Prague 2025 submission!");

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