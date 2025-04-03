 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blue: "#366f9a",
        grey: "#d4d6cb",
        dark: "#2a5778",
        light: "#e1e8f0",
      }
    },
    fontFamily: {
      sans: "DM Sans, sans-serif",
    }
  },
  plugins: [],
}