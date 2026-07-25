import { createSupabaseServerClient } from './supabase/server';
import {
  SESSION_INFO as SEED_SESSION_INFO,
  fridaySessions as SEED_FRIDAY_SESSIONS,
} from '../app/events/friday-sessions/data';

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: 'ongoing' | 'key';
  coverImage: string;
  images: string[];
  href: string | null;
  sortOrder: number;
};

export type FridaySession = {
  id: string;
  label: string;
  note: string;
  cardPhotos: string[];
  candidPhotos: string[];
  groupPhotos: string[];
  sortOrder: number;
};

export type SessionInfo = {
  day: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
};

// ── Fallback seeds (used when the DB isn't reachable / not yet seeded) ──

const FALLBACK_EVENTS: EventItem[] = [
  { id: 'o1', slug: 'o1', title: 'MLK Day Art Competition', date: 'Submissions due January 31', location: '', description: 'Ongoing art competition honoring Dr. Martin Luther King Jr. Create a piece that reflects service, equity, and hope.', category: 'key', coverImage: '/images/events/MLK.png', images: ['/images/events/mlk/submission-01.png', '/images/events/mlk/submission-02.png', '/images/events/mlk/submission-03.png', '/images/events/mlk/submission-04.png', '/images/events/mlk/submission-05.png', '/images/events/mlk/submission-06.png', '/images/events/mlk/submission-07.png', '/images/events/mlk/submission-08.png', '/images/events/mlk/submission-09.png', '/images/events/mlk/submission-10.png', '/images/events/mlk/submission-11.png'], href: null, sortOrder: 0 },
  { id: 'friday-cards', slug: 'friday-cards', title: 'Friday Art & Kindness Sessions', date: 'Ongoing — Every Friday', location: 'Rockville Memorial Library', description: 'Youth and community members come together to create handmade encouragement cards for children, families, seniors, and others who could use a little extra kindness. Volunteers design thoughtful artwork, write uplifting messages, and help prepare cards for donation to nonprofit, healthcare, and community organizations.', category: 'key', coverImage: '/images/events/friday-cards/friday-3.png', images: [], href: '/events/friday-sessions', sortOrder: 1 },
  { id: 'pride-2026', slug: 'pride-2026', title: 'PRIDE 2026', date: 'June 2026', location: 'Rockville Town Center', description: 'ArtUnityYouth celebrated PRIDE 2026 in Rockville Town Center, hosting an interactive chalk mural where community members shared messages of love, identity, and belonging.', category: 'key', coverImage: '/images/events/pride-2026/pride-4.png', images: ['/images/events/pride-2026/pride-4.png', '/images/events/pride-2026/pride-5.png', '/images/events/pride-2026/pride-3.png', '/images/events/pride-2026/pride-2.png', '/images/events/pride-2026/pride-1.png'], href: null, sortOrder: 2 },
  { id: 'p1', slug: 'p1', title: 'Community Art Workshop', date: '', location: 'Rockville Town Center', description: 'Live screen printing and expressive ink drawing during Oktoberfest—inviting passersby to co-create art and take home their own prints.', category: 'key', coverImage: '/images/events/screen-printing/sp-1.png', images: ['/images/events/screen-printing/sp-1.png', '/images/events/screen-printing/sp-2.jpg', '/images/events/screen-printing/workshop/workshop-01.png', '/images/events/screen-printing/workshop/workshop-02.png', '/images/events/screen-printing/workshop/workshop-03.png', '/images/events/screen-printing/workshop/workshop-04.png', '/images/events/screen-printing/workshop/workshop-05.png', '/images/events/screen-printing/workshop/workshop-06.png', '/images/events/screen-printing/workshop/workshop-07.png', '/images/events/screen-printing/workshop/workshop-08.png', '/images/events/screen-printing/workshop/workshop-09.png', '/images/events/screen-printing/workshop/workshop-10.png', '/images/events/screen-printing/workshop/workshop-11.png', '/images/events/screen-printing/workshop/workshop-12.png', '/images/events/screen-printing/workshop/workshop-13.png', '/images/events/screen-printing/workshop/workshop-14.png', '/images/events/screen-printing/workshop/workshop-15.png', '/images/events/screen-printing/workshop/workshop-16.png', '/images/events/screen-printing/workshop/workshop-17.png', '/images/events/screen-printing/workshop/workshop-18.png', '/images/events/screen-printing/workshop/workshop-19.png'], href: null, sortOrder: 3 },
  { id: 'p5', slug: 'p5', title: 'Annual Holiday Cards for Hospitals', date: '', location: '', description: 'A holiday card-making workshop where kids designed and illustrated heartfelt Christmas cards for patients at Hospitals.', category: 'key', coverImage: '/images/events/event-5.JPG', images: [], href: null, sortOrder: 4 },
  { id: 'p4', slug: 'p4', title: 'Art Studio Sale', date: '', location: '', description: 'Selling art pieces made by our art studio to support youth programs.', category: 'key', coverImage: '/images/events/event-4.jpg', images: [], href: null, sortOrder: 5 },
  { id: 'p2', slug: 'p2', title: 'Face Painting Pop-up', date: '', location: 'Washington, DC', description: 'A joyful face painting station bringing color and smiles to families and neighbors throughout the day.', category: 'key', coverImage: '/images/events/event-2.jpg', images: [], href: null, sortOrder: 6 },
  { id: 'p3', slug: 'p3', title: 'Mural Paintings (Year-Round)', date: '', location: 'So What Else Food Pantry', description: 'Collaborative mural sessions celebrating diversity and youth creativity—adding vibrant color to shared spaces. Youth volunteers paint large-scale murals with themes of unity, culture, and community at the So What Else Food Pantry.', category: 'key', coverImage: '/images/events/murals/mural-2.png', images: ['/images/events/murals/mural-2.png', '/images/events/murals/mural-3.png', '/images/events/murals/mural-1.png', '/images/events/murals/mural-4.png'], href: null, sortOrder: 7 },
];

const FALLBACK_SESSIONS: FridaySession[] = SEED_FRIDAY_SESSIONS.map((s, i) => ({
  id: s.id,
  label: s.date,
  note: s.note || '',
  cardPhotos: s.cardPhotos,
  candidPhotos: s.candidPhotos,
  groupPhotos: s.groupPhotos,
  sortOrder: i,
}));

const FALLBACK_INFO: SessionInfo = { ...SEED_SESSION_INFO };

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
  return [];
}

// ── Public reads (DB first, fallback to seeds) ──

export async function getEvents(): Promise<EventItem[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_EVENTS;
    return data.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      date: row.date ?? '',
      location: row.location ?? '',
      description: row.description ?? '',
      category: row.category === 'ongoing' ? 'ongoing' : 'key',
      coverImage: row.cover_image ?? '',
      images: toStringArray(row.images),
      href: row.href ?? null,
      sortOrder: row.sort_order ?? 0,
    }));
  } catch {
    return FALLBACK_EVENTS;
  }
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getFridaySessions(): Promise<FridaySession[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('friday_sessions')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_SESSIONS;
    return data.map((row) => ({
      id: row.id,
      label: row.label,
      note: row.note ?? '',
      cardPhotos: toStringArray(row.card_photos),
      candidPhotos: toStringArray(row.candid_photos),
      groupPhotos: toStringArray(row.group_photos),
      sortOrder: row.sort_order ?? 0,
    }));
  } catch {
    return FALLBACK_SESSIONS;
  }
}

export async function getSessionInfo(): Promise<SessionInfo> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('session_info').select('*').eq('id', 1).single();
    if (error || !data) return FALLBACK_INFO;
    return {
      day: data.day ?? FALLBACK_INFO.day,
      time: data.time ?? FALLBACK_INFO.time,
      location: data.location ?? FALLBACK_INFO.location,
      address: data.address ?? FALLBACK_INFO.address,
      mapUrl: data.map_url ?? FALLBACK_INFO.mapUrl,
    };
  } catch {
    return FALLBACK_INFO;
  }
}
