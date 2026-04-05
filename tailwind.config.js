/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#d9e7ff',
          200: '#bcd3ff',
          400: '#6fa3f7',
          600: '#2563eb',
          800: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
