/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          100: '#8dd6ff',
          200: '#7de9d1',
          300: '#c184ff',
          400: '#ff6ad5',
          500: '#ffd166'
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        spinSlow: 'spin 18s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(4%)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(130, 255, 214, 0.2)' },
          '50%': { boxShadow: '0 0 60px rgba(255, 106, 213, 0.35)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        }
      }
    },
  },
  plugins: [],
};
