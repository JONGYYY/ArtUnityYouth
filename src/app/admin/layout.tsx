import Link from 'next/link';
import { getAdminUser } from '../../lib/supabase/server';
import SignOutButton from '../../components/admin/SignOutButton';

export const dynamic = 'force-dynamic';

const navItems = [
  { name: 'Overview', href: '/admin' },
  { name: 'Events', href: '/admin/events' },
  { name: 'Friday Sessions', href: '/admin/friday-sessions' },
  { name: 'RSVPs', href: '/admin/rsvps' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  // Non-admin (e.g. the login page): render bare, no admin shell.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-ink/10 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-wide text-rust">ARTUNITY</span>
              <span className="font-accent text-base text-ink/60">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link font-body text-sm text-ink/70 hover:text-ink transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="font-body text-sm text-ink/50 hover:text-rust transition-colors">
              View site ↗
            </Link>
            <span className="hidden sm:inline font-body text-xs text-ink/40">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
        <nav className="md:hidden border-t border-ink/10 px-6 py-2 flex gap-5 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-sm text-ink/70 hover:text-ink whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
