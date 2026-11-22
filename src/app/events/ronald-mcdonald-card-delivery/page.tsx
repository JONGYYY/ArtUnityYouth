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

const roles = [
  { icon: '🚗', text: 'Drive or ride along with student volunteers' },
  { icon: '💌', text: 'Help deliver handmade greeting cards' },
  { icon: '🤝', text: 'Spend time with children and families' },
  { icon: '💛', text: 'Be part of a meaningful community service effort' },
];

export default function RonaldMcDonaldCardDelivery() {
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
                  src="/images/events/rmh-cards/monthly-delivery-flyer.jpg"
                  alt="Monthly Card Delivery & Visits, Volunteers Needed: Ronald McDonald House flyer"
                  width={1189}
                  height={1323}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>

              {/* Details */}
              <div>
                <motion.span variants={fadeUp} className="label-accent block mb-3 text-ochre">
                  Upcoming · Monthly Volunteer Opportunity
                </motion.span>
                <motion.h1
                  variants={fadeUp}
                  className="font-display text-4xl sm:text-5xl text-ink mb-5 leading-none tracking-wide"
                >
                  MONTHLY CARD DELIVERY &amp; VISITS
                  <br />
                  AT RONALD MCDONALD HOUSE
                </motion.h1>

                <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-4">
                  Volunteers needed! Help deliver handmade greeting cards to{' '}
                  <strong className="text-ink">Ronald McDonald House</strong> and spend time interacting
                  with children and families.
                </motion.p>
                <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-6">
                  Share smiles, kindness, and the joy of giving. These monthly visits create moments of
                  encouragement and connection for families going through difficult times, while helping
                  students build empathy and engage directly with the community.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="bg-ochre/10 border border-ochre/30 rounded-sm px-5 py-3 mb-6"
                >
                  <p className="font-body text-sm text-ink/80">
                    Youth volunteers welcome —{' '}
                    <strong className="text-ink">adult drivers especially needed!</strong>
                  </p>
                </motion.div>

                {/* When / Where */}
                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-parch/60 border border-ink/10 rounded-sm px-5 py-4">
                    <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">When</div>
                    <div className="font-accent text-lg text-rust leading-tight">Last Tuesday of every month</div>
                    <div className="font-body text-base text-ink/80 leading-tight">6:00 – 7:00 PM</div>
                    <div className="font-body text-sm text-ink/60">Card delivery and a visit with the kids</div>
                    <div className="mt-3 text-xs tracking-widest uppercase text-ink/40 mb-1">Upcoming dates</div>
                    <ul className="font-body text-sm text-ink/80 space-y-0.5">
                      <li>Tuesday, November 24, 2026</li>
                      <li>Tuesday, December 29, 2026</li>
                    </ul>
                  </div>
                  <div className="bg-parch/60 border border-ink/10 rounded-sm px-5 py-4">
                    <div className="text-xs tracking-widest uppercase text-ink/40 mb-1">Where</div>
                    <div className="font-body text-base text-ink/80 leading-tight">
                      Ronald McDonald House Northern Virginia
                    </div>
                    <div className="font-body text-sm text-ink/60">3312 Gallows Road, Falls Church, VA 22042</div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {roles.map((r) => (
                    <div
                      key={r.text}
                      className="flex items-start gap-3 bg-parch/60 border border-ink/10 rounded-sm px-4 py-3"
                    >
                      <span className="text-xl leading-none">{r.icon}</span>
                      <span className="font-body text-sm text-ink/70 leading-snug">{r.text}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <EventSignupForm event="Monthly Card Delivery & Visits — Ronald McDonald House (last Tuesday of every month, 6:00–7:00 PM)">
                    <p>Youth volunteers welcome — adult drivers especially needed!</p>
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
