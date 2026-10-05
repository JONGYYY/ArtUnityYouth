'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any } },
};

const partners = [
  {
    name: 'Rockville Memorial Library',
    role: 'Program Host',
    blurb:
      'Home to our weekly Friday Art & Kindness Sessions, where youth and neighbors gather to hand-illustrate encouragement cards for children, families, and seniors in the community.',
  },
  {
    name: 'So What Else',
    role: 'Community Service Partner',
    blurb:
      'Host of our year-round mural painting project. Youth volunteers paint large-scale murals celebrating unity, culture, and community at the So What Else Food Pantry.',
  },
  {
    name: 'City of Rockville',
    role: 'Civic Partner',
    blurb:
      'Collaborated with us for PRIDE 2026 in Rockville Town Center, where we hosted an interactive chalk mural and engaged families in messages of love, identity, and belonging.',
  },
];

export default function CommunityPartners() {
  return (
    <Layout>
      {/* ── Header ──────────────────────────────────────────── */}
      <section className="pt-36 pb-16 bg-cream texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.div variants={fadeUp}>
              <Link
                href="/events"
                className="font-body text-sm font-semibold tracking-widest uppercase text-rust hover:text-ink transition-colors"
              >
                ← Back to Events
              </Link>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display text-display-lg text-ink mt-5 mb-4 leading-none"
            >
              COMMUNITY PARTNERS
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base text-ink/60 leading-relaxed">
              We&apos;re grateful to the organizations that open their doors, share their spaces, and
              help us bring youth-led art to the community. Together we spark joy, build empathy, and
              leave a mark on the places we call home.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Partner grid ────────────────────────────────────── */}
      <section className="pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {partners.map((p) => (
              <motion.article
                key={p.name}
                variants={fadeUp}
                className="group bg-cream border border-ink/10 rounded-sm p-8 shadow-card
                           transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-sm bg-rust/10 border border-rust/20 mb-6">
                  <span className="font-display text-2xl text-rust leading-none">
                    {p.name.charAt(0)}
                  </span>
                </div>
                <span className="label-accent text-sm block mb-2">{p.role}</span>
                <h2 className="font-heading text-2xl text-ink mb-3 leading-tight">{p.name}</h2>
                <p className="font-body text-sm text-ink/60 leading-relaxed">{p.blurb}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="bg-ink py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="label-accent text-rust block mb-4">Partner With Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl text-cream mb-5 leading-tight">
            Want to bring art to your <em className="text-rust">community?</em>
          </h2>
          <p className="font-body text-base text-cream/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Schools, libraries, nonprofits, and local organizations — we&apos;d love to collaborate on
            youth-led, healing-centered art experiences.
          </p>
          <Link
            href="/get-involved"
            className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm tracking-widest uppercase bg-rust text-cream px-8 py-4 rounded-sm hover:bg-cream hover:text-ink transition-colors duration-200"
          >
            Become a Partner →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
