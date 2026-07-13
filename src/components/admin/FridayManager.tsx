'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FridaySession, SessionInfo } from '../../lib/content';
import ImageUploader from './ImageUploader';

type Draft = {
  id?: string;
  label: string;
  note: string;
  cardPhotos: string[];
  candidPhotos: string[];
  groupPhotos: string[];
  sortOrder: number;
};

const emptyDraft: Draft = {
  label: '',
  note: '',
  cardPhotos: [],
  candidPhotos: [],
  groupPhotos: [],
  sortOrder: 0,
};

export default function FridayManager({
  sessions,
  info,
}: {
  sessions: FridaySession[];
  info: SessionInfo;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Schedule editor state
  const [schedule, setSchedule] = useState<SessionInfo>(info);
  const [scheduleBusy, setScheduleBusy] = useState(false);
  const [scheduleMsg, setScheduleMsg] = useState<string | null>(null);

  const field = 'mt-1 w-full rounded-sm border-ink/20 text-sm';

  const set = <K extends keyof Draft>(key: K, val: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [key]: val } : d));

  const saveSchedule = async () => {
    setScheduleBusy(true);
    setScheduleMsg(null);
    try {
      const res = await fetch('/api/admin/session-info', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Save failed');
      setScheduleMsg('Saved!');
      router.refresh();
    } catch (e) {
      setScheduleMsg(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setScheduleBusy(false);
    }
  };

  const saveSession = async () => {
    if (!draft) return;
    setBusy(true);
    setError(null);
    try {
      const method = draft.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/friday-sessions', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
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

  const remove = async (id: string, label: string) => {
    if (!confirm(`Delete session "${label}"?`)) return;
    setBusy(true);
    try {
      const res = await fetch('/api/admin/friday-sessions', {
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

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-ink mb-6">FRIDAY SESSIONS</h1>

      {/* Schedule editor */}
      <div className="mb-10 rounded-sm border border-ink/10 bg-white p-6">
        <h2 className="font-heading text-2xl text-ink mb-1">Next Session details</h2>
        <p className="font-body text-sm text-ink/50 mb-4">Shown in the &quot;Next Session&quot; block and sticky bar.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm text-ink/70">Day</label>
            <input className={field} value={schedule.day} onChange={(e) => setSchedule({ ...schedule, day: e.target.value })} />
          </div>
          <div>
            <label className="font-body text-sm text-ink/70">Time</label>
            <input className={field} value={schedule.time} onChange={(e) => setSchedule({ ...schedule, time: e.target.value })} />
          </div>
          <div>
            <label className="font-body text-sm text-ink/70">Location</label>
            <input className={field} value={schedule.location} onChange={(e) => setSchedule({ ...schedule, location: e.target.value })} />
          </div>
          <div>
            <label className="font-body text-sm text-ink/70">Address</label>
            <input className={field} value={schedule.address} onChange={(e) => setSchedule({ ...schedule, address: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <label className="font-body text-sm text-ink/70">Map URL</label>
            <input className={field} value={schedule.mapUrl} onChange={(e) => setSchedule({ ...schedule, mapUrl: e.target.value })} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button onClick={saveSchedule} disabled={scheduleBusy} className="rounded-sm bg-teal text-cream px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-widest hover:bg-ink transition-colors disabled:opacity-60">
            {scheduleBusy ? 'Saving…' : 'Save schedule'}
          </button>
          {scheduleMsg && <span className="font-body text-sm text-ink/60">{scheduleMsg}</span>}
        </div>
      </div>

      {/* Sessions */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl text-ink">Session log</h2>
        {!draft && (
          <button
            onClick={() => { setError(null); setDraft({ ...emptyDraft, sortOrder: 0 }); }}
            className="rounded-sm bg-rust text-cream px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-widest hover:bg-ink transition-colors"
          >
            + New Session
          </button>
        )}
      </div>

      {error && <p className="mb-4 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-rust text-sm">{error}</p>}

      {draft && (
        <div className="mb-8 rounded-sm border border-ink/10 bg-white p-6">
          <h3 className="font-heading text-xl text-ink mb-4">{draft.id ? 'Edit session' : 'New session'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-body text-sm text-ink/70">Date / label</label>
              <input className={field} value={draft.label} onChange={(e) => set('label', e.target.value)} placeholder="e.g. July 10, 2026" />
            </div>
            <div>
              <label className="font-body text-sm text-ink/70">Sort order (0 = newest, shown first)</label>
              <input type="number" className={field} value={draft.sortOrder} onChange={(e) => set('sortOrder', Number(e.target.value))} />
            </div>
            <div className="md:col-span-2">
              <label className="font-body text-sm text-ink/70">Note</label>
              <textarea rows={2} className={field} value={draft.note} onChange={(e) => set('note', e.target.value)} />
            </div>
          </div>
          <div className="space-y-5">
            <ImageUploader label="Card photos (the artwork)" value={draft.cardPhotos} onChange={(u) => set('cardPhotos', u)} />
            <ImageUploader label="Candid photos (kids drawing)" value={draft.candidPhotos} onChange={(u) => set('candidPhotos', u)} />
            <ImageUploader label="Group photos" value={draft.groupPhotos} onChange={(u) => set('groupPhotos', u)} />
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={saveSession} disabled={busy} className="rounded-sm bg-rust text-cream px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-widest hover:bg-ink transition-colors disabled:opacity-60">
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setDraft(null)} disabled={busy} className="rounded-sm border border-ink/20 px-6 py-2.5 font-body text-sm hover:border-rust hover:text-rust transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {sessions.length === 0 && <p className="font-body text-ink/50">No sessions yet.</p>}
        {sessions.map((s) => {
          const total = s.cardPhotos.length + s.candidPhotos.length + s.groupPhotos.length;
          return (
            <div key={s.id} className="flex items-center gap-4 rounded-sm border border-ink/10 bg-white p-3">
              <div className="min-w-0 flex-1">
                <div className="font-heading text-lg text-ink truncate">{s.label}</div>
                <div className="font-body text-xs text-ink/50">{total} photo{total === 1 ? '' : 's'}</div>
              </div>
              <button
                onClick={() => { setError(null); setDraft({ id: s.id, label: s.label, note: s.note, cardPhotos: s.cardPhotos, candidPhotos: s.candidPhotos, groupPhotos: s.groupPhotos, sortOrder: s.sortOrder }); }}
                className="font-body text-sm text-ink/70 hover:text-rust transition-colors"
              >
                Edit
              </button>
              <button onClick={() => remove(s.id, s.label)} className="font-body text-sm text-ink/40 hover:text-rust transition-colors">Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
