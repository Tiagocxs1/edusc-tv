import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
        body: ["'Roboto'", "sans-serif"],
      },
      colors: {
        edusc: {
          dark: "#0a0a0a",
          darker: "#050505",
          medium: "#1a1a1a",
          light: "#f0f0f0",
          accent: "#e50914",
          muted: "#6b6b6b",
        },
        black: "#000000",
        white: "#ffffff",
        gray: {
          100: "#f3f3f3",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#272727",
          800: "#181818",
          900: "#0f0f0f",
        },
      },
    },
  },
  plugins: [],
};

export default config;