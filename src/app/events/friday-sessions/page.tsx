import FridaySessionsClient from './FridaySessionsClient';
import { getFridaySessions, getSessionInfo } from '../../../lib/content';

export const dynamic = 'force-dynamic';

export default async function FridaySessionsPage() {
  const [sessions, info] = await Promise.all([getFridaySessions(), getSessionInfo()]);
  return <FridaySessionsClient sessions={sessions} info={info} />;
}
