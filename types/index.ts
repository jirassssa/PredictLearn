// Signal Types
export type SignalType = 'twitter' | 'whales' | 'news' | 'volume';

export interface SignalPerformance {
  signalType: SignalType;
  winRate: number;
  totalEvents: number;
  correctPredictions: number;
  averageLeadTime: number; // in hours
  correlationScore: number;
  categoryBreakdown: {
    category: string;
    accuracy: number;
  }[];
}

// Event Types
export interface Event {
  id: string;
  title: string;
  category: 'politics' | 'crypto' | 'sports' | 'science' | 'entertainment';
  platform: 'polymarket' | 'kalshi';
  currentOdds: number; // 0-100
  volume: number;
  liquidity: number;
  resolveDate: string;
  status: 'active' | 'resolved';
  actualOutcome?: boolean;
}

// Prediction Types
export interface Prediction {
  eventId: string;
  probability: number; // 0-100
  confidence: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  signalBreakdown: SignalContribution[];
  timestamp: string;
}

export interface SignalContribution {
  signalType: SignalType;
  impact: number; // percentage contribution
  value: number;
  description: string;
}

// Backtesting Types
export interface BacktestStrategy {
  id: string;
  name: string;
  signals: {
    signalType: SignalType;
    weight: number;
    threshold?: number;
  }[];
  condition: 'ALL' | 'ANY';
  categories: string[];
}

export interface BacktestResult {
  strategyId: string;
  signalsGenerated: number;
  profitableTrades: number;
  winRate: number;
  averageProfit: number;
  bestTrade: number;
  worstTrade: number;
  sharpeRatio: number;
  trades: BacktestTrade[];
}

export interface BacktestTrade {
  eventId: string;
  entryOdds: number;
  exitOdds: number;
  profit: number;
  timestamp: string;
}

// Gamification Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  event: Event;
  signals: {
    twitter?: number;
    whales?: number;
    news?: number;
    volume?: number;
  };
  userPrediction?: number;
  userConfidence?: number;
  xpReward: number;
  status: 'pending' | 'completed' | 'expired';
}

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  challengesCompleted: number;
  accuracy: number;
  badges: Badge[];
  specialties: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

// Community Types
export interface Analyst {
  id: string;
  username: string;
  avatar?: string;
  winRate: number;
  totalPredictions: number;
  averageProfit: number;
  specialty: string;
  preferredSignals: {
    signalType: SignalType;
    weight: number;
  }[];
  followers: number;
  verified: boolean;
}

export interface Insight {
  id: string;
  analystId: string;
  analyst: Analyst;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

// Historical Pattern Types
export interface HistoricalPattern {
  patternType: string;
  accuracy: number;
  occurrences: number;
  similarEvents: Event[];
}
