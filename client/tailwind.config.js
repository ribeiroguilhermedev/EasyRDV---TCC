/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#7CA8E9',
        'blue-post': '#1D4E6C',
      },
    },
  },
  plugins: [],
}

