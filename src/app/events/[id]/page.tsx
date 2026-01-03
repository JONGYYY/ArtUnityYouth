import { notFound } from 'next/navigation';
import Layout from '../../../components/layout/Layout';
import LightboxImage from '../../../components/common/LightboxImage';
import Link from 'next/link';
import { getAllEvents, getEventById } from '../data';

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ id: e.id }));
}

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  if (!event) return notFound();

  // Simple render for MLK event as requested: just show the image plainly
  if (event.id === 'o1') {
    return (
      <Layout>
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary-coral text-primary-coral px-6 py-2 hover:bg-primary-coral hover:text-white transition-all"
              >
                Go Back
              </Link>
            </div>
            <img
              src="/images/events/MLK.png"
              alt={event.title}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-lavender/10 via-primary-coral/10 to-primary-teal/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/events" className="font-body text-primary-coral hover:underline">
            ← Back to Events
          </Link>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="w-full">
              <div className="relative w-full bg-white rounded-2xl shadow-soft p-4">
                <div className="relative w-full" style={{ minHeight: '360px' }}>
                  <LightboxImage
                    src={event.image}
                    alt={event.title}
                    placeholderText={event.title}
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-secondary-dark mb-4">
                {event.title}
              </h1>
              {event.location ? (
                <div className="font-body text-secondary-dark/70 mb-4">
                  {event.location}
                </div>
              ) : null}
              <p className="font-body text-secondary-dark/80 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


