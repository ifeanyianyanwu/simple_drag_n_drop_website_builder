/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        11: "repeat(11, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
