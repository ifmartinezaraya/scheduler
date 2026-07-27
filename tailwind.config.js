/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-mincho)', 'serif'],
      },
      colors: {
        // Paleta café · minimalista japonés
        coffee: {
          50: '#f8f4ee',
          100: '#efe7db',
          200: '#e0d0bd',
          300: '#cbb298',
          400: '#b6957a',
          500: '#8f6f56',
          600: '#6f4e37',
          700: '#553b2a',
          800: '#3a281d',
          900: '#2a1d15',
          ink: '#1a120d',
        },
        paper: '#f6f1ea',
      },
      letterSpacing: {
        widest2: '0.2em',
      },
    },
  },
  plugins: [],
}
