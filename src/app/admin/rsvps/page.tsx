import { getServiceClient } from '../../../lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function AdminRsvpsPage() {
  const supabase = getServiceClient();
  const { data, error } = supabase
    ? await supabase.from('friday_signups').select('*').order('created_at', { ascending: false })
    : { data: null, error: { message: 'Server not configured' } as { message: string } };

  const rows = data ?? [];

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="font-display text-4xl tracking-wide text-ink">FRIDAY RSVPS</h1>
        <span className="font-accent text-2xl text-rust">
          {rows.length} {rows.length === 1 ? 'person' : 'people'} going
        </span>
      </div>

      {error && (
        <p className="mb-4 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-rust text-sm">
          {error.message}
        </p>
      )}

      {rows.length === 0 ? (
        <p className="font-body text-ink/50">No sign-ups yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-ink/10 bg-white">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink/10 font-body text-xs uppercase tracking-widest text-ink/50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Signed up</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-ink/5 last:border-0 font-body text-sm text-ink/80">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${r.email}`} className="text-rust hover:underline">{r.email}</a>
                  </td>
                  <td className="px-4 py-3 text-ink/50">
                    {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
