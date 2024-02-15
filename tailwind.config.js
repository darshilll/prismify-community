/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-500": "#1a1a1a",
        "primary-600": "#5D5FEF",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
        red: "#FF5A5A",
        "dark-1": "#191612",
        "dark-2": "#09090A",
        "dark-3": "#101012",
        "dark-4": "#e6e6e9",
        "optional-color": "#534b52",
        "light-1": "#FFFFFF",
        "light-2": "#EFEFEF",
        "light-3": "#adb5bd",
        "light-4": "#9999a1",
        "text-color": "#e6e6e9",
        "border-color": "#6f6866",
      },
      screens: {
        xs: "480px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        // inter:['sans']
        inter: ["Playfair Display", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
