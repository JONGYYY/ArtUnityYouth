'use client';

import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Link from 'next/link';
import SmartImage from '../../components/common/SmartImage';
import Button from '../../components/common/Button';
import type { EventItem } from '../../lib/content';

const tilts = [1.5, -1.2, 1.8, -1.5, 1.1, -1.8, 1.4, -1.0];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EventsClient({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: EventItem[];
  pastEvents: EventItem[];
}) {
  return (
    <Layout>
      {/* ── Page header ─────────────────────────────────────── */}
      <section className="pt-36 pb-16 bg-cream texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
            <span className="label-accent block mb-3">What&apos;s Happening</span>
            <h1 className="font-display text-display-lg text-ink mb-4">EVENTS</h1>
            <p className="font-body text-base text-ink/60 leading-relaxed">
              Create, connect, and celebrate community through art.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured: Friday Drawing Sessions ────────────────── */}
      <section className="pb-8 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/events/friday-sessions" className="block group focus-visible:outline-none">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              className="relative overflow-hidden rounded-sm bg-ink text-cream shadow-card-hover"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative min-h-[240px] lg:min-h-full">
                  <SmartImage
                    src="/images/events/friday-cards/friday-3.png"
                    alt="Friday Drawing Sessions"
                    placeholderText="Friday Drawing Sessions"
                    className="object-cover"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="label-accent block mb-3 text-ochre">Every Friday · Join us</span>
                  <h2 className="font-display text-4xl lg:text-5xl tracking-wide mb-4 leading-none">
                    WEEKLY FRIDAY
                    <br />
                    DRAWING SESSIONS
                  </h2>
                  <p className="font-body text-cream/75 leading-relaxed mb-6 max-w-md">
                    Hand-draw get-well cards for kids in local hospitals. All ages, all skill levels,
                    supplies on us. Come make art that brightens someone&apos;s day.
                  </p>
                  <span className="inline-flex items-center gap-2 font-body text-sm font-semibold tracking-widest uppercase text-ochre group-hover:gap-3 transition-all">
                    Join a Friday Session →
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* ── Upcoming ─────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-heading text-3xl text-ink">Upcoming</h2>
            <Button variant="outline" size="sm" href="#past">
              See Past Events
            </Button>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="border border-ink/10 bg-parch rounded-sm p-10 text-center">
              <p className="font-body text-ink/60 mb-4">No upcoming events scheduled yet.</p>
              <Button href="/get-involved" size="sm">Get Involved</Button>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {upcomingEvents.map((ev, i) => (
                <motion.article
                  key={ev.id}
                  variants={cardVariant}
                  whileHover={{ y: -8, rotate: 0, transition: { duration: 0.25 } }}
                  style={{ rotate: tilts[i % tilts.length] }}
                  className="polaroid cursor-pointer"
                >
                  <Link href={ev.href ?? `/events/${ev.slug}`} className="block focus-visible:outline-none">
                    <div className="relative w-full aspect-[4/3] bg-parch overflow-hidden">
                      <SmartImage
                        src={ev.coverImage}
                        alt={ev.title}
                        placeholderText={ev.title}
                        className="object-contain bg-white"
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="pt-4 pb-1 px-1">
                      <h3 className="font-heading text-lg text-ink mb-1">{ev.title}</h3>
                      {ev.date && <p className="font-accent text-sm text-rust mb-1">{ev.date}</p>}
                      {ev.location && <p className="font-body text-xs text-ink/50 mb-2">{ev.location}</p>}
                      <p className="font-body text-xs text-ink/60 leading-relaxed line-clamp-2">
                        {ev.description}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Past / Key Events ─────────────────────────────────── */}
      <section id="past" className="py-20 bg-parch texture-dots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-heading text-3xl text-ink">Key Events</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {pastEvents.map((ev, i) => (
              <motion.article
                key={ev.id}
                variants={cardVariant}
                whileHover={{ y: -8, rotate: 0, transition: { duration: 0.25 } }}
                style={{ rotate: tilts[i % tilts.length] }}
                className="polaroid cursor-pointer"
              >
                <Link href={ev.href ?? `/events/${ev.slug}`} className="block focus-visible:outline-none">
                  <div className="relative w-full aspect-[4/3] bg-parch overflow-hidden">
                    <SmartImage
                      src={ev.coverImage}
                      alt={ev.title}
                      placeholderText={ev.title}
                      className="object-cover"
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="pt-4 pb-1 px-1">
                    <h3 className="font-heading text-base text-ink mb-0.5">{ev.title}</h3>
                    {ev.date && <p className="font-accent text-sm text-rust mb-0.5">{ev.date}</p>}
                    {ev.location && <p className="font-body text-xs text-ink/50 mb-1">{ev.location}</p>}
                    <p className="font-body text-xs text-ink/60 leading-relaxed line-clamp-2">
                      {ev.description}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
