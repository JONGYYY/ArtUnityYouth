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
-- Seed data (mirrors the previously hardcoded hero carousel)
-- ────────────────────────────────────────────────────────────

insert into carousel_slides (image_url, caption, sort_order)
select v.image_url, v.caption, v.sort_order
from (values
  ('/images/about/mission.jpg',                           'Youth creating art together',                   0),
  ('/images/events/pride-2026/pride-4.png',               'ArtUnity Youth at PRIDE 2026',                  1),
  ('/images/events/friday-cards/jul-10-2026/group-1.png', 'Friday Drawing Session group photo',            2),
  ('/images/events/screen-printing/sp-1.png',             'Screen printing at Oktoberfest',                3),
  ('/images/events/murals/mural-2.png',                   'Love One Another mural — So What Else',         4),
  ('/images/events/friday-cards/jul-10-2026/candid-1.png','Volunteers hand-illustrating get-well cards',   5),
  ('/images/events/friday-cards/friday-3.png',            'Friday Card Session — group with cards',        6),
  ('/images/events/pride-2026/pride-5.png',               'ArtUnity team and community at PRIDE',          7),
  ('/images/events/friday-cards/jul-10-2026/candid-3.png','A young artist drawing a card',                 8),
  ('/images/events/murals/mural-3.png',                   'Youth painting the community mural',            9),
  ('/images/events/friday-cards/jul-10-2026/candid-5.png','Cards in progress at the table',               10),
  ('/images/events/friday-cards/friday-6.png',            'Youth showing their handmade cards',           11),
  ('/images/events/pride-2026/pride-1.png',               'Chalk mural messages of love and belonging',   12),
  ('/images/events/murals/mural-1.png',                   'Community mural celebrating unity',            13),
  ('/images/events/pride-2026/pride-3.png',               'Youth volunteers at the chalk mural',          14),
  ('/images/events/screen-printing/sp-2.jpg',             'Fresh screen prints drying',                   15),
  ('/images/events/mlk/submission-03.png',                'MLK art competition submission',               16)
) as v(image_url, caption, sort_order)
where not exists (select 1 from carousel_slides);
