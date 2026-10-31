import HomeClient from './HomeClient';
import { getCarouselSlides } from '../lib/content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const slides = await getCarouselSlides();
  return <HomeClient slides={slides} />;
}
