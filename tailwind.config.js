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
        primary: {
          coral: '#FF6B6B',
          teal: '#4ECDC4',
          yellow: '#FFE66D',
          lavender: '#A06CD5',
        },
        secondary: {
          light: '#F7F9FC',
          dark: '#2C3E50',
        },
      },
      fontFamily: {
        display: ['Pacifico', 'cursive'],
        heading: ['Gloria Hallelujah', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 15px rgba(255, 107, 107, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 