export type EventItem = {
  id: string;
  title: string;
  date: string;
  location?: string;
  image: string;
  description: string;
  category: 'ongoing' | 'key';
};

const events: EventItem[] = [
  {
    id: 'o1',
    title: 'MLK Day Art Drive',
    date: 'Deadline: Jan 31',
    location: '',
    image: '/images/events/MLK.png',
    description:
      'Ongoing community art project honoring Dr. Martin Luther King Jr. Create a piece that reflects service, equity, and hope. Submit your artwork by January 31.',
    category: 'ongoing',
  },
  {
    id: 'p1',
    title: 'Community Art Workshop',
    date: 'September 27, 2025',
    location: 'Rockville Town Center',
    image: '/images/events/event-1.jpg',
    description:
      'Live screen printing and expressive ink drawing during Oktoberfest—inviting passersby to co-create art and take home their own prints.',
    category: 'key',
  },
  {
    id: 'p5',
    title: 'Holiday Cards for Shady Grove Hospital (Since 2023)',
    date: 'December 20, 2023',
    image: '/images/events/event-5.JPG',
    description:
      'A holiday card‑making workshop where kids designed and illustrated heartfelt Christmas cards for patients at Shady Grove Hospital.',
    category: 'key',
  },
  {
    id: 'p4',
    title: 'Art Studio Sale',
    date: 'August 24, 2025',
    location: '',
    image: '/images/events/event-4.jpg',
    description:
      'Selling art pieces made by our art studio to support youth programs.',
    category: 'key',
  },
  {
    id: 'p2',
    title: 'Face Painting Pop-up',
    date: 'August 31, 2024',
    location: 'Washington, DC',
    image: '/images/events/event-2.jpg',
    description:
      'A joyful face painting station bringing color and smiles to families and neighbors throughout the day.',
    category: 'key',
  },
  {
    id: 'p3',
    title: 'Mural Paintings (Year-Round)',
    date: 'May 18, 2025',
    location: 'So What Else Food Pantry',
    image: '/images/events/event-3.jpg',
    description:
      'Collaborative mural sessions celebrating diversity and youth creativity—adding vibrant color to shared spaces.',
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


