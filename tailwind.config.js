/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        playfair: ['"DM Serif Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#F5ECD6',
          100: '#EADBB8',
          200: '#D9C496',
        },
        beige: {
          50: '#EADBB8',
          100: '#DEC9A0',
          200: '#CBB180',
        },
        gold: {
          300: '#D9BD86',
          400: '#BF9C53',
          500: '#9E7E36',
          600: '#7A5E20',
        },
        ink: {
          900: '#231811',
          800: '#33251A',
          700: '#4A382A',
          500: '#735F4B',
          300: '#A48E76',
        },
      },
      letterSpacing: {
        'widest-x': '0.28em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        crossA: {
          '0%, 40%': { opacity: '1' },
          '50%, 90%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        crossB: {
          '0%, 40%': { opacity: '0' },
          '50%, 90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        heroBgA: {
          '0%, 25%': { opacity: '1' },
          '50%, 75%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heroBgB: {
          '0%, 25%': { opacity: '0' },
          '50%, 75%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        heroTrip1: {
          '0%, 16.66%': { opacity: '1' },
          '33.33%, 83.33%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heroTrip2: {
          '0%, 16.66%': { opacity: '0' },
          '33.33%, 50%': { opacity: '1' },
          '66.66%, 100%': { opacity: '0' },
        },
        heroTrip3: {
          '0%, 50%': { opacity: '0' },
          '66.66%, 83.33%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.2s ease-out both',
        'cross-a': 'crossA 8s ease-in-out infinite',
        'cross-b': 'crossB 8s ease-in-out infinite',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
        'hero-bg-a': 'heroBgA 12s ease-in-out infinite',
        'hero-bg-b': 'heroBgB 12s ease-in-out infinite',
        'hero-trip-1': 'heroTrip1 18s ease-in-out infinite',
        'hero-trip-2': 'heroTrip2 18s ease-in-out infinite',
        'hero-trip-3': 'heroTrip3 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
