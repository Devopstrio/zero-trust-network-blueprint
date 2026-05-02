/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617',
        },
        zinc: {
          500: '#71717a',
          600: '#52525b',
        }
      },
    },
  },
  plugins: [],
}
