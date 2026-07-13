import EventsClient from './EventsClient';
import { getEvents } from '../../lib/content';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter((e) => e.category === 'ongoing');
  const pastEvents = events.filter((e) => e.category === 'key');

  return <EventsClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />;
}
