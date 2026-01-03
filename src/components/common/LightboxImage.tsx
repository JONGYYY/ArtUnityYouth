'use client';

import { useEffect, useState } from 'react';
import SmartImage from './SmartImage';

type LightboxImageProps = {
  src: string;
  alt: string;
  placeholderText?: string;
  className?: string;
};

export default function LightboxImage({
  src,
  alt,
  placeholderText,
  className = '',
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="group relative block w-full h-full cursor-zoom-in focus-visible:focus"
        onClick={() => setOpen(true)}
      >
        <SmartImage
          src={src}
          alt={alt}
          placeholderText={placeholderText || alt}
          className={`object-contain ${className}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl h-[80vh] bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute -top-10 right-0 text-white/90 hover:text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <div className="relative w-full h-full">
              <SmartImage
                src={src}
                alt={alt}
                placeholderText={placeholderText || alt}
                className="object-contain"
                fill
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}


