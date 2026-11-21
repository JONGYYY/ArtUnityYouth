-- ArtUnity Youth — Homepage Carousel slides
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: the table is created "if not exists" and the seed only runs while the table is empty.
-- Uploaded photos use the same public "event-photos" storage bucket as events (see schema.sql).

-- ────────────────────────────────────────────────────────────
-- Table
-- ────────────────────────────────────────────────────────────

create table if not exists carousel_slides (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  caption     text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- Public (anon) can READ slides. Writes go through the admin API
-- using the service role key (which bypasses RLS).
-- ────────────────────────────────────────────────────────────

alter table carousel_slides enable row level security;

drop policy if exists "public read carousel_slides" on carousel_slides;
create policy "public read carousel_slides" on carousel_slides for select to anon, authenticated using (true);

-- ────────────────────────────────────────────────────────────
-- Seed data (mirrors FALLBACK_SLIDES in src/lib/carousel-slides.ts)
-- ────────────────────────────────────────────────────────────

insert into carousel_slides (image_url, caption, sort_order)
select v.image_url, v.caption, v.sort_order
from (values
  ('/images/about/mission.jpg',                                'Youth creating art together',                                   0),
  ('/images/carousel/senior-residents-group.jpg',              'Card-making with senior residents',                             1),
  ('/images/carousel/senior-resident-sharing-card.jpg',        'Sharing a handmade card with a senior resident',                2),
  ('/images/carousel/senior-residents-card-table.jpg',         'Handmade cards at the senior residents event',                  3),
  ('/images/events/pride-2026/pride-4.png',                    'ArtUnity Youth at PRIDE 2026',                                  4),
  ('/images/events/screen-printing/sp-1.png',                  'Screen printing at Oktoberfest',                                5),
  ('/images/events/murals/mural-2.png',                        'Love One Another mural — So What Else',                         6),
  ('/images/events/friday-cards/jul-10-2026/candid-1.png',     'Volunteers hand-illustrating get-well cards',                   7),
  ('/images/events/friday-cards/friday-3.png',                 'Friday Card Session — group with cards',                        8),
  ('/images/events/pride-2026/pride-5.png',                    'ArtUnity team and community at PRIDE',                          9),
  ('/images/events/friday-cards/jul-10-2026/candid-3.png',     'A young artist drawing a card',                                10),
  ('/images/events/murals/mural-3.png',                        'Youth painting the community mural',                           11),
  ('/images/events/friday-cards/jul-10-2026/candid-5.png',     'Cards in progress at the table',                               12),
  ('/images/events/friday-cards/friday-6.png',                 'Youth showing their handmade cards',                           13),
  ('/images/events/pride-2026/pride-1.png',                    'Chalk mural messages of love and belonging',                   14),
  ('/images/events/murals/mural-1.png',                        'Community mural celebrating unity',                            15),
  ('/images/events/pride-2026/pride-3.png',                    'Youth volunteers at the chalk mural',                          16),
  ('/images/events/screen-printing/sp-2.jpg',                  'Fresh screen prints drying',                                   17),
  ('/images/events/mlk/submission-03.png',                     'MLK art competition submission',                               18),
  ('/images/carousel/so-what-else-mural-volunteers.jpg',       'Volunteers at the "So What Else" mural',                       19),
  ('/images/carousel/young-artist-painting-mural.jpg',         'A young artist painting a community mural',                    20),
  ('/images/carousel/rockville-library-group.jpg',             'ArtUnity Youth at Rockville Memorial Library',                 21),
  ('/images/carousel/sharing-handmade-cards-library.jpg',      'Sharing handmade cards at the library',                        22),
  ('/images/carousel/holiday-cards-panorama.jpg',              'Handmade holiday cards',                                       23),
  ('/images/carousel/thanksgiving-cards.jpg',                  'Handmade Thanksgiving cards',                                  24),
  ('/images/carousel/hospital-encouragement-cards.jpg',        'Encouraging cards for kids in hospitals',                      25),
  ('/images/carousel/drawing-together-library.jpg',            'Drawing together at the library',                              26),
  ('/images/carousel/storybook-mural.jpg',                     'Storybook mural painted by youth',                             27),
  ('/images/carousel/bee-happy-cards.jpg',                     '"Bee Happy" cards made by volunteers',                         28),
  ('/images/carousel/food-drive-produce-packing.jpg',          'Volunteers packing produce at a food drive',                   29),
  ('/images/carousel/festival-rolling-ink.jpg',                'Rolling ink for a print at the festival',                      30),
  ('/images/carousel/teaching-screen-printing.jpg',            'Teaching a young artist to screen print',                      31),
  ('/images/carousel/fitzgerald-festival-screen-printing.jpg', 'Screen printing at the F. Scott Fitzgerald Literary Festival', 32),
  ('/images/carousel/drawing-together-library-2.jpg',          'Drawing together at the library',                              33)
) as v(image_url, caption, sort_order)
where not exists (select 1 from carousel_slides);
