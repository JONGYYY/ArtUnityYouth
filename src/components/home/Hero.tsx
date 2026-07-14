'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

/* ── Carousel ─────────────────────────────────────────────────── */
const carouselImages = [
  { src: '/images/about/mission.jpg',                        alt: 'Youth creating art together' },
  { src: '/images/events/pride-2026/pride-4.png',            alt: 'ArtUnity Youth at PRIDE 2026' },
  { src: '/images/events/friday-cards/jul-10-2026/group-1.png', alt: 'Friday Drawing Session group photo' },
  { src: '/images/events/screen-printing/sp-1.png',          alt: 'Screen printing at Oktoberfest' },
  { src: '/images/events/murals/mural-2.png',                alt: 'Love One Another mural — So What Else' },
  { src: '/images/events/friday-cards/jul-10-2026/candid-1.png', alt: 'Volunteers hand-illustrating get-well cards' },
  { src: '/images/events/friday-cards/friday-3.png',         alt: 'Friday Card Session — group with cards' },
  { src: '/images/events/pride-2026/pride-5.png',            alt: 'ArtUnity team and community at PRIDE' },
  { src: '/images/events/friday-cards/jul-10-2026/candid-3.png', alt: 'A young artist drawing a card' },
  { src: '/images/events/murals/mural-3.png',                alt: 'Youth painting the community mural' },
  { src: '/images/events/friday-cards/jul-10-2026/candid-5.png', alt: 'Cards in progress at the table' },
  { src: '/images/events/friday-cards/friday-6.png',         alt: 'Youth showing their handmade cards' },
  { src: '/images/events/pride-2026/pride-1.png',            alt: 'Chalk mural messages of love and belonging' },
  { src: '/images/events/murals/mural-1.png',                alt: 'Community mural celebrating unity' },
  { src: '/images/events/pride-2026/pride-3.png',            alt: 'Youth volunteers at the chalk mural' },
  { src: '/images/events/screen-printing/sp-2.jpg',          alt: 'Fresh screen prints drying' },
  { src: '/images/events/mlk/submission-03.png',             alt: 'MLK art competition submission' },
];
const INTERVAL_MS = 10000;

/* ── Variants ─────────────────────────────────────────────────── */
const wordReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%', opacity: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: 0.55 + i * 0.12, ease: 'easeOut' },
  }),
};

const slideVariants = {
  enter:  { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1,    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as any } },
  exit:   { opacity: 0, scale: 0.97, transition: { duration: 0.8, ease: 'easeIn' } },
};

export default function Hero() {
  const [index, setIndex]   = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex(i => (i + 1) % carouselImages.length), []);
  const prev = useCallback(() => setIndex(i => (i - 1 + carouselImages.length) % carouselImages.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused, next]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream texture-dots">
      {/* Drifting blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-drift-a"
          style={{ background: 'radial-gradient(circle, rgba(217,79,43,0.13) 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full animate-drift-b"
          style={{ background: 'radial-gradient(circle, rgba(15,168,154,0.09) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full animate-drift-c"
          style={{ background: 'radial-gradient(circle, rgba(145,54,200,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT — text ─────────────────────────────────────
              overflow-visible so DIVERSE can bleed into the right col */}
          <div className="relative z-10 overflow-visible">

            {/* Eyebrow */}
            <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-5">
              <span className="label-accent">✦ Youth-led · Nonprofit · Rockville, MD</span>
            </motion.div>

            {/* UNITING — clipped slide-up */}
            <div className="overflow-hidden leading-none">
              <motion.span
                custom={0} initial="hidden" animate="visible" variants={wordReveal}
                className="block font-display text-display-xl text-ink"
              >
                UNITING
              </motion.span>
            </div>

            {/* DIVERSE — NO clip, bigger, bleeds right */}
            <motion.span
              custom={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
              className="block font-display text-ink leading-none whitespace-nowrap"
              style={{ fontSize: 'clamp(5.5rem, 13vw, 11rem)' }}
            >
              DIVERSE
            </motion.span>

            {/* YOUTH — clipped slide-up */}
            <div className="overflow-hidden leading-none mb-5">
              <motion.span
                custom={2} initial="hidden" animate="visible" variants={wordReveal}
                className="block font-display text-display-xl text-ink"
              >
                YOUTH
              </motion.span>
            </div>

            {/* Subtitle */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mb-10">
              {['THROUGH', 'THE', 'POWER', 'OF', 'ART'].map((word, i) => (
                <div key={word} className="overflow-hidden leading-none">
                  <motion.span
                    custom={3 + i} initial="hidden" animate="visible" variants={wordReveal}
                    className={`block font-display leading-none ${
                      word === 'ART' ? 'text-display-lg text-rust' : 'text-display-md text-ink/50'
                    }`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Body */}
            <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
              className="font-body text-base text-ink/70 max-w-md leading-relaxed mb-10"
            >
              We bridge divides across race, class, and culture — organizing creative events
              for children that spark joy, build empathy, and leave a mark on communities.
            </motion.p>

            {/* CTAs */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap gap-4 mb-5"
            >
              <Link href="/events"
                className="group inline-flex items-center justify-center gap-2 font-body font-semibold text-sm tracking-widest uppercase bg-rust text-cream px-8 py-4 rounded-sm hover:bg-ink transition-colors duration-200"
              >
                Explore Events
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/get-involved"
                className="inline-flex items-center justify-center font-body font-semibold text-sm tracking-widest uppercase border border-ink/30 text-ink px-8 py-4 rounded-sm hover:border-rust hover:text-rust transition-colors duration-200"
              >
                Volunteer With Us
              </Link>
            </motion.div>

            {/* Friday sessions quick link */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
              <Link href="/events/friday-sessions"
                className="group inline-flex items-center gap-2 font-body font-semibold text-sm tracking-widest uppercase text-teal hover:text-rust transition-colors duration-200"
              >
                <span className="text-lg leading-none">✦</span>
                Join our Weekly Friday Sessions
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-col sm:flex-row gap-0 divide-y sm:divide-y-0 sm:divide-x divide-ink/10 border border-ink/10 rounded-sm max-w-xs"
            >
              {[{ number: '1,000+', label: 'People Impacted' }, { number: '50+', label: 'Art Events' }].map(s => (
                <div key={s.label} className="flex-1 px-7 py-5">
                  <div className="font-display text-3xl text-rust mb-0.5">{s.number}</div>
                  <div className="font-body text-xs text-ink/50 tracking-wide uppercase">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — carousel ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Image frame */}
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-card-hover border border-ink/10">
              <AnimatePresence mode="sync">
                <motion.div
                  key={index}
                  variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselImages[index].src}
                    alt={carouselImages[index].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient + controls */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/60 to-transparent pointer-events-none" />
              <button onClick={prev} aria-label="Previous"
                className="absolute left-3 bottom-4 z-10 w-9 h-9 flex items-center justify-center bg-cream/20 hover:bg-cream/40 backdrop-blur-sm text-cream border border-cream/30 rounded-sm transition-colors"
              >←</button>
              <button onClick={next} aria-label="Next"
                className="absolute left-14 bottom-4 z-10 w-9 h-9 flex items-center justify-center bg-cream/20 hover:bg-cream/40 backdrop-blur-sm text-cream border border-cream/30 rounded-sm transition-colors"
              >→</button>
              <p className="absolute right-3 bottom-4 z-10 font-accent text-xs text-cream/70">
                {carouselImages[index].alt}
              </p>
            </div>

            {/* Dots + progress */}
            <div className="mt-3 flex items-center gap-3">
              {carouselImages.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} aria-label={`Photo ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === index ? 'w-6 h-2 bg-rust' : 'w-2 h-2 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
              {!paused && (
                <div className="flex-1 h-px bg-ink/10 overflow-hidden rounded-full ml-2">
                  <motion.div
                    key={`p-${index}`}
                    className="h-full bg-rust/60 rounded-full"
                    initial={{ width: '0%' }} animate={{ width: '100%' }}
                    transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
                  />
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs text-ink/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-ink/20"
        />
      </motion.div>
    </section>
  );
}
