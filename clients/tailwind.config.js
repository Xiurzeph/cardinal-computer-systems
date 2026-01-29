/** @type {import('tailwindcss').Config} */
module.exports = {
  // This tells Tailwind where to look for your classes
  content: [
    "./pages/clients/builds/**/*.{html,js}", 
    "./pages/**/*.{html,js}"
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
