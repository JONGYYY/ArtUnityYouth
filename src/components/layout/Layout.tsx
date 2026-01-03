'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Get Involved', href: '/get-involved' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary-light">
      <nav className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="font-display text-2xl text-primary-coral">ArtUnity Youth</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-body text-secondary-dark hover:text-primary-coral transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/get-involved#donate"
                className="bg-primary-coral text-white px-4 py-2 rounded-full hover:shadow-glow transition-all"
              >
                Donate
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-secondary-dark hover:text-primary-coral"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 font-body text-secondary-dark hover:text-primary-coral"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/get-involved#donate"
                className="block px-3 py-2 text-center bg-primary-coral text-white rounded-full hover:shadow-glow"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-secondary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-2xl text-primary-coral mb-4">ArtUnity Youth</h3>
              <p className="font-body text-sm">
                Uniting Diverse Youth Through the Power of Art
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="font-body text-sm hover:text-primary-coral transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4">Connect With Us</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:artunityyouth@gmail.com"
                    className="font-body text-sm hover:text-primary-coral transition-colors"
                  >
                    artunityyouth@gmail.com
                  </a>
                </li>
                <li className="flex gap-4">
                  <a className="font-body text-sm hover:text-primary-coral transition-colors" href="#" aria-label="Instagram">Instagram</a>
                  <a className="font-body text-sm hover:text-primary-coral transition-colors" href="#" aria-label="Facebook">Facebook</a>
                  <a className="font-body text-sm hover:text-primary-coral transition-colors" href="#" aria-label="Twitter">Twitter/X</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="font-body text-sm">
              © {new Date().getFullYear()} ArtUnity Youth. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 