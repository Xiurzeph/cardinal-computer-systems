/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: This tells Tailwind to look at your HTML file for classes
  content: ["./*.{html,js}"], 
  theme: {
    extend: {
      colors: {
        cardinal: {
          red: '#D92323',
          black: '#1A1A1A',
          gray: '#555555'
        }
      }
    },
  },
  plugins: [],
}