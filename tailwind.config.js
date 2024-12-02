/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom dark mode colors and extensions
      colors: {
        // Add custom dark mode color palette
        dark: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      // Add dark mode specific transitions
      transition: {
        'dark-mode': 'background-color 0.3s ease, color 0.3s ease',
      },
      // Custom keyframe animations
      keyframes: {
        animloader: {
          '0%': { 
            borderColor: 'white rgba(255, 255, 255, 0) rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)' 
          },
          '33%': { 
            borderColor: 'white white rgba(255, 255, 255, 0) rgba(255, 255, 255, 0)' 
          },
          '66%': { 
            borderColor: 'white white white rgba(255, 255, 255, 0)' 
          },
          '100%': { 
            borderColor: 'white white white white' 
          },
        }
      },
      // Custom animation classes
      animation: {
        'loader': 'animloader 1s linear infinite alternate'
      },
      fontFamily: {
        host: ['"Host Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
        karla: ['Karla', 'sans-serif'],
        libreFranklin: ['"Libre Franklin"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}