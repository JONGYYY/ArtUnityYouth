'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import SmartImage from '../common/SmartImage';

type EventGalleryProps = {
  images: string[];
  title: string;
};

function PhotoTile({
  src,
  alt,
  title,
  featured = false,
  onOpen,
}: {
  src: string;
  alt: string;
  title: string;
  featured?: boolean;
  onOpen: () => void;
}) {
  // Masonry tiles lock to each photo's real ratio (no cropping). The featured
  // hero keeps a fixed cinematic crop for a polished, consistent header.
  const [ratio, setRatio] = useState(featured ? 16 / 9 : 4 / 3);

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ aspectRatio: String(ratio) }}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-parch shadow-soft ring-1 ring-ink/5 cursor-zoom-in ${
        featured ? '' : 'mb-4 break-inside-avoid'
      }`}
    >
      <SmartImage
        src={src}
        alt={alt}
        placeholderText={title}
        fill
        sizes={featured ? '100vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        onLoadingComplete={(img) => {
          if (!featured && img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
      />
      {/* Hover veil + zoom hint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 shadow-card backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <MagnifyingGlassPlusIcon className="h-5 w-5" />
      </div>
    </button>
  );
}

export default function EventGallery({ images, title }: EventGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const total = images.length;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, close, go]);

  if (total === 0) return null;

  const [featured, ...rest] = images;

  return (
    <div>
      <PhotoTile src={featured} alt={`${title} — featured photo`} title={title} featured onOpen={() => setIndex(0)} />

      {rest.length > 0 && (
        <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {rest.map((src, i) => (
            <PhotoTile
              key={src}
              src={src}
              alt={`${title} photo ${i + 2}`}
              title={title}
              onOpen={() => setIndex(i + 1)}
            />
          ))}
        </div>
      )}

      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {total > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 sm:left-6"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 sm:right-6"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative h-[82vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <SmartImage
              src={images[index]}
              alt={`${title} photo ${index + 1}`}
              placeholderText={title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {total > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-ink/60 px-4 py-1.5 font-body text-sm text-cream/90">
              {index + 1} / {total}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
