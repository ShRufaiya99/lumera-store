/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clay: "#c9987a",
        sand: "#faf4ec",
        ink: "#1c1917",
        leaf: "#0f6b3a",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
