import FridayManager from '../../../components/admin/FridayManager';
import { getServiceClient } from '../../../lib/supabase/admin';
import { getSessionInfo } from '../../../lib/content';
import type { FridaySession } from '../../../lib/content';

export const dynamic = 'force-dynamic';

async function fetchSessions(): Promise<FridaySession[]> {
  const supabase = getServiceClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from('friday_sessions').select('*').order('sort_order', { ascending: true });
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    label: row.label,
    note: row.note ?? '',
    cardPhotos: Array.isArray(row.card_photos) ? row.card_photos : [],
    candidPhotos: Array.isArray(row.candid_photos) ? row.candid_photos : [],
    groupPhotos: Array.isArray(row.group_photos) ? row.group_photos : [],
    sortOrder: row.sort_order ?? 0,
  }));
}

export default async function AdminFridayPage() {
  const [sessions, info] = await Promise.all([fetchSessions(), getSessionInfo()]);
  return <FridayManager sessions={sessions} info={info} />;
}
