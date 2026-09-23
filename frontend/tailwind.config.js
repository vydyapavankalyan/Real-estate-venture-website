/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F3E5AB',
          300: '#E5C378',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A9823B',
          700: '#856427',
          800: '#644A1B',
          900: '#423010',
        },
        obsidian: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          700: '#1E293B',
          800: '#0F172A',
          850: '#0B1120',
          900: '#070C18',
          950: '#030712',
        },
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F4EFE6',
          300: '#EAE2D2',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 20px 1px rgba(197, 160, 89, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 25px 2px rgba(197, 160, 89, 0.18)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
