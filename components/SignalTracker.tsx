'use client';

import { useEffect, useState } from 'react';
import { Twitter, Waves, Newspaper, BarChart3, Info } from 'lucide-react';
import { useMarkets } from '@/hooks/usePolymarket';
import { computeSignalPerformance, getBestSignal, SIGNAL_EXPLANATIONS } from '@/lib/signalCalculator';
import { SignalPerformance } from '@/types';

export default function SignalTracker() {
  const { data: markets, loading, error } = useMarkets(
    { limit: 100, closed: true },
    { refreshInterval: 60000 }
  );

  const [signals, setSignals] = useState<SignalPerformance[]>([]);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);

  useEffect(() => {
    if (markets && markets.length > 0) {
      const calculatedSignals = computeSignalPerformance(markets);
      setSignals(calculatedSignals);
    }
  }, [markets]);

  const getSignalIcon = (signalType: string) => {
    const icons: Record<string, any> = {
      twitter: Twitter,
      whales: Waves,
      news: Newspaper,
      volume: BarChart3,
    };
    return icons[signalType] || BarChart3;
  };

  const getAccuracyColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-600';
    if (winRate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const bestSignal = signals.length > 0 ? getBestSignal(signals) : null;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Signal Impact Tracker
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Track the performance and accuracy of each prediction signal derived from real Polymarket data
        </p>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading market data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 font-semibold">Error loading data:</p>
            <p className="text-red-700 dark:text-red-300 text-sm">{error.message}</p>
          </div>
        )}

        {!loading && !error && signals.length > 0 && (
          <div className="space-y-4">
            {signals.map((signal) => {
              const Icon = getSignalIcon(signal.signalType);
              const explanation = SIGNAL_EXPLANATIONS[signal.signalType];

              return (
              <div
                key={signal.signalType}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                          {explanation?.title || `${signal.signalType} Signal`}
                        </h3>
                        <button
                          onClick={() =>
                            setShowExplanation(
                              showExplanation === signal.signalType ? null : signal.signalType
                            )
                          }
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                          aria-label="Show explanation"
                        >
                          <Info className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        {signal.correctPredictions}/{signal.totalEvents} events
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getAccuracyColor(signal.winRate)}`}>
                      {signal.winRate}%
                    </div>
                    <div className="text-sm text-gray-500">Win Rate</div>
                  </div>
                </div>

                {showExplanation === signal.signalType && explanation && (
                  <div className="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>How it works:</strong> {explanation.howItWorks}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {explanation.description}
                    </p>
                  </div>
                )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Average Lead Time
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {signal.averageLeadTime}h
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Correlation Score
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {signal.correlationScore.toFixed(2)}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Events</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {signal.totalEvents}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Correct</div>
                  <div className="text-lg font-semibold text-green-600">
                    {signal.correctPredictions}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Performance by Category
                </div>
                <div className="space-y-2">
                  {signal.categoryBreakdown.map((cat) => (
                    <div key={cat.category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cat.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              cat.accuracy >= 70
                                ? 'bg-green-500'
                                : cat.accuracy >= 60
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${cat.accuracy}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                          {cat.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Insights */}
      {!loading && !error && bestSignal && (
        <div className="card p-6 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Key Insights</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 text-green-600">✓</span>
              <span>
                <strong className="capitalize">{bestSignal.signalType}</strong> signal has the best
                win rate ({bestSignal.winRate}%) with {bestSignal.averageLeadTime}h average lead time
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">ⓘ</span>
              <span>
                Analyzed {markets?.length || 0} real Polymarket markets to derive these metrics
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-purple-600">★</span>
              <span>
                Click the <Info className="inline w-3 h-3" /> icon next to each signal to learn how
                it's calculated from market data
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
