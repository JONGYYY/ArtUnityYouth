'use client';

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

/**
 * Scroll-driven ambience for the home page: a few large radial-gradient
 * blobs whose colors shift between the brand hues as you scroll, plus a
 * slim scroll-progress bar. Sits behind all content at -z-10.
 */
export default function ScrollVibe() {
  const { scrollYProgress } = useScroll();

  const color1 = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [
      'rgba(217,79,43,0.16)',
      'rgba(15,168,154,0.16)',
      'rgba(145,54,200,0.15)',
      'rgba(212,137,10,0.16)',
    ],
  );
  const color2 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(15,168,154,0.12)', 'rgba(212,137,10,0.12)', 'rgba(217,79,43,0.12)'],
  );
  const color3 = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(145,54,200,0.10)', 'rgba(217,79,43,0.10)', 'rgba(15,168,154,0.10)'],
  );

  const blob1 = useMotionTemplate`radial-gradient(circle, ${color1} 0%, transparent 70%)`;
  const blob2 = useMotionTemplate`radial-gradient(circle, ${color2} 0%, transparent 70%)`;
  const blob3 = useMotionTemplate`radial-gradient(circle, ${color3} 0%, transparent 70%)`;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-rust"
      />

      {/* Ambient gradient blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          style={{ background: blob1 }}
          className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full animate-drift-a"
        />
        <motion.div
          style={{ background: blob2 }}
          className="absolute top-1/3 right-1/4 w-[650px] h-[650px] rounded-full animate-drift-b"
        />
        <motion.div
          style={{ background: blob3 }}
          className="absolute bottom-0 left-1/4 w-[550px] h-[550px] rounded-full animate-drift-c"
        />
      </div>
    </>
  );
}
