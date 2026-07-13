/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#1A1108',
        cream:  '#FDF8F0',
        parch:  '#EDE8DC',
        rust:   '#D94F2B',
        teal:   '#0FA89A',
        ochre:  '#D4890A',
        grape:  '#9136C8',
        // keep compat aliases
        primary: {
          coral:   '#D94F2B',
          teal:    '#0FA89A',
          yellow:  '#D4890A',
          lavender:'#9136C8',
        },
        secondary: {
          light: '#EDE8DC',
          dark:  '#1A1108',
        },
      },
      fontFamily: {
        display:  ['var(--font-bebas)', 'Impact', 'sans-serif'],
        heading:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:     ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        accent:   ['var(--font-caveat)', 'cursive'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.92', letterSpacing: '0.01em' }],
        'display-lg': ['clamp(3rem, 7vw, 6rem)',  { lineHeight: '0.95', letterSpacing: '0.01em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)',{ lineHeight: '1',    letterSpacing: '0.01em' }],
      },
      animation: {
        'drift-a':   'driftA 18s ease-in-out infinite',
        'drift-b':   'driftB 22s ease-in-out infinite',
        'drift-c':   'driftC 26s ease-in-out infinite',
        'fade-up':   'fadeUp 0.6s ease-out both',
        'draw-line': 'drawLine 0.4s ease-out both',
      },
      keyframes: {
        driftA: {
          '0%,100%': { transform: 'translate(0, 0)' },
          '33%':     { transform: 'translate(40px, -30px)' },
          '66%':     { transform: 'translate(-20px, 20px)' },
        },
        driftB: {
          '0%,100%': { transform: 'translate(0, 0)' },
          '50%':     { transform: 'translate(-50px, 30px)' },
        },
        driftC: {
          '0%,100%': { transform: 'translate(0, 0)' },
          '40%':     { transform: 'translate(30px, -40px)' },
          '75%':     { transform: 'translate(-30px, 10px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      boxShadow: {
        card:    '0 2px 8px rgba(26,17,8,0.08), 0 0 0 1px rgba(26,17,8,0.04)',
        'card-hover': '0 12px 32px rgba(26,17,8,0.14), 0 0 0 1px rgba(26,17,8,0.06)',
        glow:    '0 0 20px rgba(217,79,43,0.35)',
      },
      backgroundImage: {
        'dot-grid': `radial-gradient(circle, rgba(26,17,8,0.07) 1px, transparent 1px)`,
        'diag-lines': `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 6px,
          rgba(26,17,8,0.04) 6px,
          rgba(26,17,8,0.04) 7px
        )`,
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
