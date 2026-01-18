'use client';

import { mockPrediction, mockEvents } from '@/lib/mockData';

export default function ExplainablePredictions() {
  const prediction = mockPrediction;
  const event = mockEvents[0];

  const getImpactColor = (impact: number) => {
    if (impact > 15) return 'bg-green-500';
    if (impact > 0) return 'bg-blue-500';
    return 'bg-red-500';
  };

  const getConfidenceColor = (confidence: string) => {
    const colors: Record<string, string> = {
      VERY_HIGH: 'bg-green-600',
      HIGH: 'bg-blue-600',
      MEDIUM: 'bg-yellow-600',
      LOW: 'bg-orange-600',
    };
    return colors[confidence] || 'bg-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🎯 Explainable Predictions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Understand why we make each prediction
        </p>

        {/* Event Info */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {event.category}
                </span>
                <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {event.platform}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Current Odds</div>
              <div className="text-3xl font-bold text-primary-600">{event.currentOdds}%</div>
            </div>
          </div>
        </div>

        {/* Prediction */}
        <div className="border-2 border-primary-600 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Our Prediction</div>
              <div className="text-4xl font-bold text-primary-600">{prediction.probability}%</div>
              <div className="text-sm text-gray-500">YES</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Confidence</div>
              <span
                className={`${getConfidenceColor(
                  prediction.confidence
                )} text-white px-4 py-2 rounded-lg font-semibold`}
              >
                {prediction.confidence}
              </span>
            </div>
          </div>
        </div>

        {/* Signal Breakdown */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Signal Breakdown
          </h3>
          <div className="space-y-4">
            {prediction.signalBreakdown.map((signal, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          signal.impact > 15
                            ? 'bg-green-500'
                            : signal.impact > 0
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                        {signal.signalType} Signal
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                      {signal.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div
                      className={`text-2xl font-bold ${
                        signal.impact > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {signal.impact > 0 ? '+' : ''}
                      {signal.impact}%
                    </div>
                    <div className="text-xs text-gray-500">Impact</div>
                  </div>
                </div>

                {/* Impact Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getImpactColor(
                        signal.impact
                      )}`}
                      style={{
                        width: `${Math.min(Math.abs(signal.impact) * 3, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Reasoning Summary
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Strong whale signal (+25%) and positive Twitter sentiment (+18%) indicate bullish
            momentum. Historical patterns show similar events resolved positively 80% of the time
            (+16%). However, declining on-chain activity (-5%) suggests caution. Overall confidence
            is MEDIUM due to mixed signals.
          </p>
        </div>
      </div>
    </div>
  );
}
