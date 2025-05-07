/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          // 100: "#F1FBFB",
          300: "#E8E7F7",
          500: "#E2E3F5",
          700: "#9CA4E7",
          900: "#4651D1",
        },
        warning: {
          100: "#FFF4E4",
          500: "#94907E",
          900: "#9E8E00",
        },
        error: {
          100: "#FFEEEF",
          500: "#F55C67",
          900: "#DD224F",
        },
        gray: {
          100: "#F3F5F7",
          200: "#E8E8E8",
          300: "#D4D7DD",
          500: "#ABAFB5",
          700: "#5E5F66",
          900: "#1F2324",
        },
      },
      fontFamily: {
        nunito: ["Nunito"],
        "nunito-semibold": ["NunitoSemiBold"],
        "nunito-bold": ["NunitoBold"],
      },
    },
  },
  plugins: [],
};
