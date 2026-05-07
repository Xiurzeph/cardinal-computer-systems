/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add this line to scan your React code
  ],
  theme: {
    extend: {
      colors: {
        'cardinal-red': '#D92323',
        'cardinal-black': '#1A1A1A',
      }
    },
  },
  plugins: [],
}