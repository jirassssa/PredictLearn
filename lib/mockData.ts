import {
  SignalPerformance,
  Event,
  Prediction,
  BacktestResult,
  Challenge,
  UserProgress,
  Analyst,
  Insight,
  Badge,
} from '@/types';

export const mockSignalPerformance: SignalPerformance[] = [
  {
    signalType: 'twitter',
    winRate: 64,
    totalEvents: 200,
    correctPredictions: 128,
    averageLeadTime: 2.3,
    correlationScore: 0.72,
    categoryBreakdown: [
      { category: 'Politics', accuracy: 78 },
      { category: 'Sports', accuracy: 68 },
      { category: 'Crypto', accuracy: 51 },
      { category: 'Science', accuracy: 62 },
    ],
  },
  {
    signalType: 'whales',
    winRate: 71,
    totalEvents: 125,
    correctPredictions: 89,
    averageLeadTime: 0.75,
    correlationScore: 0.68,
    categoryBreakdown: [
      { category: 'Crypto', accuracy: 82 },
      { category: 'Politics', accuracy: 65 },
      { category: 'Sports', accuracy: 58 },
    ],
  },
  {
    signalType: 'news',
    winRate: 58,
    totalEvents: 180,
    correctPredictions: 104,
    averageLeadTime: 4.1,
    correlationScore: 0.61,
    categoryBreakdown: [
      { category: 'Politics', accuracy: 72 },
      { category: 'Science', accuracy: 68 },
      { category: 'Crypto', accuracy: 42 },
    ],
  },
  {
    signalType: 'volume',
    winRate: 66,
    totalEvents: 150,
    correctPredictions: 99,
    averageLeadTime: 1.2,
    correlationScore: 0.74,
    categoryBreakdown: [
      { category: 'Crypto', accuracy: 75 },
      { category: 'Sports', accuracy: 70 },
      { category: 'Politics', accuracy: 58 },
    ],
  },
];

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Will BTC hit $100k by Dec 31, 2026?',
    category: 'crypto',
    platform: 'polymarket',
    currentOdds: 62,
    volume: 2345000,
    liquidity: 1200000,
    resolveDate: '2026-12-31',
    status: 'active',
  },
  {
    id: 'evt-2',
    title: 'Lakers to win NBA Championship 2026',
    category: 'sports',
    platform: 'kalshi',
    currentOdds: 35,
    volume: 890000,
    liquidity: 450000,
    resolveDate: '2026-06-20',
    status: 'active',
  },
  {
    id: 'evt-3',
    title: 'Democrats win 2026 Senate majority?',
    category: 'politics',
    platform: 'polymarket',
    currentOdds: 48,
    volume: 5600000,
    liquidity: 3200000,
    resolveDate: '2026-11-03',
    status: 'active',
  },
];

export const mockPrediction: Prediction = {
  eventId: 'evt-1',
  probability: 62,
  confidence: 'MEDIUM',
  signalBreakdown: [
    {
      signalType: 'twitter',
      impact: 18,
      value: 72,
      description: '12,500 mentions, 72% positive sentiment',
    },
    {
      signalType: 'whales',
      impact: 25,
      value: 85,
      description: '3 large wallets bought YES, $2.3M volume in 2 hours',
    },
    {
      signalType: 'news',
      impact: 8,
      value: 55,
      description: '15 articles, neutral tone',
    },
    {
      signalType: 'twitter',
      impact: -5,
      value: 42,
      description: 'Social sentiment declining',
    },
    {
      signalType: 'volume',
      impact: 16,
      value: 78,
      description: 'Similar events: 8/10 resolved YES',
    },
  ],
  timestamp: new Date().toISOString(),
};

export const mockBacktestResult: BacktestResult = {
  strategyId: 'strategy-1',
  signalsGenerated: 45,
  profitableTrades: 31,
  winRate: 68.9,
  averageProfit: 12.3,
  totalProfit: 381.3,
  bestTrade: 34,
  worstTrade: -8,
  sharpeRatio: 1.8,
  trades: [
    {
      eventId: 'evt-1',
      entryOdds: 45,
      exitOdds: 62,
      profit: 17,
      timestamp: '2026-01-10T10:00:00Z',
    },
    {
      eventId: 'evt-2',
      entryOdds: 30,
      exitOdds: 35,
      profit: 5,
      timestamp: '2026-01-12T14:30:00Z',
    },
  ],
};

export const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: '7-Day Streak',
    description: 'Complete challenges for 7 days in a row',
    icon: '🔥',
    unlockedAt: '2026-01-10',
  },
  {
    id: 'badge-2',
    name: 'Early Bird',
    description: 'Spotted value before market moved',
    icon: '🦅',
    unlockedAt: '2026-01-08',
  },
  {
    id: 'badge-3',
    name: 'Signal Master',
    description: 'Reached 80% accuracy',
    icon: '⭐',
  },
];

export const mockUserProgress: UserProgress = {
  userId: 'user-1',
  level: 12,
  xp: 3450,
  xpToNextLevel: 4000,
  streak: 7,
  challengesCompleted: 45,
  accuracy: 67.5,
  badges: mockBadges.filter((b) => b.unlockedAt),
  specialties: ['Crypto', 'Politics'],
};

export const mockChallenge: Challenge = {
  id: 'challenge-1',
  title: 'Daily Challenge: Lakers vs Warriors',
  description: 'Predict the outcome using available signals',
  event: mockEvents[1],
  signals: {
    twitter: 58,
    whales: 45,
    news: 62,
    volume: 71,
  },
  xpReward: 250,
  status: 'pending',
};

export const mockAnalysts: Analyst[] = [
  {
    id: 'analyst-1',
    username: 'CryptoWhale',
    winRate: 73,
    totalPredictions: 300,
    averageProfit: 18,
    specialty: 'Crypto',
    preferredSignals: [
      { signalType: 'whales', weight: 35 },
      { signalType: 'volume', weight: 25 },
      { signalType: 'twitter', weight: 20 },
      { signalType: 'news', weight: 20 },
    ],
    followers: 2340,
    verified: true,
  },
  {
    id: 'analyst-2',
    username: 'PoliticsGuru',
    winRate: 68,
    totalPredictions: 250,
    averageProfit: 14,
    specialty: 'Politics',
    preferredSignals: [
      { signalType: 'news', weight: 40 },
      { signalType: 'twitter', weight: 35 },
      { signalType: 'volume', weight: 25 },
    ],
    followers: 1890,
    verified: true,
  },
];

export const mockInsights: Insight[] = [
  {
    id: 'insight-1',
    analystId: 'analyst-1',
    analyst: mockAnalysts[0],
    content:
      'When Twitter is overly bullish on crypto events, I fade it. Works 80% of the time in my experience.',
    likes: 234,
    comments: 45,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tags: ['crypto', 'contrarian', 'twitter'],
  },
  {
    id: 'insight-2',
    analystId: 'analyst-2',
    analyst: mockAnalysts[1],
    content:
      'For political events, combine news sentiment with volume spikes. News moves first, volume confirms.',
    likes: 189,
    comments: 32,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tags: ['politics', 'strategy'],
  },
];
