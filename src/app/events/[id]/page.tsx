import { notFound } from 'next/navigation';
import Layout from '../../../components/layout/Layout';
import LightboxImage from '../../../components/common/LightboxImage';
import Link from 'next/link';
import { getEventBySlug } from '../../../lib/content';

export const dynamic = 'force-dynamic';

// Guaranteed MLK submissions so the gallery renders even if the DB row
// hasn't been seeded with the image list yet.
const MLK_SUBMISSIONS = Array.from(
  { length: 11 },
  (_, i) => `/images/events/mlk/submission-${String(i + 1).padStart(2, '0')}.png`,
);

export default async function EventDetail({ params }: { params: { id: string } }) {
  const event = await getEventBySlug(params.id);
  if (!event) return notFound();

  // MLK event: hero image + a gallery of contest submissions.
  if (event.slug === 'o1') {
    const submissions = event.images && event.images.length > 0 ? event.images : MLK_SUBMISSIONS;
    return (
      <Layout>
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="mb-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary-coral text-primary-coral px-6 py-2 hover:bg-primary-coral hover:text-white transition-all"
              >
                Go Back
              </Link>
            </div>

            <img
              src={event.coverImage || '/images/events/MLK.png'}
              alt={event.title}
              className="w-full h-auto rounded-xl"
            />

            {submissions ? (
              <div className="mt-12">
                <h2 className="font-heading text-2xl md:text-3xl text-secondary-dark mb-1">
                  Contest Submissions
                </h2>
                <p className="font-body text-secondary-dark/70 mb-6">
                  A gallery of the incredible artwork our young artists created in honor of Dr. Martin Luther King Jr.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {submissions.map((src, i) => (
                    <div
                      key={src}
                      className="relative bg-white rounded-2xl shadow-soft overflow-hidden"
                      style={{ minHeight: '320px' }}
                    >
                      <LightboxImage
                        src={src}
                        alt={`MLK contest submission ${i + 1}`}
                        placeholderText={event.title}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </Layout>
    );
  }

  const gallery = event.images && event.images.length > 1 ? event.images : null;

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-lavender/10 via-primary-coral/10 to-primary-teal/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/events" className="font-body text-primary-coral hover:underline">
            ← Back to Events
          </Link>

          {/* Title + meta */}
          <div className="mt-6 mb-8">
            <h1 className="font-heading text-3xl md:text-4xl text-secondary-dark mb-2">
              {event.title}
            </h1>
            {event.date ? (
              <div className="font-body text-sm text-secondary-dark/60 mb-1">{event.date}</div>
            ) : null}
            {event.location ? (
              <div className="font-body text-secondary-dark/70 mb-4">{event.location}</div>
            ) : null}
            <p className="font-body text-secondary-dark/80 leading-relaxed max-w-3xl">
              {event.description}
            </p>
          </div>

          {/* Photo gallery */}
          {gallery ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className={`relative bg-white rounded-2xl shadow-soft overflow-hidden ${
                    i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                  style={{ minHeight: '280px' }}
                >
                  <LightboxImage
                    src={src}
                    alt={`${event.title} photo ${i + 1}`}
                    placeholderText={event.title}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative w-full bg-white rounded-2xl shadow-soft p-4" style={{ minHeight: '360px' }}>
              <LightboxImage
                src={event.coverImage}
                alt={event.title}
                placeholderText={event.title}
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
