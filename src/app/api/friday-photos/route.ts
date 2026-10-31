import { NextResponse } from 'next/server';
import { getFridaySessions } from '../../../lib/content';

export const dynamic = 'force-dynamic';

// Public endpoint: returns the photos uploaded for the weekly Friday sessions
// so the home-page hero carousel can include them alongside its curated images.
export async function GET() {
  try {
    const sessions = await getFridaySessions();

    // Newest sessions first so the latest uploads surface in the carousel.
    const ordered = [...sessions].sort((a, b) => b.sortOrder - a.sortOrder);

    const photos: { src: string; alt: string }[] = [];
    const seen = new Set<string>();

    for (const session of ordered) {
      const label = session.label ? `Friday Session — ${session.label}` : 'Friday Art & Kindness Session';
      // Prioritize people/candid/group shots, then the finished cards.
      const srcs = [...session.groupPhotos, ...session.candidPhotos, ...session.cardPhotos];
      for (const src of srcs) {
        if (!src || seen.has(src)) continue;
        seen.add(src);
        photos.push({ src, alt: label });
      }
    }

    // Cap it so the carousel (and its dot indicators) stays manageable.
    return NextResponse.json({ photos: photos.slice(0, 12) });
  } catch (_error) {
    return NextResponse.json({ photos: [] });
  }
}
