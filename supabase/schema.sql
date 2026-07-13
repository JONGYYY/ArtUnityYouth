-- ArtUnity Youth — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: uses "if not exists" / "on conflict" where possible.

-- ────────────────────────────────────────────────────────────
-- Tables
-- ────────────────────────────────────────────────────────────

create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  date        text default '',
  location    text default '',
  description text default '',
  category    text not null default 'key' check (category in ('ongoing', 'key')),
  cover_image text default '',
  images      jsonb not null default '[]'::jsonb,
  href        text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists friday_sessions (
  id            uuid primary key default gen_random_uuid(),
  label         text not null,
  note          text default '',
  card_photos   jsonb not null default '[]'::jsonb,
  candid_photos jsonb not null default '[]'::jsonb,
  group_photos  jsonb not null default '[]'::jsonb,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create table if not exists session_info (
  id       int primary key default 1,
  day      text not null default 'Every Friday',
  time     text not null default '4:00 - 6:00 PM',
  location text not null default 'Rockville Memorial Library',
  address  text not null default '21 Maryland Ave, Rockville, MD 20850',
  map_url  text not null default 'https://maps.google.com/?q=Rockville+Memorial+Library,+21+Maryland+Ave,+Rockville,+MD+20850',
  constraint session_info_singleton check (id = 1)
);

create table if not exists friday_signups (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- Public (anon) can READ content and RSVP. All content writes go
-- through the admin API using the service role key (which bypasses RLS).
-- ────────────────────────────────────────────────────────────

alter table events enable row level security;
alter table friday_sessions enable row level security;
alter table session_info enable row level security;
alter table friday_signups enable row level security;

drop policy if exists "public read events" on events;
create policy "public read events" on events for select to anon, authenticated using (true);

drop policy if exists "public read friday_sessions" on friday_sessions;
create policy "public read friday_sessions" on friday_sessions for select to anon, authenticated using (true);

drop policy if exists "public read session_info" on session_info;
create policy "public read session_info" on session_info for select to anon, authenticated using (true);

drop policy if exists "public rsvp insert" on friday_signups;
create policy "public rsvp insert" on friday_signups for insert to anon, authenticated with check (true);

-- ────────────────────────────────────────────────────────────
-- Seed data (mirrors the previously hardcoded content)
-- ────────────────────────────────────────────────────────────

insert into session_info (id) values (1) on conflict (id) do nothing;

insert into events (slug, title, date, location, description, category, cover_image, images, href, sort_order) values
  ('o1', 'MLK Day Art Competition', 'Submissions due January 31', '',
   'Ongoing art competition honoring Dr. Martin Luther King Jr. Create a piece that reflects service, equity, and hope.',
   'key', '/images/events/MLK.png', '[]'::jsonb, null, 0),
  ('friday-cards', 'Friday Card Sessions', 'Ongoing — Every Friday', 'Rockville Memorial Library',
   'Every Friday, youth and community members gather at the library to hand-illustrate get-well cards for hospital patients — spreading joy through art.',
   'key', '/images/events/friday-cards/friday-3.png', '[]'::jsonb, '/events/friday-sessions', 1),
  ('pride-2026', 'PRIDE 2026', 'June 2026', 'Rockville Town Center',
   'ArtUnityYouth celebrated PRIDE 2026 in Rockville Town Center, hosting an interactive chalk mural where community members shared messages of love, identity, and belonging.',
   'key', '/images/events/pride-2026/pride-4.png',
   '["/images/events/pride-2026/pride-4.png","/images/events/pride-2026/pride-5.png","/images/events/pride-2026/pride-3.png","/images/events/pride-2026/pride-2.png","/images/events/pride-2026/pride-1.png"]'::jsonb,
   null, 2),
  ('p1', 'Community Art Workshop', '', 'Rockville Town Center',
   'Live screen printing and expressive ink drawing during Oktoberfest—inviting passersby to co-create art and take home their own prints.',
   'key', '/images/events/screen-printing/sp-1.png',
   '["/images/events/screen-printing/sp-1.png","/images/events/screen-printing/sp-2.jpg"]'::jsonb,
   null, 3),
  ('p5', 'Annual Holiday Cards for Hospitals', '', '',
   'A holiday card-making workshop where kids designed and illustrated heartfelt Christmas cards for patients at Hospitals.',
   'key', '/images/events/event-5.JPG', '[]'::jsonb, null, 4),
  ('p4', 'Art Studio Sale', '', '',
   'Selling art pieces made by our art studio to support youth programs.',
   'key', '/images/events/event-4.jpg', '[]'::jsonb, null, 5),
  ('p2', 'Face Painting Pop-up', '', 'Washington, DC',
   'A joyful face painting station bringing color and smiles to families and neighbors throughout the day.',
   'key', '/images/events/event-2.jpg', '[]'::jsonb, null, 6),
  ('p3', 'Mural Paintings (Year-Round)', '', 'So What Else Food Pantry',
   'Collaborative mural sessions celebrating diversity and youth creativity—adding vibrant color to shared spaces. Youth volunteers paint large-scale murals with themes of unity, culture, and community at the So What Else Food Pantry.',
   'key', '/images/events/murals/mural-2.png',
   '["/images/events/murals/mural-2.png","/images/events/murals/mural-3.png","/images/events/murals/mural-1.png","/images/events/murals/mural-4.png"]'::jsonb,
   null, 7)
on conflict (slug) do nothing;

insert into friday_sessions (label, note, card_photos, candid_photos, group_photos, sort_order) values
  ('July 10, 2026',
   'A packed table of volunteers of all ages hand-illustrating get-well cards for children in local hospitals — capped off with our weekly group photo.',
   '[]'::jsonb,
   '["/images/events/friday-cards/jul-10-2026/candid-1.png","/images/events/friday-cards/jul-10-2026/candid-2.png","/images/events/friday-cards/jul-10-2026/candid-3.png","/images/events/friday-cards/jul-10-2026/candid-4.png","/images/events/friday-cards/jul-10-2026/candid-5.png","/images/events/friday-cards/jul-10-2026/candid-6.png","/images/events/friday-cards/jul-10-2026/candid-7.png"]'::jsonb,
   '["/images/events/friday-cards/jul-10-2026/group-1.png","/images/events/friday-cards/jul-10-2026/group-2.png"]'::jsonb,
   0),
  ('A Recent Friday',
   'A full table of volunteers illustrating get-well cards for young hospital patients.',
   '["/images/events/friday-cards/friday-2.png","/images/events/friday-cards/friday-5.png"]'::jsonb,
   '["/images/events/friday-cards/friday-1.png","/images/events/friday-cards/friday-4.png","/images/events/friday-cards/friday-7.png"]'::jsonb,
   '["/images/events/friday-cards/friday-3.png"]'::jsonb,
   1),
  ('Earlier Session',
   'More heartfelt cards and smiling faces from an earlier Friday gathering.',
   '["/images/events/friday-cards/friday-6.png"]'::jsonb,
   '["/images/events/friday-cards/friday-8.png"]'::jsonb,
   '[]'::jsonb,
   2)
on conflict do nothing;

-- ────────────────────────────────────────────────────────────
-- Storage: create a PUBLIC bucket named "event-photos" for admin uploads.
-- Easiest via Dashboard -> Storage -> New bucket -> name "event-photos" -> Public.
-- Or uncomment the line below to create it via SQL:
-- insert into storage.buckets (id, name, public) values ('event-photos', 'event-photos', true) on conflict (id) do nothing;
