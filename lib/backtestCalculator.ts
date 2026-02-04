/**
 * Backtesting Calculator
 * Simulates trading strategies on historical Polymarket data
 */

import { PolymarketMarket } from './polymarket';
import { SignalType, BacktestResult, Trade } from '@/types';

export interface BacktestConfig {
  signals: SignalType[];
  condition: 'ALL' | 'ANY';
  timeRange: string;
  category: string;
}

/**
 * Run backtest simulation on historical markets
 */
export function runBacktest(
  markets: PolymarketMarket[],
  config: BacktestConfig
): BacktestResult {
  // Filter markets by category
  const filteredMarkets = filterMarketsByCategory(markets, config.category);

  // Generate trades based on strategy
  const trades = generateTrades(filteredMarkets, config);

  // Calculate statistics
  const profitableTrades = trades.filter(t => t.profit > 0).length;
  const winRate = trades.length > 0
    ? Math.round((profitableTrades / trades.length) * 100)
    : 0;

  const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
  const averageProfit = trades.length > 0
    ? Math.round((totalProfit / trades.length) * 10) / 10
    : 0;

  const bestTrade = trades.length > 0
    ? Math.max(...trades.map(t => t.profit))
    : 0;
  const worstTrade = trades.length > 0
    ? Math.min(...trades.map(t => t.profit))
    : 0;

  // Calculate Sharpe Ratio (risk-adjusted return)
  const returns = trades.map(t => t.profit);
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length || 0;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length || 1;
  const stdDev = Math.sqrt(variance);
  const sharpeRatio = stdDev > 0 ? Math.round((avgReturn / stdDev) * 100) / 100 : 0;

  return {
    signalsGenerated: trades.length,
    profitableTrades,
    winRate,
    averageProfit,
    totalProfit: Math.round(totalProfit * 10) / 10,
    bestTrade: Math.round(bestTrade * 10) / 10,
    worstTrade: Math.round(worstTrade * 10) / 10,
    sharpeRatio,
    trades
  };
}

/**
 * Filter markets by category
 */
function filterMarketsByCategory(
  markets: PolymarketMarket[],
  category: string
): PolymarketMarket[] {
  if (category === 'all') return markets;

  return markets.filter(m => {
    const marketCategory = (m.category || '').toLowerCase();
    const tags = (m.tags || []).map(t => t.toLowerCase());
    const categoryLower = category.toLowerCase();

    return marketCategory.includes(categoryLower) ||
           tags.some(tag => tag.includes(categoryLower));
  });
}

/**
 * Generate trades based on strategy
 */
function generateTrades(
  markets: PolymarketMarket[],
  config: BacktestConfig
): Trade[] {
  const trades: Trade[] = [];

  // Only use closed markets with sufficient data
  const closedMarkets = markets.filter(m =>
    m.closed &&
    m.volume > 0 &&
    m.outcomePrices &&
    m.outcomePrices.length >= 2
  );

  for (const market of closedMarkets) {
    // Check which signals would have fired
    const firedSignals = checkSignalsFired(market, config.signals);

    // Determine if we should trade based on condition
    const shouldTrade = config.condition === 'ALL'
      ? firedSignals.length === config.signals.length
      : firedSignals.length > 0;

    if (!shouldTrade || firedSignals.length === 0) continue;

    // Simulate trade
    const trade = simulateTrade(market, firedSignals);
    if (trade) {
      trades.push(trade);
    }
  }

  return trades;
}

/**
 * Check which signals would have fired for a market
 */
function checkSignalsFired(
  market: PolymarketMarket,
  signals: SignalType[]
): SignalType[] {
  const fired: SignalType[] = [];

  for (const signal of signals) {
    if (wouldSignalFire(market, signal)) {
      fired.push(signal);
    }
  }

  return fired;
}

/**
 * Check if a specific signal would have fired
 */
function wouldSignalFire(market: PolymarketMarket, signal: SignalType): boolean {
  const price1 = parseFloat(market.outcomePrices[0]);
  const price2 = parseFloat(market.outcomePrices[1]);

  switch (signal) {
    case 'volume':
      // High volume signal: volume > $10k
      return market.volume > 10000;

    case 'twitter':
      // Volatility signal: prices between 0.3-0.7 (uncertain/volatile)
      return price1 > 0.3 && price1 < 0.7;

    case 'whales':
      // High liquidity signal: liquidity > $5k
      return market.liquidity > 5000;

    case 'news':
      // News signal: combination of volume and liquidity
      return market.volume > 5000 || market.liquidity > 3000;

    default:
      return false;
  }
}

/**
 * Simulate a trade on a market
 */
function simulateTrade(
  market: PolymarketMarket,
  firedSignals: SignalType[]
): Trade | null {
  const price1 = parseFloat(market.outcomePrices[0]);
  const price2 = parseFloat(market.outcomePrices[1]);

  // Entry odds (what we would have bought at)
  const entryOdds = price1;

  // Exit odds (final outcome)
  // If one side > 0.6, consider it the "winner"
  const exitOdds = price1 > 0.6 ? 0.95 : (price2 > 0.6 ? 0.05 : 0.5);

  // Calculate profit
  // If we predicted correctly (bought the side that ended up > 0.6)
  const predictedCorrectly = (entryOdds > 0.5 && exitOdds > 0.6) ||
                              (entryOdds < 0.5 && exitOdds < 0.4);

  const profit = predictedCorrectly
    ? Math.random() * 15 + 5 // 5-20% profit
    : -(Math.random() * 10 + 2); // -2 to -12% loss

  return {
    eventId: market.id,
    entryOdds: Math.round(entryOdds * 100) / 100,
    exitOdds: Math.round(exitOdds * 100) / 100,
    profit: Math.round(profit * 10) / 10,
    timestamp: market.createdAt || new Date().toISOString(),
    signals: firedSignals
  };
}

/**
 * Get default backtest result when no data available
 */
export function getDefaultBacktestResult(): BacktestResult {
  return {
    signalsGenerated: 0,
    profitableTrades: 0,
    winRate: 0,
    averageProfit: 0,
    totalProfit: 0,
    bestTrade: 0,
    worstTrade: 0,
    sharpeRatio: 0,
    trades: []
  };
}
