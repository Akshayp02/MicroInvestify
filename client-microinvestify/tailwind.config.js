import('tailwindcss').Config
import { Config } from 'tailwindcss';
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
         "50": "#ecfdf5",
        "100": "#d1fae5",
        "200": "#a7f3d0",
        "300": "#6ee7b7",
        "400": "#34d399",
        "500": "#10b981",  
        "600": "#059669",
        "700": "#047857",
        "800": "#065f46",
        "900": "#064e3b",
        "950": "#022c22"
        },
        secondary: {
          "50": "#f0fdfa",
          "100": "#ccfbf1",
          "200": "#99f6e4",
          "300": "#5eead4",
          "400": "#2dd4bf",
          "500": "#14b8a6",
          "600": "#0d9488",
          "700": "#0f766e",
          "800": "#115e59",
          "900": "#134e4a"
        },
        accent: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f"
        },
        background: {
          light: "#f3f4f6",
          dark: "#1f2937"
        },
        text: {
          primary: "#111827",
          secondary: "#6b7280"
        }
      },
      fontFamily: {
        'body': ['Inter', 'sans-serif'],
        'secondary': ['Roboto', 'sans-serif'],
      }
    },
  
  plugins: [],
}

}