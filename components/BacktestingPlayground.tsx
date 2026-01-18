'use client';

import { useState } from 'react';
import { mockBacktestResult } from '@/lib/mockData';
import { SignalType } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BacktestingPlayground() {
  const [selectedSignals, setSelectedSignals] = useState<SignalType[]>(['twitter', 'whales']);
  const [condition, setCondition] = useState<'ALL' | 'ANY'>('ALL');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(mockBacktestResult);
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const availableSignals: SignalType[] = ['twitter', 'whales', 'news', 'volume'];

  const profitOverTime = result.trades.map((trade, i) => ({
    index: i + 1,
    profit: trade.profit,
    cumulative: result.trades.slice(0, i + 1).reduce((sum, t) => sum + t.profit, 0)
  }));

  const toggleSignal = (signal: SignalType) => {
    setSelectedSignals((prev) =>
      prev.includes(signal) ? prev.filter((s) => s !== signal) : [...prev, signal]
    );
  };

  const runBacktest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const exportResults = () => {
    const csvContent = [
      ['Event', 'Entry', 'Exit', 'Profit', 'Date'],
      ...result.trades.map(t => [t.eventId, t.entryOdds, t.exitOdds, t.profit, t.timestamp])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backtest-results-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🔬 Backtesting Playground
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Test your strategy with historical data
        </p>

        {/* Strategy Builder */}
        <div className="space-y-6">
          {/* Time Range & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Time Range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="all">All Categories</option>
                <option value="crypto">Crypto</option>
                <option value="politics">Politics</option>
                <option value="sports">Sports</option>
              </select>
            </div>
          </div>

          {/* Signal Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Select Signals
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSignals.map((signal) => (
                <button
                  key={signal}
                  onClick={() => toggleSignal(signal)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedSignals.includes(signal)
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900 dark:text-white capitalize">
                    {signal}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedSignals.includes(signal) ? '✅ Selected' : 'Click to add'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              Condition
              <span className="text-sm text-gray-500 cursor-help" title="ALL (AND) requires all signals to agree. ANY (OR) requires at least one signal to agree.">ℹ️</span>
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setCondition('ALL')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                  condition === 'ALL'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white">ALL (AND)</div>
                <div className="text-sm text-gray-500">All signals must agree</div>
              </button>
              <button
                onClick={() => setCondition('ANY')}
                className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                  condition === 'ANY'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white">ANY (OR)</div>
                <div className="text-sm text-gray-500">At least one signal agrees</div>
              </button>
            </div>
          </div>

          <button
            onClick={runBacktest}
            disabled={isRunning || selectedSignals.length === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isRunning || selectedSignals.length === 0
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            {isRunning ? '🔄 Running Backtest...' : '▶️ Run Backtest'}
          </button>
        </div>
      </div>

      {/* Results */}
      {!isRunning && (
        <>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Backtest Results
              </h3>
              <button
                onClick={exportResults}
                className="btn-secondary flex items-center gap-2"
              >
                📥 Export CSV
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="text-sm text-blue-600 dark:text-blue-400">Signals Generated</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.signalsGenerated}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="text-sm text-green-600 dark:text-green-400">Win Rate</div>
                <div className="text-2xl font-bold text-green-600">{result.winRate}%</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="text-sm text-purple-600 dark:text-purple-400">Average Profit</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  +{result.averageProfit}%
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <div className="text-sm text-yellow-600 dark:text-yellow-400">Sharpe Ratio</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.sharpeRatio}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Best Trade</div>
                <div className="text-xl font-bold text-green-600">+{result.bestTrade}%</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Worst Trade</div>
                <div className="text-xl font-bold text-red-600">{result.worstTrade}%</div>
              </div>
            </div>

            {/* Profit Chart */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Cumulative Profit Over Time
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={profitOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label={{ value: 'Trade #', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Profit (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="cumulative" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg p-4 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Performance Summary
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {result.profitableTrades} profitable out of {result.signalsGenerated} trades
                  </div>
                </div>
                <div className="text-3xl">
                  {result.winRate >= 70 ? '🎉' : result.winRate >= 60 ? '👍' : '📊'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
