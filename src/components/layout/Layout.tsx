'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavAuth from './NavAuth';

const navItems = [
  { name: 'Home',        href: '/' },
  { name: 'About',       href: '/about' },
  { name: 'Events',      href: '/events' },
  { name: 'Get Involved',href: '/get-involved' },
  { name: 'Contact',     href: '/contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Navbar ──────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-ink/10 shadow-none py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-3xl sm:text-4xl tracking-wide text-rust leading-none">
              ARTUNITY
            </span>
            <span className="font-accent text-xl sm:text-2xl text-ink/70 leading-none mt-0.5">
              Youth
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link font-body text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <NavAuth />
            <Link
              href="/get-involved#donate"
              className="ml-2 font-body text-sm font-semibold tracking-wider uppercase bg-rust text-cream px-5 py-2 rounded-sm hover:bg-ink transition-colors duration-200"
            >
              Donate
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink hover:text-rust transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <XMarkIcon className="h-6 w-6" />
              : <Bars3Icon className="h-6 w-6" />
            }
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-cream border-t border-ink/10"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-2.5 font-body text-base text-ink/80 hover:text-rust border-b border-ink/5 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <NavAuth mobile onNavigate={() => setMobileOpen(false)} />
                <Link
                  href="/get-involved#donate"
                  className="block mt-3 text-center font-body text-sm font-semibold tracking-wider uppercase bg-rust text-cream px-5 py-3 rounded-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Donate
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Page content ────────────────────────────────────── */}
      <main>{children}</main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="bg-ink text-cream/80 texture-diag">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-4xl sm:text-5xl tracking-wide text-rust">ARTUNITY</span>
                <span className="font-accent text-2xl sm:text-3xl text-cream/60">Youth</span>
              </div>
              <p className="font-body text-sm text-cream/60 max-w-xs leading-relaxed">
                Uniting diverse youth through the transformative power of art.
                A nonprofit 501(c)(3) organization.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-lg tracking-widest text-cream/40 uppercase mb-5">
                Navigate
              </h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="nav-link font-body text-sm text-cream/70 hover:text-rust transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg tracking-widest text-cream/40 uppercase mb-5">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:artunityyouth@gmail.com"
                    className="font-body text-sm text-cream/70 hover:text-rust transition-colors break-all"
                  >
                    artunityyouth@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-body text-xs text-cream/40">
              © {new Date().getFullYear()} ArtUnity Youth. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="font-body text-xs text-cream/50 hover:text-rust transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="font-body text-xs text-cream/50 hover:text-rust transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
