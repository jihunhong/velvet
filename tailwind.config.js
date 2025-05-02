/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        secondary: '#1E88E5',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        slideDown: {
          '0%': { height: '0px', opacity: '0' },
          '100%': { height: '400px', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms ease-out forwards',
        fadeIn: 'fadeIn 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
