'use client';

import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Button from '../components/common/Button';
import { useInView } from 'react-intersection-observer';
import SmartImage from '../components/common/SmartImage';
import MissionGallery from '../components/home/MissionGallery';
import ScrollVibe from '../components/home/ScrollVibe';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const impactItems = [
  {
    icon: '🎨',
    label: 'Art Programs',
    desc: 'Weekly workshops fostering creativity and personal expression in youth.',
    image: '/images/events/screen-printing/workshop/workshop-12.png',
  },
  {
    icon: '🤝',
    label: 'Community Events',
    desc: 'Monthly gatherings that bring diverse groups together through shared making.',
    image: '/images/events/pride-2026/pride-4.png',
  },
  {
    icon: '🎓',
    label: 'Education',
    desc: 'Art-based learning programs partnered with local schools and libraries.',
    image: '/images/events/friday-cards/jul-10-2026/candid-2.png',
  },
  {
    icon: '💫',
    label: 'Youth Leadership',
    desc: 'Mentorship programs developing the next generation of creative leaders.',
    image: '/images/events/friday-cards/group-photo.png',
  },
];

export default function Home() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [impactRef,  impactInView]  = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <Layout>
      <ScrollVibe />
      <Hero />

      {/* ── Mission ──────────────────────────────────────────── */}
      <motion.section
        ref={missionRef}
        variants={stagger}
        initial="hidden"
        animate={missionInView ? 'visible' : 'hidden'}
        className="py-28"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Gallery */}
            <motion.div
              variants={{
                hidden:  { opacity: 0, x: -32, rotate: -3 },
                visible: { opacity: 1, x: 0,   rotate: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <MissionGallery />
            </motion.div>

            {/* Text */}
            <div>
              <motion.div variants={fadeUp} className="mb-2">
                <span className="label-accent text-2xl md:text-3xl">Our Mission</span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-4xl sm:text-5xl text-ink mb-6 leading-tight"
              >
                Art as a Bridge,<br />
                <em>Not a Wall</em>
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-4 max-w-prose">
                Society is divided by race, class, and culture. ArtUnity Youth exists at that fault line —
                organizing hands-on creative experiences that help young people express, heal, and find common ground.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-base text-ink/70 leading-relaxed mb-8 max-w-prose">
                As a nonprofit 501(c)(3) charity, every program we run depends on community support.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button variant="outline" href="/about">
                  Learn About Us →
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Impact ───────────────────────────────────────────── */}
      <section
        ref={impactRef}
        className="py-28 bg-parch/70 texture-dots"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={impactInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="label-accent block mb-2 text-2xl md:text-3xl">What We Do</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl text-ink">
              Our Impact
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={impactInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {impactItems.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  rotate: i % 2 === 0 ? 1.2 : -1.2,
                  transition: { duration: 0.25 },
                }}
                className="bg-cream border border-ink/8 rounded-sm shadow-card hover:shadow-card-hover transition-shadow cursor-default overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-parch overflow-hidden">
                  <SmartImage
                    src={item.image}
                    alt={item.label}
                    placeholderText={item.label}
                    className="object-cover"
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 text-3xl drop-shadow-md">{item.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-ink mb-2">{item.label}</h3>
                  <p className="font-body text-sm text-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={impactInView ? 'visible' : 'hidden'}
            className="text-center mt-14"
          >
            <Button href="/get-involved" size="lg">
              Get Involved →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="bg-ink py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="label-accent text-rust block mb-4">Join the Movement</span>
          <h2 className="font-heading text-4xl sm:text-5xl text-cream mb-6 leading-tight">
            Art connects.<br />
            <em className="text-rust">Will you help?</em>
          </h2>
          <p className="font-body text-base text-cream/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Volunteer, donate, or simply spread the word.
            Every contribution helps us bring more young people together through creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/get-involved" size="lg">
              Get Involved →
            </Button>
            <Button href="/contact" size="lg" variant="outline" className="border-cream/30 text-cream hover:border-rust hover:text-rust">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
