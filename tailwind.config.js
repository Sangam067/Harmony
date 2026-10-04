/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7a1924',
          50: '#fcf2f4',
          100: '#fae4e6',
          200: '#f4cbd0',
          300: '#e9a3ab',
          400: '#d7707c',
          500: '#c14755',
          600: '#a3303e',
          700: '#8c202d',
          800: '#7a1924',
          900: '#5c131c',
          950: '#2b060a',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f7e7a9',
          dark: '#9e7f1e',
          glow: 'rgba(212, 175, 55, 0.4)'
        },
        obsidian: '#0a0607',
        crystal: {
          cyan: '#38ef7d',
          magenta: '#ff007f',
          red: '#ff2a55',
          blue: '#00d2ff'
        }
      },
      fontFamily: {
        display: ['"Cinzel"', '"Italiana"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'mega-wide': '0.5em',
      },
      backgroundImage: {
        'crystal-glow': 'radial-gradient(circle at 50% 50%, rgba(122, 25, 36, 0.35) 0%, rgba(10, 6, 7, 0.95) 75%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f7e7a9 50%, #9e7f1e 100%)',
      },
      animation: {
        'shimmer': 'shimmer 4s infinite linear',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
