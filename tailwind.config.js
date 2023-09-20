/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center: true
      },
      colors:{
        'background': '#223551',
        'primary': '#8ca4c7',
        'accent-main': '#5c94cb',
        'accent-alter': '#0b1c23',
      }
    },
  },
  plugins: [],
}

