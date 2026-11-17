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

export default function RaphaelHouseCardMaking() {
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
                  src="/images/events/raphael-house/flyer.jpg"
                  alt="Volunteer Card-Making Event at Raphael House flyer"
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
                  VOLUNTEER CARD-MAKING
                  <br />
                  AT RAPHAEL HOUSE
                </motion.h1>

                <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-6">
                  Experienced ArtUnity Volunteers, join us at{' '}
                  <strong className="text-ink">Raphael House Assisted Living</strong> to create
                  greeting cards together with the residents!
                </motion.p>

                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-parch/60 border border-ink/10 rounded-sm px-5 py-4">
                    <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">When</div>
                    <div className="font-accent text-lg text-rust leading-tight">December 4, 2026</div>
                    <div className="font-body text-sm text-ink/60">4:00 – 5:30 PM</div>
                  </div>
                  <div className="bg-parch/60 border border-ink/10 rounded-sm px-5 py-4">
                    <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">Spots</div>
                    <div className="font-accent text-lg text-rust leading-tight">Up to 10 volunteers</div>
                    <div className="font-body text-sm text-ink/60">For experienced ArtUnity volunteers only</div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="mb-10">
                  <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">Where</div>
                  <div className="font-body text-base text-ink/80">Raphael House Assisted Living</div>
                  <div className="font-body text-sm text-ink/60">1515 Dunster Road, Rockville, MD 20854</div>
                  <a href="tel:+13012179116" className="font-body text-sm text-ink/60 hover:text-rust transition-colors">
                    301-217-9116
                  </a>
                </motion.div>

                {/* Sign-up */}
                <motion.div variants={fadeUp}>
                  <EventSignupForm event="Volunteer Card-Making Event at Raphael House (December 4, 2026)">
                    <p>This event is for experienced ArtUnity volunteers only (up to 10 spots).</p>
                    <p>
                      First time with ArtUnity? Please sign up for our{' '}
                      <Link href="/events/friday-sessions" className="underline hover:text-rust transition-colors">
                        weekly card-making sessions at the Rockville Library
                      </Link>{' '}
                      to get started.
                    </p>
                  </EventSignupForm>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
