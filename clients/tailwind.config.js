/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.html",
    "./**/*.js"
  ],
  theme: {
    extend: {
      // Your custom branding colors moved from the HTML script to here
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
