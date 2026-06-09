/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#6366f1',
        'brand-dark': '#4f46e5',
        'brand-light': '#e0e7ff',
        surface: '#f8fafc',
        card: '#ffffff',
      },
    },
  },
  plugins: [],
};
