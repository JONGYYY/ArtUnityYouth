'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EventItem } from '../../lib/content';
import ImageUploader from './ImageUploader';

type Draft = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: 'ongoing' | 'key';
  coverImage: string;
  images: string[];
  href: string;
  sortOrder: number;
};

const emptyDraft: Draft = {
  slug: '',
  title: '',
  date: '',
  location: '',
  description: '',
  category: 'key',
  coverImage: '',
  images: [],
  href: '',
  sortOrder: 0,
};

export default function EventsManager({ events }: { events: EventItem[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNew = () => {
    setError(null);
    setDraft({ ...emptyDraft, sortOrder: events.length });
  };

  const startEdit = (e: EventItem) => {
    setError(null);
    setDraft({
      id: e.id,
      slug: e.slug,
      title: e.title,
      date: e.date,
      location: e.location,
      description: e.description,
      category: e.category,
      coverImage: e.coverImage,
      images: e.images,
      href: e.href ?? '',
      sortOrder: e.sortOrder,
    });
  };

  const set = <K extends keyof Draft>(key: K, val: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [key]: val } : d));

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    setError(null);
    try {
      const method = draft.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/events', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...draft, href: draft.href || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Save failed');
      setDraft(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Delete failed');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  const field = 'mt-1 w-full rounded-sm border-ink/20 text-sm';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-4xl tracking-wide text-ink">EVENTS</h1>
        {!draft && (
          <button
            onClick={startNew}
            className="rounded-sm bg-rust text-cream px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-widest hover:bg-ink transition-colors"
          >
            + New Event
          </button>
        )}
      </div>

      {error && <p className="mb-4 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-rust text-sm">{error}</p>}

      {draft && (
        <div className="mb-8 rounded-sm border border-ink/10 bg-white p-6">
          <h2 className="font-heading text-2xl text-ink mb-4">{draft.id ? 'Edit event' : 'New event'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-sm text-ink/70">Title</label>
              <input className={field} value={draft.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div>
              <label className="font-body text-sm text-ink/70">Slug (URL) — leave blank to auto-generate</label>
              <input className={field} value={draft.slug} onChange={(e) => set('slug', e.target.value)} placeholder="auto from title" />
            </div>
            <div>
              <label className="font-body text-sm text-ink/70">Date (free text)</label>
              <input className={field} value={draft.date} onChange={(e) => set('date', e.target.value)} placeholder="e.g. June 2026" />
            </div>
            <div>
              <label className="font-body text-sm text-ink/70">Location</label>
              <input className={field} value={draft.location} onChange={(e) => set('location', e.target.value)} />
            </div>
            <div>
              <label className="font-body text-sm text-ink/70">Section</label>
              <select className={field} value={draft.category} onChange={(e) => set('category', e.target.value as Draft['category'])}>
                <option value="ongoing">Upcoming</option>
                <option value="key">Key / Past</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm text-ink/70">Sort order (lower = first)</label>
              <input type="number" className={field} value={draft.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} />
            </div>
            <div className="md:col-span-2">
              <label className="font-body text-sm text-ink/70">Description</label>
              <textarea rows={3} className={field} value={draft.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="font-body text-sm text-ink/70">
                Custom link (optional) — if set, the card links here instead of a detail page
              </label>
              <input className={field} value={draft.href} onChange={(e) => set('href', e.target.value)} placeholder="/events/friday-sessions" />
            </div>
            <div className="md:col-span-2">
              <ImageUploader label="Cover image" single value={draft.coverImage ? [draft.coverImage] : []} onChange={(urls) => set('coverImage', urls[0] || '')} />
            </div>
            <div className="md:col-span-2">
              <ImageUploader label="Gallery images (detail page)" value={draft.images} onChange={(urls) => set('images', urls)} />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={save} disabled={busy} className="rounded-sm bg-rust text-cream px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-widest hover:bg-ink transition-colors disabled:opacity-60">
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setDraft(null)} disabled={busy} className="rounded-sm border border-ink/20 px-6 py-2.5 font-body text-sm hover:border-rust hover:text-rust transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {events.length === 0 && <p className="font-body text-ink/50">No events yet.</p>}
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-4 rounded-sm border border-ink/10 bg-white p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={e.coverImage} alt="" className="w-16 h-16 object-cover rounded-sm bg-parch shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="font-heading text-lg text-ink truncate">{e.title}</div>
              <div className="font-body text-xs text-ink/50">
                {e.category === 'ongoing' ? 'Upcoming' : 'Key'} · /{e.slug}
                {e.date ? ` · ${e.date}` : ''}
              </div>
            </div>
            <button onClick={() => startEdit(e)} className="font-body text-sm text-ink/70 hover:text-rust transition-colors">Edit</button>
            <button onClick={() => remove(e.id, e.title)} className="font-body text-sm text-ink/40 hover:text-rust transition-colors">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
