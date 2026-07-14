import EventsClient from './EventsClient';
import { getEvents, getSessionInfo } from '../../lib/content';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const [events, sessionInfo] = await Promise.all([getEvents(), getSessionInfo()]);
  const upcomingEvents = events.filter((e) => e.category === 'ongoing');
  const pastEvents = events.filter((e) => e.category === 'key');

  return (
    <EventsClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
      sessionInfo={sessionInfo}
    />
  );
}
