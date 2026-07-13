export type FridaySession = {
  id: string;
  date: string;
  note?: string;
  cardPhotos: string[];
  candidPhotos: string[];
  groupPhotos: string[];
};

export const SESSION_INFO = {
  day: 'Every Friday',
  time: '4:00 - 6:00 PM',
  location: 'Rockville Memorial Library',
  address: '21 Maryland Ave, Rockville, MD 20850',
  mapUrl: 'https://maps.google.com/?q=Rockville+Memorial+Library,+21+Maryland+Ave,+Rockville,+MD+20850',
};

// Seeded from the existing friday-cards images. Recategorize / add new
// sessions here and the showcase galleries below update automatically.
export const fridaySessions: FridaySession[] = [
  {
    id: 'session-2026-07-10',
    date: 'July 10, 2026',
    note: 'A packed table of volunteers of all ages hand-illustrating get-well cards for children in local hospitals — capped off with our weekly group photo.',
    cardPhotos: [],
    candidPhotos: [
      '/images/events/friday-cards/jul-10-2026/candid-1.png',
      '/images/events/friday-cards/jul-10-2026/candid-2.png',
      '/images/events/friday-cards/jul-10-2026/candid-3.png',
      '/images/events/friday-cards/jul-10-2026/candid-4.png',
      '/images/events/friday-cards/jul-10-2026/candid-5.png',
      '/images/events/friday-cards/jul-10-2026/candid-6.png',
      '/images/events/friday-cards/jul-10-2026/candid-7.png',
    ],
    groupPhotos: [
      '/images/events/friday-cards/jul-10-2026/group-1.png',
      '/images/events/friday-cards/jul-10-2026/group-2.png',
    ],
  },
  {
    id: 'session-latest',
    date: 'A Recent Friday',
    note: 'A full table of volunteers illustrating get-well cards for young hospital patients.',
    cardPhotos: [
      '/images/events/friday-cards/friday-2.png',
      '/images/events/friday-cards/friday-5.png',
    ],
    candidPhotos: [
      '/images/events/friday-cards/friday-1.png',
      '/images/events/friday-cards/friday-4.png',
      '/images/events/friday-cards/friday-7.png',
    ],
    groupPhotos: [
      '/images/events/friday-cards/friday-3.png',
    ],
  },
  {
    id: 'session-earlier',
    date: 'Earlier Session',
    note: 'More heartfelt cards and smiling faces from an earlier Friday gathering.',
    cardPhotos: [
      '/images/events/friday-cards/friday-6.png',
    ],
    candidPhotos: [
      '/images/events/friday-cards/friday-8.png',
    ],
    groupPhotos: [],
  },
];

function flatten(key: keyof Pick<FridaySession, 'cardPhotos' | 'candidPhotos' | 'groupPhotos'>): string[] {
  return fridaySessions.flatMap((s) => s[key]);
}

export function getCardPhotos(): string[] {
  return flatten('cardPhotos');
}

export function getCandidPhotos(): string[] {
  return flatten('candidPhotos');
}

export function getGroupPhotos(): string[] {
  return flatten('groupPhotos');
}
