import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ArtUnity Youth - Empowering Youth Through Art',
  description: 'ArtUnity Youth empowers youth through art to build community, fight discrimination, and promote diversity.',
  keywords: 'art, youth, community, diversity, inclusion, nonprofit, education',
  openGraph: {
    title: 'ArtUnity Youth - Empowering Youth Through Art',
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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen font-body text-secondary-dark bg-secondary-light">
        {children}
      </body>
    </html>
  );
}
