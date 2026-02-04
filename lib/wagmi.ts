import { http, createConfig } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [polygon, polygonAmoy],
  connectors: [
    injected({ target: 'metaMask' }), // MetaMask only - no WalletConnect Project ID needed
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: true,
});
