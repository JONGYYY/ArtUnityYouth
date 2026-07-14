'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '../../lib/supabase/browser';

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className="font-body text-sm text-ink/60 hover:text-rust transition-colors disabled:opacity-60"
    >
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
