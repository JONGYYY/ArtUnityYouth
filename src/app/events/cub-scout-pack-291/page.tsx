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
  { icon: '🧒', text: 'Volunteer with K–5 Scouts' },
  { icon: '🎨', text: 'Guide a fun card-making activity' },
  { icon: '🎤', text: 'Leadership & presentation opportunity' },
  { icon: '💌', text: 'Help spread kindness to senior centers and hospitals' },
];

export default function CubScoutPack291() {
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
                className="relative w-full rounded-sm overflow-hidden shadow-card-hover border border-ink/10"
              >
                <Image
                  src="/images/events/cub-scouts/flyer.jpg"
                  alt="Card-Making Event with Cub Scout Pack 291 flyer"
                  width={1024}
                  height={683}
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
                  WITH CUB SCOUT PACK 291
                </motion.h1>

                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-x-8 gap-y-2 mb-6 font-body"
                >
                  <div>
                    <div className="text-xs tracking-widest uppercase text-ink/40 mb-0.5">When</div>
                    <div className="font-accent text-xl text-rust">Sunday, November 15</div>
                    <div className="text-sm text-ink/60">4:30 – 5:00 PM</div>
                  </div>
                </motion.div>

                <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-5">
                  Art Unity Youth is partnering with <strong className="text-ink">Cub Scout Pack 291</strong>{' '}
                  for a special volunteer card-making event! We&apos;ll be working with about 25 K–5 scouts
                  to create handmade cards for senior centers and hospitals.
                </motion.p>
                <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-8">
                  We&apos;re looking for volunteers to help guide the scouts, make cards together, and
                  represent Art Unity Youth. This is also a great{' '}
                  <strong className="text-ink">leadership and presentation opportunity</strong> for
                  volunteers who want to help lead the activity or briefly introduce our organization
                  and explain the impact of the cards.
                </motion.p>

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
                  <EventSignupForm event="Card-Making Event with Cub Scout Pack 291 (Sunday, Nov 15)" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
