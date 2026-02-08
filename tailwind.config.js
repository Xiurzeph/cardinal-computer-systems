/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './residential.html',
    './blogs/**/*.html', // Keep this so it scans the blog folder
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#b91c3c',    // Your "normal" red
          dark: '#9a1932',
          yellow: '#ffed4e',
          bg: '#f8f9fa',
          blue: '#e3f2fd'
        }
      },
      keyframes: {
        modalSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        modalSlideIn: 'modalSlideIn 0.3s ease-out',
      }
    },
  },
  plugins: [],
}