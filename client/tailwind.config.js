/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'nav': 'var(--nav)',
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        // heading: ['Englebert', 'cursive'],
        // heading: ['Ubuntu Mono', 'monospace'],
        heading: 'Ubuntu',
        // body: ['Architects Daughter', 'cursive'],
        body: ['Sono', 'monospace'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
      },
      maxWidth: {
        iconSize: '75%',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

