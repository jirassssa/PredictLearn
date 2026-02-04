'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-indigo-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a href="/landing" className="flex items-center space-x-4 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                PredictLearn
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Master prediction markets with real data
              </p>
            </div>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-sm font-heading font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
              Dashboard
            </a>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
