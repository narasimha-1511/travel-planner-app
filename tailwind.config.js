/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],

      },
      borderRadius: {
        'custom-div': '30px',
        'custom-button': '20px',
      },
      screens: {
        'lg2': '1200px',
        'custom-xl': '1600px',
      },
    },
  },
  plugins: [],
}