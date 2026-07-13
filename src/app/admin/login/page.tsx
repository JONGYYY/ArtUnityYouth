'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '../../../lib/supabase/browser';

function AdminLoginInner() {
  const params = useSearchParams();
  const denied = params.get('denied') === '1';
  const errored = params.get('error') === '1';
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (error) setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream texture-dots px-6">
      <div className="w-full max-w-md bg-white shadow-card-hover rounded-sm p-10 text-center">
        <span className="label-accent block mb-2">ArtUnity Youth</span>
        <h1 className="font-display text-4xl tracking-wide text-ink mb-2">ADMIN</h1>
        <p className="font-body text-sm text-ink/60 mb-8">
          Sign in to manage events, Friday sessions, and RSVPs.
        </p>

        {denied && (
          <p className="mb-5 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 font-body text-sm text-rust">
            That Google account isn&apos;t authorized for admin access.
          </p>
        )}
        {errored && (
          <p className="mb-5 rounded-sm border border-rust/30 bg-rust/5 px-4 py-3 font-body text-sm text-rust">
            Sign-in failed. Please try again.
          </p>
        )}

        <button
          onClick={signIn}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 rounded-sm border border-ink/20 bg-white px-6 py-3 font-body font-semibold text-ink hover:border-rust hover:text-rust transition-colors disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          {loading ? 'Redirecting…' : 'Continue with Google'}
        </button>

        <a href="/" className="mt-6 inline-block font-body text-xs text-ink/40 hover:text-rust transition-colors">
          ← Back to site
        </a>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <AdminLoginInner />
    </Suspense>
  );
}
