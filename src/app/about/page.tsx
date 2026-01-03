'use client';

import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import Button from '../../components/common/Button';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import PlaceholderImage from '../../components/common/PlaceholderImage';
import SmartImage from '../../components/common/SmartImage';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const coreMembers = [
  {
    name: 'Jonathan Shan',
    role: 'Founder and President',
    image: '/images/team/Jonathan.jpg',
    bio:
      'Jonathan is the Founder and President of ArtUnity Youth and a student at Poolesville High School. As the organization’s Executive Lead, he sets the vision and yearly goals for ArtUnity’s impact, leads team planning and decision‑making, and ensures programs meet high standards for quality, safety, and inclusion. He also drives fundraising and partnerships with schools, sponsors, and community organizations to expand youth‑led, hands‑on, healing‑centered art experiences. Outside of ArtUnity, Jonathan is an award‑winning artist and an app designer who has competed and placed in multiple national‑level app competitions.',
  },
  {
    name: 'Saranzul (Sara) Boskov',
    role: 'Vice President',
    image: '/images/team/sara.jpg',
    bio:
      'Saranzul (Sara) Boskov is Vice President of ArtUnity Youth and a student at Richard Montgomery High School. As the Programs & Operations Lead, she designs and teaches workshops, plans materials and lesson flow, and manages event logistics from registration and staffing to day‑of coordination. She also supports volunteer onboarding and multilingual outreach to ensure every program is welcoming, accessible, and youth‑centered. Sara loves helping students build confidence through art and creativity.',
  },
  {
    name: 'Daveon Williams',
    role: 'Vice President',
    image: '/images/team/Daveon.png',
    bio:
      'Daveon Williams is Vice President of ArtUnity Youth and a student at Richard Montgomery High School. As the Community & Engagement Lead, he helps grow participation and builds a welcoming event environment through outreach, mentorship, and hands‑on creative activities. He’s passionate about creating safe spaces where youth feel supported, challenged, and inspired to lead. Daveon is also a dedicated boxer who values discipline and resilience.',
  },
  {
    name: 'Mingdi Chen',
    role: 'Junior Team Lead (Outreach & Youth Ambassador)',
    image: '/images/team/mingdi.jpg',
    bio:
      'Mingdi Chen is a Junior Team Lead at ArtUnity Youth and a student at Cabin John Middle School. As the Junior Outreach & Youth Ambassador Lead, he helps connect ArtUnity with younger students by spreading the word about workshops, supporting youth‑focused outreach, and helping create creative promotional materials. Mingdi is also an award‑winning young artist and loves inspiring other students to grow through art.',
  },
];

const advisorMembers = [
  {
    name: 'Jierui Fang',
    role: 'Advisor',
    image: '/images/team/Jierui.png',
    bio:
      'Strategic advisor focused on impact and equity. Jierui guides program design, measurement, and community partnerships so our initiatives remain meaningful, data‑informed, and sustainable.',
  },
  {
    name: 'Laura Leigh Palmer',
    role: 'Advisor',
    image: '/images/team/palmer.png',
    bio:
      'Curatorial advisor and arts educator who elevates youth storytelling. Laura helps shape our visual identity, exhibitions, and showcases that amplify young artists’ voices.',
  },
];

export default function About() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-lavender/20 via-primary-coral/10 to-primary-teal/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-secondary-dark mb-6">
              Our Story
            </h1>
            <p className="font-body text-lg sm:text-xl text-secondary-dark/80 max-w-2xl mx-auto">
              Building bridges through art, one brushstroke at a time
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <motion.section
        ref={missionRef}
        initial="hidden"
        animate={missionInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-soft">
                <SmartImage
                  src="/images/about/mission.jpg"
                  alt="Children working on an art project together"
                  placeholderText="Mission Image"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-teal/10 rounded-full blur-2xl" />
            </div>
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 font-body text-lg text-secondary-dark/80">
                <p>
                  At ArtUnity Youth, we believe in the transformative power of art to break down
                  barriers and build understanding across diverse communities.
                </p>
                <p>
                  Our mission is to nurture young minds through art, fostering creativity,
                  celebrating diversity, and promoting inclusivity while organizing enriching
                  art-based events for children.
                </p>
                <p>
                  As a nonprofit 501(c)(3) youth charity organization, we rely on community support to
                  sustain and expand our programs for the young people we serve.
                </p>
                <p>
                  Through our programs, we aim to bridge gaps between different racial, cultural,
                  and socioeconomic backgrounds, creating a more connected and empathetic
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Story Section removed per request */}

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-6">
              Meet Our Team
            </h2>
            <p className="font-body text-lg text-secondary-dark/80 max-w-2xl mx-auto">
              Dedicated professionals passionate about art, education, and community building.
            </p>
          </div>
          <h3 className="font-heading text-2xl text-secondary-dark mb-6 text-center">Leadership &amp; Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {coreMembers.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -5 }}
                className="bg-secondary-light rounded-2xl overflow-hidden"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <SmartImage
                    src={member.image}
                    alt={member.name}
                    placeholderText={member.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-secondary-dark mb-1">
                    {member.name}
                  </h3>
                  <div className="font-body text-primary-coral mb-3">
                    {member.role}
                  </div>
                  <p className="font-body text-sm text-secondary-dark/70">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <h3 className="font-heading text-2xl text-secondary-dark mb-6 text-center">Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisorMembers.map((member) => (
              <motion.div
                key={member.name}
                whileHover={{ y: -5 }}
                className="bg-secondary-light rounded-2xl overflow-hidden"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <SmartImage
                    src={member.image}
                    alt={member.name}
                    placeholderText={member.name}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-secondary-dark mb-1">
                    {member.name}
                  </h3>
                  <div className="font-body text-primary-coral mb-3">
                    {member.role}
                  </div>
                  <p className="font-body text-sm text-secondary-dark/70">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="bg-primary-coral/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-6">
            Join Our Mission
          </h2>
          <p className="font-body text-lg text-secondary-dark/80 max-w-2xl mx-auto mb-8">
            Help us create a more inclusive and creative community for our youth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="/get-involved">
              Get Involved
            </Button>
            <Button size="lg" variant="outline" href="/contact">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
} 