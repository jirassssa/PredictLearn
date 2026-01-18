'use client';

import { mockAnalysts, mockInsights } from '@/lib/mockData';
import { formatDistanceToNow } from 'date-fns';

export default function CommunityInsights() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          👥 Community Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Learn from top analysts and share your strategies
        </p>
      </div>

      {/* Top Analysts */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 Top Analysts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAnalysts.map((analyst) => (
            <div
              key={analyst.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {analyst.username.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {analyst.username}
                      </span>
                      {analyst.verified && <span className="text-blue-500">✓</span>}
                    </div>
                    <div className="text-sm text-gray-500">{analyst.followers} followers</div>
                  </div>
                </div>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1 rounded-lg text-sm font-semibold">
                  Follow
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analyst.winRate}%</div>
                  <div className="text-xs text-gray-500">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyst.totalPredictions}
                  </div>
                  <div className="text-xs text-gray-500">Predictions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    +{analyst.averageProfit}%
                  </div>
                  <div className="text-xs text-gray-500">Avg Profit</div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </div>
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                  {analyst.specialty}
                </span>
              </div>

              <div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Signals
                </div>
                <div className="space-y-2">
                  {analyst.preferredSignals.map((signal) => (
                    <div key={signal.signalType} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize min-w-[80px]">
                        {signal.signalType}
                      </span>
                      <div className="flex items-center gap-2 flex-1">
                        <div className="flex-1 max-w-[100px] bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-primary-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${signal.weight}%` }}
                            title={`${signal.weight}% weight`}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[40px] text-right">
                          {signal.weight}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Insights */}
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          💡 Recent Insights
        </h3>
        <div className="space-y-4">
          {mockInsights.map((insight) => (
            <div
              key={insight.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {insight.analyst.username.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {insight.analyst.username}
                    </span>
                    {insight.analyst.verified && <span className="text-blue-500">✓</span>}
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(insight.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{insight.content}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {insight.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="hover:text-primary-600 transition-colors">
                      👍 {insight.likes}
                    </button>
                    <button className="hover:text-primary-600 transition-colors">
                      💬 {insight.comments}
                    </button>
                    <button className="hover:text-primary-600 transition-colors">📊 View Strategy</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Your Insight */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          ✍️ Share Your Insight
        </h3>
        <textarea
          className="w-full input min-h-[100px] mb-4"
          placeholder="Share your trading insights with the community..."
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            💡 Tip: High-quality insights earn bonus XP
          </div>
          <button className="btn-primary">Post Insight</button>
        </div>
      </div>
    </div>
  );
}
