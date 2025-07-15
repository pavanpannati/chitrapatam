/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik80s: ['"Rubik 80s Fade"', 'cursive'],
        // Add more custom fonts here
      },
      colors: {
        silver: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#a8a8a8',  // light silver
          500: '#999999',  // classic silver
          600: '#808080',
          700: '#666666',
          800: '#4d4d4d',
          900: '#333333',  // dark metallic
        },
        gold: {
          50:  '#fffdf2',
          100: '#fdf6d8',
          200: '#fae8a4',
          300: '#f5d672',
          400: '#efc84a',
          500: '#d4af37', // 🌟 main gold
          600: '#b78f27',
          700: '#946e1d',
          800: '#705316',
          900: '#4e3a0f',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
      },
      
    },
  },
  plugins: [],
}