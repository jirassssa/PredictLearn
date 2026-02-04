'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600 dark:text-green-400 font-medium">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400 font-semibold transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        const injectedConnector = connectors.find(c => c.type === 'injected');
        if (injectedConnector) {
          connect({ connector: injectedConnector });
        }
      }}
      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
    >
      Connect Wallet
    </button>
  );
}
