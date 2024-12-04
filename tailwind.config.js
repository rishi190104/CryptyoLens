/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        signature: [ "Fontdiner Swanky" ],
        crypto: ["Inter"],
      },
      backgroundImage: {
        'hero-pattern': "url('./images/cryptobgnew.png')",
       
      }
    },
  },
  plugins: [],
}

