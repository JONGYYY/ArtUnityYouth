'use client';

import { motion } from 'framer-motion';
import Layout from '../../components/layout/Layout';
import SmartImage from '../../components/common/SmartImage';
import Button from '../../components/common/Button';

type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  image: string;
  description: string;
};

const upcomingEvents: EventItem[] = [];

const pastEvents: EventItem[] = [
  {
    id: 'p1',
    title: 'Community Art Workshop',
    date: 'September 27, 2025',
    location: 'Eastside Community Center',
    image: '/images/events/event-1.jpg',
    description:
      'Live screen printing and expressive ink drawing during Oktoberfest—inviting passersby to co-create art and take home their own prints.',
  },
  {
    id: 'p5',
    title: 'Holiday Cards for Shady Grove Hospital (Since 2023)',
    date: 'December 20, 2023',
    image: '/images/events/event-5.JPG',
    description:
      'A holiday card‑making workshop where kids designed and illustrated heartfelt Christmas cards for patients at Shady Grove Hospital.',
  },
  {
    id: 'p4',
    title: 'Art Studio Sale',
    date: 'August 24, 2025',
    location: '',
    image: '/images/events/event-4.jpg',
    description:
      'Selling art pieces made by our art studio to support youth programs.',
  },
  {
    id: 'p2',
    title: 'Face Painting Pop-up',
    date: 'August 31, 2024',
    location: 'Washington, DC',
    image: '/images/events/event-2.jpg',
    description:
      'A joyful face painting station bringing color and smiles to families and neighbors throughout the day.',
  },
  {
    id: 'p3',
    title: 'Mural Paintings (Year-Round)',
    date: 'May 18, 2025',
    location: 'Downtown Arts Alley',
    image: '/images/events/event-3.jpg',
    description:
      'Collaborative mural sessions celebrating diversity and youth creativity—adding vibrant color to shared spaces.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function EventsPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-lavender/10 via-primary-coral/10 to-primary-teal/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-4xl sm:text-5xl text-secondary-dark mb-4">
              Events
            </h1>
            <p className="font-body text-lg text-secondary-dark/80">
              Create, connect, and celebrate community through art.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl text-secondary-dark">
              Upcoming Events
            </h2>
            <Button variant="outline" href="#past">
              See Past Events
            </Button>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl bg-secondary-light p-8 text-center">
              <p className="font-body text-secondary-dark/80 mb-4">
                We don&apos;t have upcoming events scheduled yet.
              </p>
              <Button href="/get-involved">Get Involved</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((ev) => (
                <motion.article
                  key={ev.id}
                  whileHover={{ y: -6 }}
                  className="bg-secondary-light rounded-2xl overflow-hidden shadow-soft"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <SmartImage
                      src={ev.image}
                      alt={ev.title}
                      placeholderText={ev.title}
                      className="object-cover"
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-secondary-dark mb-1">
                      {ev.title}
                    </h3>
                    <div className="font-body text-sm text-secondary-dark/70 mb-3">
                      {[ev.date, ev.location].filter(Boolean).join(' • ')}
                    </div>
                    <p className="font-body text-secondary-dark/80 mb-4">
                      {ev.description}
                    </p>
                    <Button size="sm" fullWidth>
                      Register
                    </Button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="past" className="py-12 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-heading text-2xl sm:text-3xl text-secondary-dark">
              Past Events
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-full pb-4">
              {pastEvents.map((ev) => (
                <motion.article
                  key={ev.id}
                  whileHover={{ y: -6 }}
                  className="min-w-[280px] max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-soft"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <SmartImage
                      src={ev.image}
                      alt={ev.title}
                      placeholderText={ev.title}
                      className="object-cover"
                      fill
                      sizes="(max-width:768px) 80vw, 320px"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg text-secondary-dark mb-1">
                      {ev.title}
                    </h3>
                    <div className="font-body text-sm text-secondary-dark/70 mb-2">
                      {ev.date} • {ev.location}
                    </div>
                    <p className="font-body text-sm text-secondary-dark/80">
                      {ev.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


