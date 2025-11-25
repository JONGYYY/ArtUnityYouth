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

const teamMembers = [
  {
    name: 'Jonathan Shan',
    role: 'Team Member',
    image: '/images/team/Jonathan.jpg',
    bio: 'Passionate about empowering youth through art and community building.',
  },
  {
    name: 'Saranzul Boskov',
    role: 'Team Member',
    image: '/images/team/sara.jpg',
    bio: 'Advocates for inclusive, creative spaces that celebrate diversity.',
  },
  {
    name: 'Jierui Fang',
    role: 'Team Member',
    image: '/images/team/Jierui.png',
    bio: 'Committed to connecting communities and nurturing creative voices.',
  },
];

export default function About() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
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
                  Through our programs, we aim to bridge gaps between different racial, cultural,
                  and socioeconomic backgrounds, creating a more connected and empathetic
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-secondary-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-6">
              How We Started
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: '2018',
                title: 'The Beginning',
                description: 'Started as a small after-school art program in local community centers.',
              },
              {
                year: '2020',
                title: 'Growing Impact',
                description: 'Expanded to multiple locations and launched virtual art workshops.',
              },
              {
                year: '2023',
                title: 'Community Hub',
                description: 'Established our main center and partnered with local schools.',
              },
            ].map((milestone) => (
              <motion.div
                key={milestone.year}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-soft"
              >
                <div className="font-display text-3xl text-primary-coral mb-4">
                  {milestone.year}
                </div>
                <h3 className="font-heading text-xl text-secondary-dark mb-2">
                  {milestone.title}
                </h3>
                <p className="font-body text-secondary-dark/70">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
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