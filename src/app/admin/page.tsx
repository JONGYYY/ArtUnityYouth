import Link from 'next/link';
import { getServiceClient } from '../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

async function count(table: string): Promise<number | null> {
  const supabase = getServiceClient();
  if (!supabase) return null;
  const { count: c, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
  if (error) return null;
  return c ?? 0;
}

export default async function AdminOverview() {
  const [events, sessions, rsvps] = await Promise.all([
    count('events'),
    count('friday_sessions'),
    count('friday_signups'),
  ]);

  const cards = [
    { label: 'Events', value: events, href: '/admin/events', cta: 'Manage events' },
    { label: 'Friday Sessions', value: sessions, href: '/admin/friday-sessions', cta: 'Manage sessions' },
    { label: 'Friday RSVPs', value: rsvps, href: '/admin/rsvps', cta: 'View sign-ups' },
  ];

  const notConfigured = events === null && sessions === null && rsvps === null;

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-ink mb-2">DASHBOARD</h1>
      <p className="font-body text-ink/60 mb-8">Manage what visitors see across the site.</p>

      {notConfigured && (
        <div className="mb-8 rounded-sm border border-ochre/40 bg-ochre/10 px-5 py-4 font-body text-sm text-ink/80">
          Supabase tables aren&apos;t reachable yet. Run <code>supabase/schema.sql</code> in your
          Supabase SQL editor and create the <code>event-photos</code> storage bucket to enable editing.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="block rounded-sm border border-ink/10 bg-white p-6 hover:shadow-card-hover transition-shadow"
          >
            <div className="font-body text-sm text-ink/50 mb-1">{c.label}</div>
            <div className="font-display text-5xl text-ink mb-3">{c.value ?? '—'}</div>
            <div className="font-body text-sm text-rust">{c.cta} →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
