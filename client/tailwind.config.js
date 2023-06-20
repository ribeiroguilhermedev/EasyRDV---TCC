/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#a5d5fb',
        'blue-post': '#1D4E6C',
        'error': '#d32f2f',
        'primary-color': '#041a28'
      },
      gridTemplateColumns: {
        'login': '9fr 3fr 7fr',
      }
    },
  },
  plugins: [],
}

