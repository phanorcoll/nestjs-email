/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Roboto'],
      },
      colors:{
        'main-bg': '#e2e2e2'
      },
    },
  },
  plugins: [],
};
