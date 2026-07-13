export type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  image: string;
  images?: string[];
  description: string;
  category: 'ongoing' | 'key';
};

const events: EventItem[] = [
  {
    id: 'friday-cards',
    title: 'Friday Card Sessions',
    date: 'Ongoing — Every Friday',
    location: 'Rockville Memorial Library',
    image: '/images/events/friday-cards/friday-3.png',
    images: [
      '/images/events/friday-cards/friday-3.png',
      '/images/events/friday-cards/friday-6.png',
      '/images/events/friday-cards/friday-4.png',
      '/images/events/friday-cards/friday-2.png',
      '/images/events/friday-cards/friday-7.png',
      '/images/events/friday-cards/friday-1.png',
      '/images/events/friday-cards/friday-5.png',
      '/images/events/friday-cards/friday-8.png',
    ],
    description:
      'Every Friday, youth and community members gather at the Rockville Memorial Library to hand-illustrate get-well cards for hospital patients. Each session brings together volunteers of all ages to create heartfelt, one-of-a-kind cards filled with encouraging messages and colorful artwork — spreading joy to those who need it most.',
    category: 'key',
  },
  {
    id: 'pride-2026',
    title: 'PRIDE 2026',
    date: 'June 2026',
    location: 'Rockville Town Center',
    image: '/images/events/pride-2026/pride-4.png',
    images: [
      '/images/events/pride-2026/pride-4.png',
      '/images/events/pride-2026/pride-5.png',
      '/images/events/pride-2026/pride-3.png',
      '/images/events/pride-2026/pride-2.png',
      '/images/events/pride-2026/pride-1.png',
    ],
    description:
      'ArtUnityYouth celebrated PRIDE 2026 in Rockville Town Center, hosting an interactive chalk mural where community members shared messages of love, identity, and belonging. Youth volunteers staffed a table in partnership with the City of Rockville to engage families and spread the spirit of unity through art.',
    category: 'key',
  },
  {
    id: 'o1',
    title: 'MLK Day Art Drive',
    date: '',
    location: '',
    image: '/images/events/MLK.png',
    description:
      'Ongoing community art project honoring Dr. Martin Luther King Jr. Create a piece that reflects service, equity, and hope. Submit your artwork by January 31.',
    category: 'ongoing',
  },
  {
    id: 'p1',
    title: 'Community Art Workshop',
    date: '',
    location: 'Rockville Town Center',
    image: '/images/events/screen-printing/sp-1.png',
    images: [
      '/images/events/screen-printing/sp-1.png',
      '/images/events/screen-printing/sp-2.jpg',
    ],
    description:
      'Live screen printing and expressive ink drawing during Oktoberfest—inviting passersby to co-create art and take home their own prints.',
    category: 'key',
  },
  {
    id: 'p5',
    title: 'Annual Holiday Cards for Hospitals',
    date: '',
    image: '/images/events/event-5.JPG',
    description:
      'A holiday card‑making workshop where kids designed and illustrated heartfelt Christmas cards for patients at Hospitals.',
    category: 'key',
  },
  {
    id: 'p4',
    title: 'Art Studio Sale',
    date: '',
    location: '',
    image: '/images/events/event-4.jpg',
    description:
      'Selling art pieces made by our art studio to support youth programs.',
    category: 'key',
  },
  {
    id: 'p2',
    title: 'Face Painting Pop-up',
    date: '',
    location: 'Washington, DC',
    image: '/images/events/event-2.jpg',
    description:
      'A joyful face painting station bringing color and smiles to families and neighbors throughout the day.',
    category: 'key',
  },
  {
    id: 'p3',
    title: 'Mural Paintings (Year-Round)',
    date: '',
    location: 'So What Else Food Pantry',
    image: '/images/events/murals/mural-2.png',
    images: [
      '/images/events/murals/mural-2.png',
      '/images/events/murals/mural-3.png',
      '/images/events/murals/mural-1.png',
      '/images/events/murals/mural-4.png',
    ],
    description:
      'Collaborative mural sessions celebrating diversity and youth creativity—adding vibrant color to shared spaces. Youth volunteers paint large-scale murals with themes of unity, culture, and community at the So What Else Food Pantry.',
    category: 'key',
  },
];

export function getAllEvents(): EventItem[] {
  return events;
}

export function getEventById(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

export function getOngoingEvents(): EventItem[] {
  return events.filter((e) => e.category === 'ongoing');
}

export function getKeyEvents(): EventItem[] {
  return events.filter((e) => e.category === 'key');
}


