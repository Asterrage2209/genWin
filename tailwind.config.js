/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        sidebar: '#0D111B',
        card: '#141A26',
        border: '#2A2F3A',
        accent: '#FF7A00',
        'accent-hover': '#FF9A3D',
        text: '#E6E8EC',
        'muted-text': '#9CA3AF',
      }
    },
  },
  plugins: [],
}
