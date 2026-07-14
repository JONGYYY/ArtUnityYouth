'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Layout from '../../../components/layout/Layout';
import Button from '../../../components/common/Button';
import LightboxImage from '../../../components/common/LightboxImage';
import SessionShowcase from './SessionShowcase';
import type { FridaySession, SessionInfo } from '../../../lib/content';

type SignupForm = {
  name: string;
  email: string;
};

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const tilts = [1.4, -1.2, 1.6, -1.5, 1.1, -1.7, 1.3, -1.0];

const VOLUNTEER_SIGNUP_URL =
  'https://montgomerycountymd.galaxydigital.com/need/detail/?need_id=1224085';

function Gallery({
  photos,
  label,
  variant = 'grid',
}: {
  photos: string[];
  label: string;
  variant?: 'grid' | 'polaroid';
}) {
  if (photos.length === 0) return null;

  if (variant === 'polaroid') {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {photos.map((src, i) => (
          <motion.div
            key={`${src}-${i}`}
            variants={fadeIn}
            style={{ rotate: tilts[i % tilts.length] }}
            className="polaroid"
          >
            <div className="relative w-full aspect-square bg-parch overflow-hidden">
              <LightboxImage src={src} alt={`${label} ${i + 1}`} placeholderText={label} className="object-cover" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {photos.map((src, i) => (
        <motion.div
          key={`${src}-${i}`}
          variants={fadeIn}
          className={`relative bg-white rounded-sm overflow-hidden shadow-card ${
            i === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <LightboxImage src={src} alt={`${label} ${i + 1}`} placeholderText={label} className="object-cover" />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function FridaySessionsClient({
  sessions,
  info,
}: {
  sessions: FridaySession[];
  info: SessionInfo;
}) {
  const [count, setCount] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const signupRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupForm>();

  useEffect(() => {
    let cancelled = false;
    fetch('/api/friday-signup')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.count === 'number') setCount(d.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      setShowStickyBar(window.scrollY > el.offsetHeight - 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openAndScrollToForm = () => {
    setFormOpen(true);
    setTimeout(() => {
      signupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const onSubmit = async (data: SignupForm) => {
    try {
      setSubmitState('loading');
      const res = await fetch('/api/friday-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || 'Failed');
      setAlreadyJoined(Boolean(payload?.alreadySignedUp));
      if (typeof payload?.count === 'number') setCount(payload.count);
      setSubmitState('success');
      reset();
    } catch (_e) {
      setSubmitState('error');
    }
  };

  // Only surface the RSVP count once it feels social-proof-worthy (10+).
  const showGoing = typeof count === 'number' && count > 9;
  const goingLabel = `${count} people going`;

  const cardPhotos = sessions.flatMap((s) => s.cardPhotos);
  const candidPhotos = sessions.flatMap((s) => s.candidPhotos);
  const groupPhotos = sessions.flatMap((s) => s.groupPhotos);

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-20 bg-cream texture-dots overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl">
            <span className="label-accent block mb-3">Cards for kids in hospitals</span>
            <h1 className="font-display text-display-lg text-ink mb-5 leading-none">
              WEEKLY FRIDAY
              <br />
              DRAWING SESSIONS
            </h1>
            <p className="font-body text-lg text-ink/70 leading-relaxed mb-8 max-w-2xl">
              Every Friday, youth and neighbors gather to hand-illustrate get-well cards for
              children in local hospitals. No experience needed — just bring yourself and a little
              heart. Come make art that reaches someone who needs it.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={openAndScrollToForm}>
                Sign Up to Join
              </Button>
              {showGoing && <span className="font-accent text-xl text-rust">{goingLabel}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next Session block ───────────────────────────────── */}
      <section className="py-16 bg-parch texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="bg-ink text-cream rounded-sm overflow-hidden shadow-card-hover"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Details */}
              <div className="p-8 lg:p-12">
                <span className="label-accent block mb-3 text-ochre">Next Session</span>
                <h2 className="font-display text-4xl lg:text-5xl tracking-wide mb-6">JOIN US THIS FRIDAY</h2>
                <ul className="space-y-4 font-body text-cream/85 mb-8">
                  <li className="flex items-baseline gap-3">
                    <span className="font-display text-ochre text-sm tracking-widest uppercase w-20 shrink-0">When</span>
                    <span>{info.day} · {info.time}</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="font-display text-ochre text-sm tracking-widest uppercase w-20 shrink-0">Where</span>
                    <span>
                      {info.location}
                      <br />
                      <a
                        href={info.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/60 hover:text-ochre underline underline-offset-2 transition-colors"
                      >
                        {info.address}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="font-display text-ochre text-sm tracking-widest uppercase w-20 shrink-0">Cost</span>
                    <span>Free — all supplies provided</span>
                  </li>
                </ul>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" onClick={openAndScrollToForm}>
                    Save My Spot
                  </Button>
                  {showGoing && <span className="font-accent text-xl text-ochre">{goingLabel}</span>}
                </div>
              </div>

              {/* Sign-up panel */}
              <div ref={signupRef} className="bg-cream text-ink p-8 lg:p-12 flex flex-col justify-center">
                {submitState === 'success' ? (
                  <div className="text-center py-6">
                    <div className="font-display text-5xl text-teal mb-3">✓</div>
                    <h3 className="font-heading text-2xl text-ink mb-2">
                      {alreadyJoined ? "You're already on the list!" : "You're in — see you Friday!"}
                    </h3>
                    <p className="font-body text-ink/70 mb-4">
                      {alreadyJoined
                        ? 'We already had your RSVP. Thanks for coming back!'
                        : "We'll be looking for you at the library. Feel free to bring a friend."}
                    </p>
                    {showGoing && <p className="font-accent text-xl text-rust">{goingLabel}</p>}
                    <a
                      href={VOLUNTEER_SIGNUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-body text-sm font-semibold text-rust hover:text-ink underline underline-offset-4 transition-colors"
                    >
                      Log it as volunteer hours ↗
                    </a>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading text-2xl text-ink mb-2">Reserve your seat at the table</h3>
                    <p className="font-body text-sm text-ink/60 mb-6">
                      Drop your name and email so we know to expect you. That&apos;s it.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label className="font-body text-sm text-ink/70">Name</label>
                        <input
                          className="mt-1 w-full rounded-sm border-ink/20 focus-visible:focus"
                          {...register('name', { required: 'Please enter your name' })}
                        />
                        {errors.name && <p className="text-rust text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="font-body text-sm text-ink/70">Email</label>
                        <input
                          type="email"
                          className="mt-1 w-full rounded-sm border-ink/20 focus-visible:focus"
                          {...register('email', {
                            required: 'Please enter your email',
                            pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
                          })}
                        />
                        {errors.email && <p className="text-rust text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      <Button type="submit" fullWidth disabled={submitState === 'loading'}>
                        {submitState === 'loading' ? 'Signing you up…' : 'Count Me In'}
                      </Button>
                      {submitState === 'error' && (
                        <p className="text-rust font-body text-sm mt-1">
                          Sorry — something went wrong. Please try again.
                        </p>
                      )}
                    </form>

                    <div className="mt-6 pt-5 border-t border-ink/10 text-center">
                      <p className="font-body text-sm text-ink/60 mb-2">
                        Want it to count as official volunteer hours?
                      </p>
                      <a
                        href={VOLUNTEER_SIGNUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm font-semibold text-rust hover:text-ink underline underline-offset-4 transition-colors"
                      >
                        Register on our volunteer page ↗
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
            <span className="label-accent block mb-3">What we do</span>
            <h2 className="font-heading text-3xl md:text-4xl text-ink mb-5">Small cards, big comfort</h2>
            <p className="font-body text-lg text-ink/70 leading-relaxed">
              Being in the hospital is hard — especially for a kid. Each Friday we sit down together
              and hand-draw colorful, encouraging get-well cards that are delivered to young
              patients. Every card is one of a kind, filled with bright artwork and a message of hope
              from someone who cares. It&apos;s a simple act, but for a child in a hospital bed, a
              handmade card can be a bright spot in a tough day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Cards showcase ───────────────────────────────────── */}
      {cardPhotos.length > 0 && (
        <section className="py-16 bg-parch texture-dots">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="label-accent block mb-2">The artwork</span>
              <h2 className="font-heading text-3xl text-ink mb-2">Cards we&apos;ve drawn</h2>
              <p className="font-body text-ink/60">A look at the get-well cards headed to hospital rooms.</p>
            </div>
            <Gallery photos={cardPhotos} label="Get-well card" variant="polaroid" />
          </div>
        </section>
      )}

      {/* ── Kids drawing ─────────────────────────────────────── */}
      {candidPhotos.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="label-accent block mb-2">In the moment</span>
              <h2 className="font-heading text-3xl text-ink mb-2">Artists at work</h2>
              <p className="font-body text-ink/60">Young creators pouring heart into every card.</p>
            </div>
            <Gallery photos={candidPhotos} label="Session photo" variant="grid" />
          </div>
        </section>
      )}

      {/* ── Group photos ─────────────────────────────────────── */}
      {groupPhotos.length > 0 && (
        <section className="py-16 bg-parch texture-dots">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="label-accent block mb-2">Our crew</span>
              <h2 className="font-heading text-3xl text-ink mb-2">The whole gang</h2>
              <p className="font-body text-ink/60">We snap a group photo every single Friday.</p>
            </div>
            <Gallery photos={groupPhotos} label="Group photo" variant="grid" />
          </div>
        </section>
      )}

      {/* ── Past sessions log ────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="label-accent block mb-2 text-2xl md:text-3xl">Session log</span>
            <h2 className="font-heading text-4xl md:text-5xl text-ink mb-3">Past Fridays</h2>
            <p className="font-body text-lg text-ink/60">
              Pick a day to relive it — flip through the photos from each session.
            </p>
          </div>

          <SessionShowcase sessions={sessions} />
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="py-20 bg-ink text-cream texture-diag">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide mb-4">DRAW WITH US THIS FRIDAY</h2>
          <p className="font-body text-cream/70 mb-2">
            {info.day} · {info.time} · {info.location}
          </p>
          {showGoing && <p className="font-accent text-2xl text-ochre mb-8">{goingLabel}</p>}
          <Button size="lg" onClick={openAndScrollToForm}>
            Sign Up to Join
          </Button>
        </div>
      </section>

      {/* ── Sticky bar ───────────────────────────────────────── */}
      <AnimatePresence>
        {showStickyBar && submitState !== 'success' && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-rust text-cream shadow-card-hover"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-lg tracking-wide leading-none truncate">FRIDAY DRAWING SESSION</p>
                <p className="font-body text-xs text-cream/80 truncate">
                  {info.time} · {info.location}{showGoing ? ` · ${goingLabel}` : ''}
                </p>
              </div>
              <button
                onClick={openAndScrollToForm}
                className="shrink-0 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase bg-cream text-ink px-5 py-2.5 rounded-sm hover:bg-ink hover:text-cream transition-colors"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
