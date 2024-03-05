/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'aclonica': ['Aclonica', 'sans-serif'],
        'agbalumo': ['Agbalumo', 'sans-serif'],
        'amarante': ['Amarante', 'sans-serif'],
        'amita': ['Amita', 'sans-serif'],
        'kalnia': ['Kalnia', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'vina-sans': ['Vina Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}