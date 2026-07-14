'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '../../lib/supabase/browser';

/**
 * Auth control for the navbar.
 *
 * Only the authorized admin can ever hold a session: any non-admin Google
 * account is signed out at /auth/callback. So a present session == admin,
 * and we can safely show the dashboard link when signed in.
 */
export default function NavAuth({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setSignedIn(Boolean(data.user));
        setReady(true);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
      setReady(true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    onNavigate?.();
    router.push('/');
    router.refresh();
  };

  // Avoid a flash of the wrong state before the session check resolves.
  if (!ready) {
    return mobile ? null : <span className="w-16" aria-hidden />;
  }

  if (mobile) {
    return signedIn ? (
      <>
        <Link
          href="/admin"
          onClick={onNavigate}
          className="block py-2.5 font-body text-base text-ink/80 hover:text-rust border-b border-ink/5 transition-colors"
        >
          Dashboard
        </Link>
        <button
          onClick={signOut}
          disabled={busy}
          className="block w-full text-left py-2.5 font-body text-base text-ink/60 hover:text-rust transition-colors disabled:opacity-60"
        >
          {busy ? 'Signing out…' : 'Sign Out'}
        </button>
      </>
    ) : (
      <Link
        href="/admin/login"
        onClick={onNavigate}
        className="block py-2.5 font-body text-base text-ink/80 hover:text-rust border-b border-ink/5 transition-colors"
      >
        Sign In
      </Link>
    );
  }

  return signedIn ? (
    <div className="flex items-center gap-4">
      <Link
        href="/admin"
        className="nav-link font-body text-sm font-medium text-ink/80 hover:text-ink transition-colors"
      >
        Dashboard
      </Link>
      <button
        onClick={signOut}
        disabled={busy}
        className="font-body text-sm text-ink/60 hover:text-rust transition-colors disabled:opacity-60"
      >
        {busy ? '…' : 'Sign Out'}
      </button>
    </div>
  ) : (
    <Link
      href="/admin/login"
      className="font-body text-sm font-medium text-ink/80 border border-ink/20 rounded-sm px-4 py-2 hover:border-rust hover:text-rust transition-colors"
    >
      Sign In
    </Link>
  );
}
