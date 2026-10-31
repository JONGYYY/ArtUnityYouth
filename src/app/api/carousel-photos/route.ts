import { NextResponse } from 'next/server';
import { getEvents, getFridaySessions } from '../../../lib/content';
import { buildEventPhotos, buildFridayPhotos } from '../../../lib/carousel';

export const dynamic = 'force-dynamic';

// Public endpoint: event cover/gallery photos plus Friday-session uploads,
// appended by the home-page hero carousel after its curated images.
// getEvents/getFridaySessions already fall back to seed content when the DB is unreachable.
export async function GET() {
  const [events, sessions] = await Promise.allSettled([getEvents(), getFridaySessions()]);
  const seen = new Set<string>();

  const eventPhotos = events.status === 'fulfilled' ? buildEventPhotos(events.value, seen) : [];
  const fridayPhotos = sessions.status === 'fulfilled' ? buildFridayPhotos(sessions.value, seen) : [];

  return NextResponse.json({ photos: [...eventPhotos, ...fridayPhotos] });
}
