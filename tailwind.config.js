/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00e6cb',
        'background-dark': '#0c0c0d',
        'card-dark': '#181a1d',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
