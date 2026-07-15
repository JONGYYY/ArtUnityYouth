'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import LightboxImage from '../common/LightboxImage';

const images = [
  { src: '/images/events/friday-cards/jul-10-2026/candid-2.png', alt: 'A young artist drawing a get-well card' },
  { src: '/images/events/murals/mural-2.png', alt: 'Community mural celebrating unity' },
  { src: '/images/events/pride-2026/pride-4.png', alt: 'ArtUnity Youth at PRIDE 2026' },
  { src: '/images/events/screen-printing/sp-1.png', alt: 'Screen printing at Oktoberfest' },
  { src: '/images/events/friday-cards/jul-10-2026/group-1.png', alt: 'Weekly Friday session group photo' },
  { src: '/images/events/friday-cards/friday-6.png', alt: 'Youth showing their handmade cards' },
];

const INTERVAL_MS = 4500;

export default function MissionGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % images.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 shadow-card bg-parch">
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="absolute inset-0"
          >
            <LightboxImage
              src={images[index].src}
              alt={images[index].alt}
              placeholderText="ArtUnity Youth"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-cream/85 text-ink shadow-card backdrop-blur-sm hover:bg-cream transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-cream/85 text-ink shadow-card backdrop-blur-sm hover:bg-cream transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-rust/40 pointer-events-none" />

      {/* Dots */}
      <div className="mt-3 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Photo ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === index ? 'w-6 h-2 bg-rust' : 'w-2 h-2 bg-ink/20 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
