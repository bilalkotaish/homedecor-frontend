/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBEFE6", // light background
        peach: "#FEE6C8", // hover / subtle highlight
        beige: "#EDD3BD", // card or secondary section background
        sand: "#E2D2A9", // border / neutral accent
        tan: "#D6AC8C", // main highlight color (replaces #FF5252)
        primary: "#D6AC8C", // map primary to tan for convenience
      },
      backgroundColor: {
        primary: "#D6AC8C", // update this as well to match
      },
    },
  },
  plugins: [],
};
