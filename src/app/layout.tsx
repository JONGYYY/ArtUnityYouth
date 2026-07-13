import type { Metadata } from 'next';
import { Bebas_Neue, Cormorant_Garamond, DM_Sans, Caveat } from 'next/font/google';
import '../styles/globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ArtUnity Youth — Empowering Youth Through Art',
  description: 'ArtUnity Youth empowers youth through art to build community, fight discrimination, and promote diversity.',
  keywords: 'art, youth, community, diversity, inclusion, nonprofit, education',
  openGraph: {
    title: 'ArtUnity Youth — Empowering Youth Through Art',
    description: 'Building bridges through art, one brushstroke at a time.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${bebasNeue.variable} ${cormorant.variable} ${dmSans.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen font-body text-ink bg-cream antialiased">
        {children}
      </body>
    </html>
  );
}
