import type { EventItem, FridaySession } from './content';

export type CarouselPhoto = { src: string; alt: string };

// Caps keep the hero carousel (and its indicators) manageable.
export const PHOTOS_PER_EVENT = 3; // cover + 2 gallery images
export const MAX_EVENT_PHOTOS = 24;
export const MAX_FRIDAY_PHOTOS = 8;

const YEAR = /\b(19|20)\d{2}\b/;

// next/image throws on hosts outside next.config.js remotePatterns, so only
// local files and Supabase public storage URLs can be shown.
function isDisplayable(src: string): boolean {
  if (src.startsWith('/')) return true;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!base && src.startsWith(`${base.replace(/\/$/, '')}/storage/v1/object/public/`);
}

function eventCaption(event: EventItem): string {
  const title = event.title.trim();
  const date = event.date.trim();
  // Only append real dates ("June 2026"), not phrases like "Ongoing — Every Friday".
  if (date && YEAR.test(date) && !title.includes(date)) return `${title} — ${date}`;
  return title;
}

/**
 * Cover first, then a few gallery images per event. Photos are taken
 * round-robin across events so that when the total cap is hit, every
 * event is still represented by its cover.
 */
export function buildEventPhotos(events: EventItem[], seen = new Set<string>()): CarouselPhoto[] {
  const perEvent = events.map((event) => {
    const alt = eventCaption(event);
    const srcs = [event.coverImage, ...event.images].filter((src) => src && isDisplayable(src));
    const unique = Array.from(new Set(srcs)).slice(0, PHOTOS_PER_EVENT);
    return unique.map((src) => ({ src, alt }));
  });

  const photos: CarouselPhoto[] = [];
  for (let round = 0; round < PHOTOS_PER_EVENT; round++) {
    for (const list of perEvent) {
      const photo = list[round];
      if (!photo || seen.has(photo.src)) continue;
      if (photos.length >= MAX_EVENT_PHOTOS) return photos;
      seen.add(photo.src);
      photos.push(photo);
    }
  }
  return photos;
}

export function buildFridayPhotos(sessions: FridaySession[], seen = new Set<string>()): CarouselPhoto[] {
  // Newest sessions first so the latest uploads surface in the carousel.
  const ordered = [...sessions].sort((a, b) => b.sortOrder - a.sortOrder);
  const photos: CarouselPhoto[] = [];

  for (const session of ordered) {
    const alt = session.label ? `Friday Session — ${session.label}` : 'Friday Art & Kindness Session';
    // Prioritize people/candid/group shots, then the finished cards.
    const srcs = [...session.groupPhotos, ...session.candidPhotos, ...session.cardPhotos];
    for (const src of srcs) {
      if (!src || seen.has(src) || !isDisplayable(src)) continue;
      if (photos.length >= MAX_FRIDAY_PHOTOS) return photos;
      seen.add(src);
      photos.push({ src, alt });
    }
  }
  return photos;
}
