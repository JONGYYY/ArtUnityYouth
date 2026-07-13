import EventsManager from '../../../components/admin/EventsManager';
import { getServiceClient } from '../../../lib/supabase/admin';
import type { EventItem } from '../../../lib/content';

export const dynamic = 'force-dynamic';

async function fetchEvents(): Promise<EventItem[]> {
  const supabase = getServiceClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from('events').select('*').order('sort_order', { ascending: true });
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date ?? '',
    location: row.location ?? '',
    description: row.description ?? '',
    category: row.category === 'ongoing' ? 'ongoing' : 'key',
    coverImage: row.cover_image ?? '',
    images: Array.isArray(row.images) ? row.images : [],
    href: row.href ?? null,
    sortOrder: row.sort_order ?? 0,
  }));
}

export default async function AdminEventsPage() {
  const events = await fetchEvents();
  return <EventsManager events={events} />;
}
