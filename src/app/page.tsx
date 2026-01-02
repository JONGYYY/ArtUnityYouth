'use client';

import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Button from '../components/common/Button';
import { useInView } from 'react-intersection-observer';
import SmartImage from '../components/common/SmartImage';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
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

      {/* Upcoming Events section removed per request */}

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
