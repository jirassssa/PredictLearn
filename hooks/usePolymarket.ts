/**
 * React Hooks for Polymarket API
 * Auto-refreshing hooks for real-time data
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getMarkets,
  getEvents,
  getMarket,
  getEvent,
  getPriceHistory,
  getTags,
  PolymarketMarket,
  PolymarketEvent,
  PolymarketPriceHistory,
} from '@/lib/polymarket';

interface UsePolymarketOptions {
  refreshInterval?: number; // in milliseconds, default 30000 (30 seconds)
  enabled?: boolean; // enable/disable auto-refresh
}

/**
 * Hook to fetch and auto-refresh markets
 */
export function useMarkets(
  params?: {
    limit?: number;
    offset?: number;
    active?: boolean;
    closed?: boolean;
    tag?: string;
  },
  options?: UsePolymarketOptions
) {
  const [data, setData] = useState<PolymarketMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { refreshInterval = 30000, enabled = true } = options || {};

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const markets = await getMarkets(params);
      setData(markets);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching markets:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    // Set up auto-refresh
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch and auto-refresh events
 */
export function useEvents(
  params?: {
    limit?: number;
    offset?: number;
    closed?: boolean;
    tag?: string;
  },
  options?: UsePolymarketOptions
) {
  const [data, setData] = useState<PolymarketEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { refreshInterval = 30000, enabled = true } = options || {};

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const events = await getEvents(params);
      setData(events);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch a single market by ID
 */
export function useMarket(marketId: string | null, options?: UsePolymarketOptions) {
  const [data, setData] = useState<PolymarketMarket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { refreshInterval = 30000, enabled = true } = options || {};

  const fetchData = useCallback(async () => {
    if (!marketId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const market = await getMarket(marketId);
      setData(market);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching market:', err);
    } finally {
      setLoading(false);
    }
  }, [marketId]);

  useEffect(() => {
    if (!enabled || !marketId) return;

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled, marketId]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch a single event by ID
 */
export function useEvent(eventId: string | null, options?: UsePolymarketOptions) {
  const [data, setData] = useState<PolymarketEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { refreshInterval = 30000, enabled = true } = options || {};

  const fetchData = useCallback(async () => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const event = await getEvent(eventId);
      setData(event);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (!enabled || !eventId) return;

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled, eventId]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch price history for a token
 */
export function usePriceHistory(
  tokenId: string | null,
  params?: {
    fidelity?: number;
    startTs?: number;
    endTs?: number;
  },
  options?: UsePolymarketOptions
) {
  const [data, setData] = useState<PolymarketPriceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { refreshInterval = 60000, enabled = true } = options || {}; // 1 minute default for price history

  const fetchData = useCallback(async () => {
    if (!tokenId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const history = await getPriceHistory(tokenId, params);
      setData(history);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching price history:', err);
    } finally {
      setLoading(false);
    }
  }, [tokenId, params]);

  useEffect(() => {
    if (!enabled || !tokenId) return;

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled, tokenId]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch available tags
 */
export function useTags(options?: UsePolymarketOptions) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { refreshInterval = 300000, enabled = true } = options || {}; // 5 minutes for tags

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tags = await getTags();
      setData(tags);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching tags:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, enabled]);

  return { data, loading, error, refetch: fetchData };
}
