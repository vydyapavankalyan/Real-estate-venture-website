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
        // ── Warm Gold Accent (unchanged) ──────────────────────────────
        gold: {
          50:  '#FDFBF7',
          100: '#FAF4E8',
          200: '#F3E5AB',
          300: '#E8C97A',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A9823B',
          700: '#856427',
          800: '#644A1B',
          900: '#423010',
        },
        // ── Royal Navy Blue (replaces obsidian black) ─────────────────
        // obsidian-950 → deep navy (page backgrounds)
        // obsidian-900 → card backgrounds
        // obsidian-850 → slightly lighter card
        // obsidian-800 → borders / inputs
        // obsidian-700 → muted elements
        obsidian: {
          50:  '#F0F4FF',
          100: '#E0E9FF',
          200: '#C0D3FF',
          700: '#1E3A5F',  // nav borders, muted
          800: '#112240',  // input backgrounds, borders
          850: '#0D1E38',  // card hover
          900: '#091629',  // card backgrounds
          950: '#050E1C',  // deep page background
        },
        // ── Cream tints (unchanged) ───────────────────────────────────
        cream: {
          50:  '#FDFCFA',
          100: '#FAF8F5',
          200: '#F4EFE6',
          300: '#EAE2D2',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans:  ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury':       '0 20px 40px -15px rgba(0,0,0,0.25), 0 0 20px 1px rgba(197,160,89,0.10)',
        'luxury-hover': '0 25px 50px -12px rgba(0,0,0,0.35), 0 0 25px 2px rgba(197,160,89,0.22)',
        'glow':         '0 0 30px rgba(212,175,55,0.40)',
        'navy':         '0 8px 32px rgba(5,14,28,0.45)',
      }
    },
  },
  plugins: [],
}
