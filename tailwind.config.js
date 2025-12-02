/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#151516",
        primary: "#FFFFFF",
        secondary: "#86868B",
        accent: "#0071E3", // Apple Blue
        "accent-dark": "#0077ED",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 4px 24px rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 8px 32px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
