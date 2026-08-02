import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Proof of You',
  projectId: '1a07d5bcd528f391e27a15616e941d41', // from cloud.walletconnect.com
  chains: [sepolia],
  ssr: false,
});