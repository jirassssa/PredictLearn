'use client';

import { useMarkets, useEvents } from '@/hooks/usePolymarket';

export default function TestAPIPage() {
  const { data: markets, loading: marketsLoading, error: marketsError } = useMarkets(
    { limit: 5, active: true },
    { refreshInterval: 10000 }
  );

  const { data: events, loading: eventsLoading, error: eventsError } = useEvents(
    { limit: 5, closed: false },
    { refreshInterval: 10000 }
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
          Polymarket API Test
        </h1>

        {/* Markets Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
            Active Markets (Real-time)
          </h2>

          {marketsLoading && (
            <p className="text-gray-600 dark:text-gray-400">Loading markets...</p>
          )}

          {marketsError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 font-semibold">Error:</p>
              <p className="text-red-700 dark:text-red-300 text-sm">{marketsError.message}</p>
            </div>
          )}

          {!marketsLoading && !marketsError && markets && (
            <div className="space-y-4">
              {markets.slice(0, 5).map((market) => (
                <div
                  key={market.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-400 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {market.question}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Volume: ${market.volume.toLocaleString()}</span>
                    <span>Liquidity: ${market.liquidity.toLocaleString()}</span>
                    <span className={market.active ? 'text-green-600' : 'text-red-600'}>
                      {market.active ? '● Active' : '○ Inactive'}
                    </span>
                  </div>
                  {market.outcomePrices && market.outcomePrices.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      {market.outcomes.map((outcome, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded"
                        >
                          {outcome}: {(parseFloat(market.outcomePrices[idx]) * 100).toFixed(1)}%
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Events Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-heading font-bold mb-4 text-gray-900 dark:text-white">
            Active Events (Real-time)
          </h2>

          {eventsLoading && (
            <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
          )}

          {eventsError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 font-semibold">Error:</p>
              <p className="text-red-700 dark:text-red-300 text-sm">{eventsError.message}</p>
            </div>
          )}

          {!eventsLoading && !eventsError && events && (
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                      {event.title}
                    </h3>
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {event.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{event.markets?.length || 0} markets</span>
                    {event.volume && (
                      <span>Volume: ${parseFloat(event.volume.toString()).toLocaleString()}</span>
                    )}
                    <span className={event.closed ? 'text-red-600' : 'text-green-600'}>
                      {event.closed ? '○ Closed' : '● Open'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Data refreshes every 10 seconds • Powered by Polymarket CLOB API
        </div>
      </div>
    </div>
  );
}
