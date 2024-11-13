/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-gray": "#F1F5F1",
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px', // Custom breakpoint
      },
    },
  },
  plugins: [],
};
