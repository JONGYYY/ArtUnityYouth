'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import EventSignupForm from '../../../components/events/EventSignupForm';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

const highlights = [
  { icon: '🎨', text: 'Create Thanksgiving cards together' },
  { icon: '💬', text: 'Chat with senior residents' },
  { icon: '💛', text: 'Spread kindness in our community' },
];

const dates = [
  { label: 'Friday, November 6, 2026', time: '4:00 – 6:00 PM' },
  { label: 'Friday, November 20, 2026', time: '4:00 – 6:00 PM' },
];

export default function SeniorCardMaking() {
  return (
    <Layout>
      <section className="pt-36 pb-24 bg-cream texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link
                href="/events"
                className="font-body text-sm font-semibold tracking-widest uppercase text-rust hover:text-ink transition-colors"
              >
                ← Back to Events
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-6">
              {/* Flyer */}
              <motion.div
                variants={fadeUp}
                className="relative w-full rounded-sm overflow-hidden shadow-card-hover border border-ink/10 lg:sticky lg:top-28"
              >
                <Image
                  src="/images/events/senior-cards/flyer.jpg"
                  alt="Volunteer Card-Making Event with Senior Residents flyer"
                  width={683}
                  height={1024}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              {/* Details */}
              <div>
                <motion.span variants={fadeUp} className="label-accent block mb-3 text-ochre">
                  Upcoming · Volunteer Event
                </motion.span>
                <motion.h1
                  variants={fadeUp}
                  className="font-display text-4xl sm:text-5xl text-ink mb-5 leading-none tracking-wide"
                >
                  CARD-MAKING EVENT
                  <br />
                  WITH SENIOR RESIDENTS
                </motion.h1>

                <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-4">
                  Join ArtUnity Youth for two special card-making sessions at{' '}
                  <strong className="text-ink">The Gardens of Traville!</strong> We&apos;ll create
                  Thanksgiving-themed greeting cards with senior residents, share stories, and bring
                  some joy to their day.
                </motion.p>

                {/* Dates */}
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {dates.map((d) => (
                    <div key={d.label} className="bg-parch/60 border border-ink/10 rounded-sm px-5 py-4">
                      <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">When</div>
                      <div className="font-accent text-lg text-rust leading-tight">{d.label}</div>
                      <div className="font-body text-sm text-ink/60">{d.time}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Location */}
                <motion.div variants={fadeUp} className="mb-8">
                  <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">Where</div>
                  <div className="font-body text-base text-ink/80">
                    The Gardens of Traville Senior Apartments
                  </div>
                  <div className="font-body text-sm text-ink/60">
                    14431 Traville Gardens Circle, Rockville, MD 20850
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {highlights.map((h) => (
                    <div
                      key={h.text}
                      className="flex items-start gap-3 bg-parch/60 border border-ink/10 rounded-sm px-4 py-3"
                    >
                      <span className="text-xl leading-none">{h.icon}</span>
                      <span className="font-body text-sm text-ink/70 leading-snug">{h.text}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <EventSignupForm event="Card-Making Event with Senior Residents — The Gardens of Traville (Nov 6 & Nov 20, 2026)" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
