// Client-safe: imported by the homepage hero as well as server code.

export type CarouselSlide = {
  id: string;
  imageUrl: string;
  caption: string;
  sortOrder: number;
};

// Keep in sync with the seed in supabase/homepage-carousel.sql.
export const FALLBACK_SLIDES: CarouselSlide[] = [
  { imageUrl: '/images/about/mission.jpg',                                caption: 'Youth creating art together' },
  { imageUrl: '/images/events/pride-2026/pride-4.png',                    caption: 'ArtUnity Youth at PRIDE 2026' },
  { imageUrl: '/images/events/screen-printing/sp-1.png',                  caption: 'Screen printing at Oktoberfest' },
  { imageUrl: '/images/events/murals/mural-2.png',                        caption: 'Love One Another mural — So What Else' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/candid-1.png',     caption: 'Volunteers hand-illustrating get-well cards' },
  { imageUrl: '/images/events/friday-cards/friday-3.png',                 caption: 'Friday Card Session — group with cards' },
  { imageUrl: '/images/events/pride-2026/pride-5.png',                    caption: 'ArtUnity team and community at PRIDE' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/candid-3.png',     caption: 'A young artist drawing a card' },
  { imageUrl: '/images/events/murals/mural-3.png',                        caption: 'Youth painting the community mural' },
  { imageUrl: '/images/events/friday-cards/jul-10-2026/candid-5.png',     caption: 'Cards in progress at the table' },
  { imageUrl: '/images/events/friday-cards/friday-6.png',                 caption: 'Youth showing their handmade cards' },
  { imageUrl: '/images/events/pride-2026/pride-1.png',                    caption: 'Chalk mural messages of love and belonging' },
  { imageUrl: '/images/events/murals/mural-1.png',                        caption: 'Community mural celebrating unity' },
  { imageUrl: '/images/events/pride-2026/pride-3.png',                    caption: 'Youth volunteers at the chalk mural' },
  { imageUrl: '/images/events/screen-printing/sp-2.jpg',                  caption: 'Fresh screen prints drying' },
  { imageUrl: '/images/events/mlk/submission-03.png',                     caption: 'MLK art competition submission' },
  { imageUrl: '/images/carousel/so-what-else-mural-volunteers.jpg',       caption: 'Volunteers at the "So What Else" mural' },
  { imageUrl: '/images/carousel/young-artist-painting-mural.jpg',         caption: 'A young artist painting a community mural' },
  { imageUrl: '/images/carousel/rockville-library-group.jpg',             caption: 'ArtUnity Youth at Rockville Memorial Library' },
  { imageUrl: '/images/carousel/sharing-handmade-cards-library.jpg',      caption: 'Sharing handmade cards at the library' },
  { imageUrl: '/images/carousel/holiday-cards-panorama.jpg',              caption: 'Handmade holiday cards' },
  { imageUrl: '/images/carousel/thanksgiving-cards.jpg',                  caption: 'Handmade Thanksgiving cards' },
  { imageUrl: '/images/carousel/hospital-encouragement-cards.jpg',        caption: 'Encouraging cards for kids in hospitals' },
  { imageUrl: '/images/carousel/drawing-together-library.jpg',            caption: 'Drawing together at the library' },
  { imageUrl: '/images/carousel/storybook-mural.jpg',                     caption: 'Storybook mural painted by youth' },
  { imageUrl: '/images/carousel/bee-happy-cards.jpg',                     caption: '"Bee Happy" cards made by volunteers' },
  { imageUrl: '/images/carousel/food-drive-produce-packing.jpg',          caption: 'Volunteers packing produce at a food drive' },
  { imageUrl: '/images/carousel/festival-rolling-ink.jpg',                caption: 'Rolling ink for a print at the festival' },
  { imageUrl: '/images/carousel/teaching-screen-printing.jpg',            caption: 'Teaching a young artist to screen print' },
  { imageUrl: '/images/carousel/fitzgerald-festival-screen-printing.jpg', caption: 'Screen printing at the F. Scott Fitzgerald Literary Festival' },
  { imageUrl: '/images/carousel/drawing-together-library-2.jpg',          caption: 'Drawing together at the library' },
].map((s, i) => ({ ...s, id: `fallback-${i}`, sortOrder: i }));

export function toCarouselSlide(row: Record<string, any>): CarouselSlide {
  return {
    id: row.id,
    imageUrl: row.image_url ?? '',
    caption: row.caption ?? '',
    sortOrder: row.sort_order ?? 0,
  };
}
