import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { polygon, polygonAmoy } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PredictLearn',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c9c9d8a4e15f8c5e3b2e9f3d7c6a8b1e',
  chains: [polygon, polygonAmoy],
  ssr: true,
});
