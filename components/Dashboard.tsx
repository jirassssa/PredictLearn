'use client';

import { useState, useEffect } from 'react';
import { mockUserProgress } from '@/lib/mockData';
import { useMarkets } from '@/hooks/usePolymarket';
import { computeSignalPerformance, getBestSignal } from '@/lib/signalCalculator';
import { SignalPerformance } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  // Start with fallback data immediately (optimistic loading)
  const [signals, setSignals] = useState<SignalPerformance[]>(() =>
    computeSignalPerformance([])
  );
  const [usingFallbackData, setUsingFallbackData] = useState(true);

  const { data: markets, loading, error } = useMarkets(
    { limit: 100, closed: true },
    { refreshInterval: 60000 }
  );

  const progress = mockUserProgress;
  const xpProgress = (progress.xp / progress.xpToNextLevel) * 100;

  // Update with real data when available
  useEffect(() => {
    if (markets && markets.length > 0) {
      const calculatedSignals = computeSignalPerformance(markets);
      setSignals(calculatedSignals);
      setUsingFallbackData(false);
    }
  }, [markets]);

  const signalData = signals.map((s) => ({
    name: s.signalType.toUpperCase(),
    winRate: s.winRate,
    events: s.totalEvents,
  }));

  const bestSignal = signals.length > 0 ? getBestSignal(signals) : null;

  return (
    <div className="space-y-6">
      {/* User Progress Card */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2 group relative">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Level
              <span className="cursor-help" title="Your current level based on XP earned">ℹ️</span>
            </div>
            <div className="text-3xl font-bold text-primary-600">{progress.level}</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" role="progressbar" aria-valuenow={xpProgress} aria-valuemin={0} aria-valuemax={100} aria-label="XP Progress">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {progress.xp} / {progress.xpToNextLevel} XP
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Streak
              <span className="cursor-help" title="Days in a row completing challenges">ℹ️</span>
            </div>
            <div className="text-3xl font-bold text-orange-500">{progress.streak}🔥</div>
            <div className="text-xs text-gray-500">Keep it going!</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              Accuracy
              <span className="cursor-help" title="Percentage of correct predictions">ℹ️</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{progress.accuracy}%</div>
            <div className="text-xs text-gray-500">
              {progress.challengesCompleted} challenges completed
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Badges</div>
            <div className="text-3xl font-bold text-yellow-500">{progress.badges.length}</div>
            <div className="flex gap-1 mt-2">
              {progress.badges.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge.id)}
                  className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                  title={`${badge.name}: ${badge.description}`}
                  aria-label={badge.name}
                >
                  {badge.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signal Performance Overview */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Signal Performance Overview
        </h2>

        {!loading && usingFallbackData && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm flex items-center gap-2">
              <span className="inline-block animate-pulse">📊</span>
              Loading real market data... Showing sample metrics.
            </p>
          </div>
        )}

        {!loading && !usingFallbackData && (
          <p className="text-sm text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
            <span>✅</span>
            Real-time data from {markets?.length || 0} Polymarket markets
          </p>
        )}

        {signalData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="winRate" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Best Signal
          </h3>
          {bestSignal ? (
            <>
              <div className="text-2xl font-bold text-primary-600 uppercase">
                {bestSignal.signalType}
              </div>
              <div className="text-sm text-gray-500">{bestSignal.winRate}% Win Rate</div>
              <div className="text-xs text-gray-400 mt-1">
                Based on {bestSignal.totalEvents} events
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500">Loading...</div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Specialty
          </h3>
          <div className="flex gap-2 mt-2">
            {progress.specialties.map((spec) => (
              <span
                key={spec}
                className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Next Milestone
          </h3>
          <div className="text-2xl font-bold text-yellow-500">Level 13</div>
          <div className="text-sm text-gray-500">
            {progress.xpToNextLevel - progress.xp} XP to go
          </div>
        </div>
      </div>
    </div>
  );
}
