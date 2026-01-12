import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0A2540', // Deep Ocean Blue
          secondary: '#00A9A5', // Teal
          accent: '#FF5733', // Orange/Red
        }
      }
    },
  },
  plugins: [tailwindAnimate],
}
