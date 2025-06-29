/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        secondary: '#1E88E5',
        accent: {
          50: '#e3f0ff',
          100: '#b3d4ff',
          200: '#80b8ff',
          300: '#4d9cff',
          400: '#1a80ff',
          500: '#007AFF', // default
          600: '#0066d6',
          700: '#0052ad',
          800: '#003e85',
          900: '#00295c',
        },
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
