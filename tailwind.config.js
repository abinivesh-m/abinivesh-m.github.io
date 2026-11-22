/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#07111f',
        slate: '#0f172a',
        panel: 'rgba(15, 23, 42, 0.72)',
        accent: '#3b82f6',
        amber: '#f59e0b',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(59, 130, 246, 0.35)',
      },
    },
  },
  plugins: [],
}