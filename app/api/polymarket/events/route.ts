import { NextRequest, NextResponse } from 'next/server';

const GAMMA_API = 'https://gamma-api.polymarket.com';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit') || '10';
    const offset = searchParams.get('offset') || '0';
    const closed = searchParams.get('closed');
    const tag = searchParams.get('tag');

    const params = new URLSearchParams();
    params.append('limit', limit);
    params.append('offset', offset);
    if (closed) params.append('closed', closed);
    if (tag) params.append('tag', tag);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    const response = await fetch(`${GAMMA_API}/events?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      signal: controller.signal,
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Polymarket API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events from Polymarket' },
      { status: 500 }
    );
  }
}
