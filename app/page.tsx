'use client';

import { useState } from 'react';
import SignalTracker from '@/components/SignalTracker';
import BacktestingPlayground from '@/components/BacktestingPlayground';
import ExplainablePredictions from '@/components/ExplainablePredictions';
import PatternTraining from '@/components/PatternTraining';
import CommunityInsights from '@/components/CommunityInsights';
import Dashboard from '@/components/Dashboard';

type Tab =
  | 'dashboard'
  | 'signals'
  | 'backtest'
  | 'predictions'
  | 'training'
  | 'community';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const tabs = [
    { id: 'dashboard' as Tab, label: '📊 Dashboard', icon: '📊' },
    { id: 'signals' as Tab, label: '📡 Signal Tracker', icon: '📡' },
    { id: 'backtest' as Tab, label: '🔬 Backtesting', icon: '🔬' },
    { id: 'predictions' as Tab, label: '🎯 Predictions', icon: '🎯' },
    { id: 'training' as Tab, label: '🎮 Training', icon: '🎮' },
    { id: 'community' as Tab, label: '👥 Community', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="card p-3">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-heading font-semibold transition-all duration-300 cursor-pointer transform ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:scale-102 shadow-md'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="animate-slide-in">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'signals' && <SignalTracker />}
        {activeTab === 'backtest' && <BacktestingPlayground />}
        {activeTab === 'predictions' && <ExplainablePredictions />}
        {activeTab === 'training' && <PatternTraining />}
        {activeTab === 'community' && <CommunityInsights />}
      </div>
    </div>
  );
}
