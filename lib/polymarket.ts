/**
 * Polymarket API Client
 * Fetches real-time data from Polymarket CLOB API
 * Documentation: https://docs.polymarket.com/developers/CLOB/introduction
 */

// Use our Next.js API routes to avoid CORS issues
const API_BASE = '/api/polymarket';
const CLOB_API = 'https://clob.polymarket.com'; // Direct for server-side only
const GAMMA_API = 'https://gamma-api.polymarket.com'; // Direct for server-side only

export interface PolymarketEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  closed: boolean;
  markets: PolymarketMarket[];
  createdAt: string;
  endDate: string;
  liquidity?: number;
  volume?: number;
}

export interface PolymarketMarket {
  id: string;
  question: string;
  conditionId: string;
  slug: string;
  outcomes: string[];
  outcomePrices: string[];
  volume: number;
  liquidity: number;
  active: boolean;
  closed: boolean;
  acceptingOrders: boolean;
  enableOrderBook: boolean;
  tags: string[];
  category?: string;
}

export interface PolymarketPrice {
  price: string;
  timestamp: number;
}

export interface PolymarketPriceHistory {
  t: number[];  // timestamps
  p: number[];  // prices
  v: number[];  // volume
}

/**
 * Get list of active markets
 */
export async function getMarkets(params?: {
  limit?: number;
  offset?: number;
  active?: boolean;
  closed?: boolean;
  tag?: string;
}): Promise<PolymarketMarket[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 70000); // 70s timeout

  const searchParams = new URLSearchParams();

  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  if (params?.active !== undefined) searchParams.append('active', params.active.toString());
  if (params?.closed !== undefined) searchParams.append('closed', params.closed.toString());
  if (params?.tag) searchParams.append('tag', params.tag);

  try {
    // Use our API route to avoid CORS
    const response = await fetch(`${API_BASE}/markets?${searchParams.toString()}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();

    // Normalize data: parse JSON strings, convert types
    return rawData.map((market: any): PolymarketMarket => ({
      ...market,
      outcomes: typeof market.outcomes === 'string' ? JSON.parse(market.outcomes) : market.outcomes,
      outcomePrices: typeof market.outcomePrices === 'string' ? JSON.parse(market.outcomePrices) : market.outcomePrices,
      volume: parseFloat(market.volume || '0'),
      liquidity: parseFloat(market.liquidity || '0'),
      active: Boolean(market.active),
      closed: Boolean(market.closed),
      acceptingOrders: Boolean(market.acceptingOrders),
      enableOrderBook: Boolean(market.enableOrderBook),
    }));
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
}

/**
 * Get market by ID
 */
export async function getMarket(marketId: string): Promise<PolymarketMarket> {
  const response = await fetch(`${GAMMA_API}/markets/${marketId}`);

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get market by slug (URL-friendly name)
 */
export async function getMarketBySlug(slug: string): Promise<PolymarketMarket> {
  const response = await fetch(`${GAMMA_API}/markets/slug/${slug}`);

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get list of events
 */
export async function getEvents(params?: {
  limit?: number;
  offset?: number;
  closed?: boolean;
  tag?: string;
}): Promise<PolymarketEvent[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 70000); // 70s timeout

  const searchParams = new URLSearchParams();

  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());
  if (params?.closed !== undefined) searchParams.append('closed', params.closed.toString());
  if (params?.tag) searchParams.append('tag', params.tag);

  try {
    // Use our API route to avoid CORS
    const response = await fetch(`${API_BASE}/events?${searchParams.toString()}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();

    // Normalize data
    return rawData.map((event: any): PolymarketEvent => ({
      ...event,
      volume: event.volume ? parseFloat(event.volume.toString()) : undefined,
      liquidity: event.liquidity ? parseFloat(event.liquidity.toString()) : undefined,
      closed: Boolean(event.closed),
    }));
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
}

/**
 * Get event by ID
 */
export async function getEvent(eventId: string): Promise<PolymarketEvent> {
  const response = await fetch(`${GAMMA_API}/events/${eventId}`);

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get current price for a token
 */
export async function getPrice(tokenId: string, side: 'BUY' | 'SELL'): Promise<number> {
  const response = await fetch(
    `${CLOB_API}/price?token_id=${tokenId}&side=${side}`
  );

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return parseFloat(data.price);
}

/**
 * Get price history for a token
 */
export async function getPriceHistory(
  tokenId: string,
  params?: {
    fidelity?: number;
    startTs?: number;
    endTs?: number;
  }
): Promise<PolymarketPriceHistory> {
  const searchParams = new URLSearchParams({ token_id: tokenId });

  if (params?.fidelity) searchParams.append('fidelity', params.fidelity.toString());
  if (params?.startTs) searchParams.append('startTs', params.startTs.toString());
  if (params?.endTs) searchParams.append('endTs', params.endTs.toString());

  const response = await fetch(
    `${CLOB_API}/prices-history?${searchParams.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.history[0]; // Returns array with history object
}

/**
 * Get orderbook for a token
 */
export async function getOrderBook(tokenId: string) {
  const response = await fetch(`${CLOB_API}/book?token_id=${tokenId}`);

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get available tags/categories
 */
export async function getTags(): Promise<string[]> {
  const response = await fetch(`${GAMMA_API}/tags`);

  if (!response.ok) {
    throw new Error(`Polymarket API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Calculate win rate from historical price movements
 * This is a helper function to analyze signal effectiveness
 */
export function calculateWinRate(priceHistory: PolymarketPriceHistory): number {
  const { p: prices } = priceHistory;

  if (prices.length < 2) return 0;

  let correctPredictions = 0;
  for (let i = 1; i < prices.length; i++) {
    // Simple momentum indicator: if price went up, prediction was correct
    if (prices[i] > prices[i - 1]) {
      correctPredictions++;
    }
  }

  return (correctPredictions / (prices.length - 1)) * 100;
}

/**
 * Map Polymarket category to our internal category
 */
export function mapPolymarketCategory(tags: string[]): string {
  const categoryMap: Record<string, string> = {
    'politics': 'Politics',
    'crypto': 'Crypto',
    'sports': 'Sports',
    'science': 'Science',
    'economics': 'Economics',
    'entertainment': 'Entertainment',
    'technology': 'Technology',
  };

  for (const tag of tags) {
    const normalized = tag.toLowerCase();
    if (categoryMap[normalized]) {
      return categoryMap[normalized];
    }
  }

  return 'Other';
}
