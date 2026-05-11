/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#EBDEC2',
          100: '#DECCA8',
          200: '#CBB587',
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
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.2s ease-out both',
        'cross-a': 'crossA 8s ease-in-out infinite',
        'cross-b': 'crossB 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
