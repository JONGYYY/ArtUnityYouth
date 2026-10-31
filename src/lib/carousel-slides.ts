// Client-safe: imported by the homepage hero as well as server code.

export type CarouselSlide = {
  id: string;
  imageUrl: string;
  caption: string;
  sortOrder: number;
};

// Keep in sync with the seed in supabase/homepage-carousel.sql.
export const FALLBACK_SLIDES: CarouselSlide[] = [
  { imageUrl: '/images/about/mission.jpg',                            caption: 'Youth creating art together' },
  { imageUrl: '/images/events/pride-2026/pride-4.png',                caption: 'ArtUnity Youth at PRIDE 2026' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/group-1.png',  caption: 'Friday Drawing Session group photo' },
  { imageUrl: '/images/events/screen-printing/sp-1.png',              caption: 'Screen printing at Oktoberfest' },
  { imageUrl: '/images/events/murals/mural-2.png',                    caption: 'Love One Another mural — So What Else' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/candid-1.png', caption: 'Volunteers hand-illustrating get-well cards' },
  { imageUrl: '/images/events/friday-cards/friday-3.png',             caption: 'Friday Card Session — group with cards' },
  { imageUrl: '/images/events/pride-2026/pride-5.png',                caption: 'ArtUnity team and community at PRIDE' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/candid-3.png', caption: 'A young artist drawing a card' },
  { imageUrl: '/images/events/murals/mural-3.png',                    caption: 'Youth painting the community mural' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/candid-5.png', caption: 'Cards in progress at the table' },
  { imageUrl: '/images/events/friday-cards/friday-6.png',             caption: 'Youth showing their handmade cards' },
  { imageUrl: '/images/events/pride-2026/pride-1.png',                caption: 'Chalk mural messages of love and belonging' },
  { imageUrl: '/images/events/murals/mural-1.png',                    caption: 'Community mural celebrating unity' },
  { imageUrl: '/images/events/pride-2026/pride-3.png',                caption: 'Youth volunteers at the chalk mural' },
  { imageUrl: '/images/events/screen-printing/sp-2.jpg',              caption: 'Fresh screen prints drying' },
  { imageUrl: '/images/events/mlk/submission-03.png',                 caption: 'MLK art competition submission' },
].map((s, i) => ({ ...s, id: `fallback-${i}`, sortOrder: i }));

export function toCarouselSlide(row: Record<string, any>): CarouselSlide {
  return {
    id: row.id,
    imageUrl: row.image_url ?? '',
    caption: row.caption ?? '',
    sortOrder: row.sort_order ?? 0,
  };
}
