/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Webpack Configuration
  webpack: (config, { dev, isServer }) => {
    // Fallbacks for client-side
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };

    // Fix for viem ESM issues
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };

    // Optimize for development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // External packages to avoid bundling issues
    if (!isServer) {
      config.externals.push({
        'pino-pretty': 'pino-pretty',
        'lokijs': 'lokijs', 
        'encoding': 'encoding'
      });
    }

    // Fix viem import issues
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },

  // Environment Variables
  env: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_WORLD_APP_ID: process.env.NEXT_PUBLIC_WORLD_APP_ID,
  },

  // Performance optimizations
  experimental: {
    esmExternals: 'loose',
  },
  
  // Image optimization
  images: {
    domains: [],
    unoptimized: true,
  },

  // Transpile packages that need it
  transpilePackages: ['@rainbow-me/rainbowkit', 'wagmi', 'viem'],
}

module.exports = nextConfig 