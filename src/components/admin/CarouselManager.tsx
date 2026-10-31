'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CarouselSlide } from '../../lib/carousel-slides';

export default function CarouselManager({ slides }: { slides: CarouselSlide[] }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(slides);
  const [captions, setCaptions] = useState<Record<string, string>>({});
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setItems(slides);
  }, [slides]);

  const call = async (method: string, body: unknown, fallbackError: string) => {
    const res = await fetch('/api/admin/carousel', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || fallbackError);
    return data;
  };

  const run = async (fn: () => Promise<void>, fallbackError: string) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : fallbackError);
      setItems(slides);
    } finally {
      setBusy(false);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: { imageUrl: string }[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(`${file.name}: ${data?.error || 'Upload failed'}`);
        uploaded.push({ imageUrl: data.url });
      }
      await call('POST', { slides: uploaded }, 'Could not add photos');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const saveCaption = (slide: CarouselSlide) =>
    run(async () => {
      await call('PATCH', { id: slide.id, caption: captions[slide.id] ?? slide.caption }, 'Save failed');
      setCaptions((c) => {
        const next = { ...c };
        delete next[slide.id];
        return next;
      });
    }, 'Save failed');

  const saveOrder = (ordered: CarouselSlide[]) => {
    const changed = ordered.some((s, i) => s.id !== slides[i]?.id);
    if (!changed) return;
    run(() => call('PATCH', { order: ordered.map((s) => s.id) }, 'Reorder failed'), 'Reorder failed');
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return items;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    return next;
  };

  const remove = (slide: CarouselSlide, n: number) => {
    if (!confirm(`Remove photo ${n}${slide.caption ? ` ("${slide.caption}")` : ''} from the homepage carousel?`)) return;
    run(() => call('DELETE', { id: slide.id }, 'Delete failed'), 'Delete failed');
  };

  const field = 'w-full rounded-sm border-ink/20 text-sm';

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-4xl tracking-wide text-ink">HOMEPAGE CAROUSEL</h1>
        <button
          onClick={() => fileInput.current?.click()}
          disabled={uploading || busy}
          className="rounded-sm bg-rust text-cream px-5 py-2.5 font-body text-sm font-semibold uppercase tracking-widest hover:bg-ink transition-colors disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : '+ Upload Photos'}
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <p className="font-body text-sm text-ink/60 mb-6">
        These photos appear in the homepage hero, in this order. Drag a row (or use ↑ ↓) to reorder.
        Landscape JPGs around 1600×1200 look best; max 10MB each.
      </p>

      {error && <p className="mb-4 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 text-rust text-sm">{error}</p>}

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="font-body text-ink/50">
            No photos yet — the homepage is showing the built-in default photos. Upload photos to replace them.
          </p>
        )}
        {items.map((s, i) => {
          const caption = captions[s.id] ?? s.caption;
          const dirty = caption !== s.caption;
          return (
            <div
              key={s.id}
              draggable={!busy}
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragIndex === null || dragIndex === i) return;
                move(dragIndex, i);
                setDragIndex(i);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                saveOrder(items);
              }}
              className={`flex items-center gap-4 rounded-sm border bg-white p-3 transition-colors ${
                dragIndex === i ? 'border-rust/60 bg-rust/5' : 'border-ink/10'
              }`}
            >
              <span className="cursor-grab select-none text-ink/30 text-lg leading-none" aria-hidden>⋮⋮</span>
              <span className="w-6 text-right font-body text-xs text-ink/40 tabular-nums">{i + 1}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.imageUrl} alt="" className="w-24 h-[72px] object-cover rounded-sm bg-parch shrink-0" />
              <div className="min-w-0 flex-1">
                <label className="sr-only" htmlFor={`caption-${s.id}`}>Caption for photo {i + 1}</label>
                <input
                  id={`caption-${s.id}`}
                  className={field}
                  value={caption}
                  placeholder="Caption (shown on the photo)"
                  onChange={(e) => setCaptions((c) => ({ ...c, [s.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && dirty) saveCaption(s);
                  }}
                />
              </div>
              {dirty && (
                <button
                  onClick={() => saveCaption(s)}
                  disabled={busy}
                  className="font-body text-sm font-semibold text-rust hover:text-ink transition-colors"
                >
                  Save
                </button>
              )}
              <div className="flex flex-col">
                <button
                  onClick={() => saveOrder(move(i, i - 1))}
                  disabled={busy || i === 0}
                  aria-label={`Move photo ${i + 1} up`}
                  className="px-1 font-body text-xs text-ink/50 hover:text-rust disabled:opacity-20"
                >
                  ↑
                </button>
                <button
                  onClick={() => saveOrder(move(i, i + 1))}
                  disabled={busy || i === items.length - 1}
                  aria-label={`Move photo ${i + 1} down`}
                  className="px-1 font-body text-xs text-ink/50 hover:text-rust disabled:opacity-20"
                >
                  ↓
                </button>
              </div>
              <button
                onClick={() => remove(s, i + 1)}
                disabled={busy}
                className="font-body text-sm text-ink/40 hover:text-rust transition-colors"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
