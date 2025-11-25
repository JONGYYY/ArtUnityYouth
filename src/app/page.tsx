'use client';

import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Button from '../components/common/Button';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import PlaceholderImage from '../components/common/PlaceholderImage';
import SmartImage from '../components/common/SmartImage';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [eventsRef, eventsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [impactRef, impactInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Layout>
      <Hero />

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
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-6">
                Our Mission to Create Change
              </h2>
              <p className="font-body text-lg text-secondary-dark/80 mb-6">
                Society is divided by race, class, and culture. Through art, we aim to bridge those
                gaps, reduce hate, and empower youth to express, heal, and connect.
              </p>
              <Button variant="outline" href="/about">
                Learn More About Us
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-soft">
                <SmartImage
                  src="/images/about/mission.jpg"
                  alt="Children painting together"
                  placeholderText="Mission Image"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-teal/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Upcoming Events */}
      <motion.section
        ref={eventsRef}
        initial="hidden"
        animate={eventsInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-secondary-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-4">
              Upcoming Events
            </h2>
            <p className="font-body text-lg text-secondary-dark/80 max-w-2xl mx-auto">
              Join us for these exciting opportunities to create, connect, and make a difference
              in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((event) => (
              <motion.div
                key={event}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <SmartImage
                    src={`/images/events/event-${event}.jpg`}
                    alt={`Event ${event}`}
                    placeholderText={`Event ${event}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-secondary-dark mb-2">
                    Community Art Workshop
                  </h3>
                  <p className="font-body text-secondary-dark/70 mb-4">
                    Join us for a day of creative expression and community building.
                  </p>
                  <Button size="sm" fullWidth>
                    Register Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" href="/events">
              View All Events
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section
        ref={impactRef}
        initial="hidden"
        animate={impactInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-secondary-dark mb-4">
              Our Impact
            </h2>
            <p className="font-body text-lg text-secondary-dark/80 max-w-2xl mx-auto">
              Through art, we&apos;re creating lasting change in our community. Here&apos;s how we&apos;re making
              a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎨",
                title: "Art Programs",
                description: "Weekly workshops fostering creativity and expression",
              },
              {
                icon: "🤝",
                title: "Community Events",
                description: "Monthly gatherings bringing diverse groups together",
              },
              {
                icon: "🎓",
                title: "Education",
                description: "Art-based learning programs in local schools",
              },
              {
                icon: "💫",
                title: "Youth Leadership",
                description: "Mentorship programs developing future leaders",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -5 }}
                className="text-center p-6 bg-secondary-light rounded-2xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl text-secondary-dark mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-secondary-dark/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/get-involved">
              Get Involved
            </Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
}
