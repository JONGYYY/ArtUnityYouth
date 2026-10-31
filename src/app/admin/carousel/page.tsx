import CarouselManager from '../../../components/admin/CarouselManager';
import { getServiceClient } from '../../../lib/supabase/admin';
import { toCarouselSlide, type CarouselSlide } from '../../../lib/carousel-slides';

export const dynamic = 'force-dynamic';

async function fetchSlides(): Promise<CarouselSlide[]> {
  const supabase = getServiceClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('carousel_slides')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error || !data) return [];
  return data.map(toCarouselSlide);
}

export default async function AdminCarouselPage() {
  const slides = await fetchSlides();
  return <CarouselManager slides={slides} />;
}
