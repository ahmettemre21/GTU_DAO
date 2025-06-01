import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

const config = getDefaultConfig({
  appName: "GTU DAO",
  projectId: "gtu-dao-ethprague",
  chains: [sepolia, hardhat],
  ssr: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 