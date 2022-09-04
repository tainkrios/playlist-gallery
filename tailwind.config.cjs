/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f515a',
        secondary: '#ebebeb',
        warning: '#da0f41'
      }
    },
    fontFamily: {
      Nunito: ['Nunito, sans-serif']
    },
    boxShadow: {
      'md': '1px 2px 3px rgba(50, 50, 50, 0.05)' 
    }
  },
  plugins: []
}
