/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b4252',
        secondary: '#eceff4',
        warning: '#bf616a'
      }
    },
    fontFamily: {
      Nunito: ['Nunito, sans-serif']
    },
    boxShadow: {
      md: '1px 2px 3px rgba(50, 50, 50, 0.05)'
    }
  },
  plugins: []
}
