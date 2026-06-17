/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        copper: {
          50:  '#fdf4ec',
          100: '#fbe4cc',
          200: '#f5c499',
          300: '#ec9d5f',
          400: '#d4834a',
          500: '#c07038',
          600: '#a85e2e',
          700: '#8a4d26',
          800: '#6e3d1e',
          900: '#5a3219',
        },
        slate: {
          900: '#0B0E14',
          800: '#111620',
          700: '#17202E',
          600: '#1E2A3A',
          500: '#26364A',
          400: '#4A5A6E',
          300: '#7A8699',
          200: '#A8B4C2',
          100: '#D4DCE5',
          50:  '#EDF0F5',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        'card-lg': '0 2px 8px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        'glow':    '0 0 24px rgba(212,131,74,0.2), 0 0 48px rgba(212,131,74,0.08)',
        'glow-sm': '0 0 12px rgba(212,131,74,0.15)',
      },
      backgroundImage: {
        'radial-copper': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,131,74,0.12) 0%, transparent 70%)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
    },
  },
  plugins: [],
};
