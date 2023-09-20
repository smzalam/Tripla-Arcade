/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'smoky': '#E6E6FA',
        'lavender': '#D8BFD8',
        'headings': '#6B0EAD',
        'text': '#8A2BE2',
      },
      fontFamily: {
        title: 'Ubuntu',
      },
      maxWidth: {
        iconSize: '50%',
      }
    },
  },
  plugins: [],
}

