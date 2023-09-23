/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      montserrat: ["Montserrat"],
      swashed: ["Sansita Swashed", "cursive"],
      spectral: ["Spectral", "serif"],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1366px',
      '3xl': '1440px',
      '4xl': '1536px',
      '5xl': '1600px',
      '6xl': '1920px',
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};

