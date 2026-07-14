'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import LightboxImage from '../../../components/common/LightboxImage';
import type { FridaySession } from '../../../lib/content';

function dayPhotos(s: FridaySession): string[] {
  return [...s.groupPhotos, ...s.cardPhotos, ...s.candidPhotos];
}

export default function SessionShowcase({ sessions }: { sessions: FridaySession[] }) {
  const [dayIndex, setDayIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [dir, setDir] = useState(0);

  useEffect(() => {
    setPhotoIndex(0);
    setDir(0);
  }, [dayIndex]);

  const day = sessions[dayIndex];
  const photos = day ? dayPhotos(day) : [];
  const hasPhotos = photos.length > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (photos.length < 2) return;
      if (e.key === 'ArrowRight') {
        setDir(1);
        setPhotoIndex((i) => (i + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setDir(-1);
        setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photos.length]);

  if (sessions.length === 0) return null;

  const paginate = (d: number) => {
    if (photos.length < 2) return;
    setDir(d);
    setPhotoIndex((i) => (i + d + photos.length) % photos.length);
  };

  const jumpTo = (i: number) => {
    setDir(i > photoIndex ? 1 : -1);
    setPhotoIndex(i);
  };

  return (
    <div>
      {/* ── Day filmstrip ─────────────────────────────────────── */}
      <div className="flex gap-4 overflow-x-auto pb-3 mb-8 -mx-1 px-1">
        {sessions.map((s, i) => {
          const cover = dayPhotos(s)[0];
          const count = dayPhotos(s).length;
          const active = i === dayIndex;
          return (
            <button
              key={s.id}
              onClick={() => setDayIndex(i)}
              aria-pressed={active}
              className={`group shrink-0 w-36 sm:w-44 text-left rounded-sm overflow-hidden border transition-all ${
                active ? 'border-rust ring-2 ring-rust/25' : 'border-ink/10 hover:border-ink/40'
              }`}
            >
              <div className="relative aspect-[4/3] bg-parch overflow-hidden">
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cover}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full font-accent text-ink/30 text-sm">
                    No photos yet
                  </div>
                )}
              </div>
              <div className="p-2.5 bg-white">
                <div className="font-heading text-sm text-ink truncate">{s.label}</div>
                <div className="font-body text-xs text-ink/50">
                  {count} photo{count === 1 ? '' : 's'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Selected day header ───────────────────────────────── */}
      <div className="mb-4 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-heading text-2xl text-ink">{day?.label}</h3>
          {day?.note && <p className="font-body text-ink/60 max-w-2xl mt-1">{day.note}</p>}
        </div>
        {hasPhotos && (
          <span className="font-accent text-lg text-rust shrink-0">
            {photoIndex + 1} / {photos.length}
          </span>
        )}
      </div>

      {/* ── Slideshow viewer ──────────────────────────────────── */}
      {hasPhotos ? (
        <>
          <div className="relative bg-ink rounded-sm overflow-hidden shadow-card-hover aspect-[16/10]">
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={`${dayIndex}-${photoIndex}`}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <LightboxImage
                  src={photos[photoIndex]}
                  alt={`${day?.label} photo ${photoIndex + 1}`}
                  placeholderText={day?.label}
                />
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-cream/85 text-ink hover:bg-cream flex items-center justify-center shadow-card transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-cream/85 text-ink hover:bg-cream flex items-center justify-center shadow-card transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="mt-4 flex gap-2.5 overflow-x-auto pb-2">
              {photos.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  onClick={() => jumpTo(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`relative shrink-0 w-20 h-16 rounded-sm overflow-hidden border-2 transition-all ${
                    i === photoIndex ? 'border-rust' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="rounded-sm border border-dashed border-ink/20 bg-parch/50 py-16 text-center font-body text-ink/50">
          Photos from this session are coming soon.
        </div>
      )}
    </div>
  );
}
