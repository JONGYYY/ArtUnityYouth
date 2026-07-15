// Shared helpers for the "upcoming Friday" drawing session.
// The upcoming Friday stays "this Friday" through Friday itself, then rolls
// forward to next Friday on Saturday — which is also when RSVP stats reset.

export function getUpcomingFriday(from: Date = new Date()): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  const daysUntilFriday = (5 - d.getDay() + 7) % 7; // 5 = Friday
  d.setDate(d.getDate() + daysUntilFriday);
  return d;
}

// Local YYYY-MM-DD (used as the per-session key for RSVP counts).
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// e.g. "Friday, July 17"
export function formatFridayShort(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

// e.g. "Friday, July 17, 2026"
export function formatFridayLong(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
