'use client';

import { useState } from 'react';

export default function EventSignupForm({ event }: { event: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter your name and a valid email.');
      setState('error');
      return;
    }
    try {
      setState('loading');
      const res = await fetch('/api/event-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, note, event }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'Failed');
      setState('success');
    } catch (_err) {
      setErrorMsg('Sorry — something went wrong. Please try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="bg-cream border border-ink/10 rounded-sm p-8 text-center shadow-card">
        <div className="font-display text-5xl text-teal mb-3">✓</div>
        <h3 className="font-heading text-2xl text-ink mb-2">You&apos;re signed up!</h3>
        <p className="font-body text-sm text-ink/60">
          Thanks for volunteering — we&apos;ll be in touch at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-cream border border-ink/10 rounded-sm p-8 shadow-card space-y-4"
    >
      <div>
        <h3 className="font-heading text-2xl text-ink mb-1">Sign Up to Volunteer</h3>
        <p className="font-body text-sm text-ink/60">
          Drop your name and email and we&apos;ll reach out with the details.
        </p>
      </div>
      <div>
        <label className="font-body text-sm text-ink/70">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-sm border border-ink/20 px-3 py-2 font-body text-ink focus:border-rust focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="font-body text-sm text-ink/70">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-sm border border-ink/20 px-3 py-2 font-body text-ink focus:border-rust focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="font-body text-sm text-ink/70">Anything we should know? (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-sm border border-ink/20 px-3 py-2 font-body text-ink focus:border-rust focus:outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 font-body font-semibold text-sm tracking-widest uppercase bg-rust text-cream px-8 py-4 rounded-sm hover:bg-ink transition-colors duration-200 disabled:opacity-60"
      >
        {state === 'loading' ? 'Signing you up…' : 'Count Me In →'}
      </button>
      {state === 'error' && <p className="text-rust font-body text-sm">{errorMsg}</p>}
    </form>
  );
}
