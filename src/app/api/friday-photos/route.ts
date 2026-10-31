import { NextResponse } from 'next/server';
import { getFridaySessions } from '../../../lib/content';
import { buildFridayPhotos } from '../../../lib/carousel';

export const dynamic = 'force-dynamic';

// Public endpoint: returns the photos uploaded for the weekly Friday sessions.
// The home-page hero uses /api/carousel-photos, which includes these.
export async function GET() {
  try {
    const sessions = await getFridaySessions();
    return NextResponse.json({ photos: buildFridayPhotos(sessions) });
  } catch (_error) {
    return NextResponse.json({ photos: [] });
  }
}
