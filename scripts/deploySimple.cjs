/**
 * GTU DAO - Simplified Rootstock Testnet Deployment
 * ETH Prague 2025 - $40k Prize Pool Integration
 * Deploying individual contracts to avoid size limits
 */

const hre = require("hardhat");

async function main() {
  console.log("🏆 Deploying GTU DAO Individual Contracts to Rootstock Testnet...");
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

  const deployedContracts = {};

  try {
    // 1. Deploy StatToken first
    console.log("\n💎 1. Deploying STAT Token...");
    const StatToken = await hre.ethers.getContractFactory("StatToken");
    const statToken = await StatToken.deploy(deployer.address);
    await statToken.waitForDeployment();
    const statTokenAddress = await statToken.getAddress();
    deployedContracts.StatToken = statTokenAddress;
    console.log("✅ STAT Token deployed to:", statTokenAddress);

    // 2. Deploy Blockscout Integration ($20k Prize Pool)
    console.log("\n🔍 2. Deploying Blockscout Integration ($20k)...");
    const BlockscoutIntegration = await hre.ethers.getContractFactory("BlockscoutIntegration");
    const blockscout = await BlockscoutIntegration.deploy("https://rootstock-testnet.blockscout.com/api");
    await blockscout.waitForDeployment();
    const blockscoutAddress = await blockscout.getAddress();
    deployedContracts.BlockscoutIntegration = blockscoutAddress;
    console.log("✅ Blockscout Integration deployed to:", blockscoutAddress);

    // 3. Deploy World App Integration ($10k Prize Pool)
    console.log("\n🌍 3. Deploying World App Integration ($10k)...");
    const WorldAppIntegration = await hre.ethers.getContractFactory("WorldAppIntegration");
    const worldApp = await WorldAppIntegration.deploy("gtu-dao-miniapp");
    await worldApp.waitForDeployment();
    const worldAppAddress = await worldApp.getAddress();
    deployedContracts.WorldAppIntegration = worldAppAddress;
    console.log("✅ World App Integration deployed to:", worldAppAddress);

    // 4. Deploy vlayer Integration ($10k Prize Pool)
    console.log("\n🔒 4. Deploying vlayer Integration ($10k)...");
    const VlayerIntegration = await hre.ethers.getContractFactory("VlayerIntegration");
    const vlayer = await VlayerIntegration.deploy(deployer.address);
    await vlayer.waitForDeployment();
    const vlayerAddress = await vlayer.getAddress();
    deployedContracts.VlayerIntegration = vlayerAddress;
    console.log("✅ vlayer Integration deployed to:", vlayerAddress);

    // 5. Deploy VotingWithWeight
    console.log("\n🗳️  5. Deploying Voting System...");
    const VotingWithWeight = await hre.ethers.getContractFactory("VotingWithWeight");
    const voting = await VotingWithWeight.deploy(statTokenAddress);
    await voting.waitForDeployment();
    const votingAddress = await voting.getAddress();
    deployedContracts.VotingWithWeight = votingAddress;
    console.log("✅ Voting System deployed to:", votingAddress);

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 All ETH Prague Contracts Successfully Deployed!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    console.log("\n📋 Contract Addresses Summary:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`💎 STAT Token:               ${deployedContracts.StatToken}`);
    console.log(`🔍 Blockscout Integration:   ${deployedContracts.BlockscoutIntegration}`);
    console.log(`🌍 World App Integration:    ${deployedContracts.WorldAppIntegration}`);
    console.log(`🔒 vlayer Integration:       ${deployedContracts.VlayerIntegration}`);
    console.log(`🗳️  Voting System:            ${deployedContracts.VotingWithWeight}`);

    console.log("\n🌐 Rootstock Testnet Explorer Links:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    Object.entries(deployedContracts).forEach(([name, address]) => {
      console.log(`${name}: https://rootstock-testnet.blockscout.com/address/${address}`);
    });

    console.log("\n💰 ETH Prague 2025 Prize Pool Integration Complete:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🔍 Blockscout ($20k): Transaction tracking, Merits, Analytics");
    console.log("🌍 World App ($10k): World ID verification, MiniKit SDK");
    console.log("🔒 vlayer ($10k): Zero-knowledge proofs, Privacy features");
    console.log("💎 STAT Token: Governance & reputation system");
    console.log("🗳️  Voting: Weighted voting with STAT tokens");

    // Save deployment info
    const deploymentInfo = {
      timestamp: new Date().toISOString(),
      network: "rootstock_testnet",
      chainId: 31,
      deployer: deployer.address,
      deployerBalance: hre.ethers.formatEther(balance),
      contracts: deployedContracts,
      explorerBase: "https://rootstock-testnet.blockscout.com",
      hackathon: "ETH Prague 2025",
      totalPrizePool: "$40,000 USD",
      integrations: {
        blockscout: "$20,000 USD",
        worldApp: "$10,000 USD", 
        vlayer: "$10,000 USD"
      }
    };

    const fs = require('fs');
    fs.writeFileSync(
      './deployment-rootstock-simple.json',
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\n💾 Deployment info saved to: deployment-rootstock-simple.json");
    console.log("🚀 GTU DAO successfully deployed to Rootstock Testnet!");
    console.log("🏆 Ready for ETH Prague 2025 hackathon submission!");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    console.log("\n📋 Partially deployed contracts:");
    Object.entries(deployedContracts).forEach(([name, address]) => {
      console.log(`✅ ${name}: ${address}`);
    });
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }); 