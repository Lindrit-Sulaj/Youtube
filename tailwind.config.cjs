/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'default': ['Inter', 'sans-serif'],
        'secondary': ['Roboto', 'sans-serif']
      },
      colors: {
        neutral: {
          850: '#191919',
          1000: '#101010'
        }
      }
    },
  },
  plugins: [],
}
