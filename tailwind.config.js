/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0E1117',
          card: '#161B22',
          border: '#1E2533',
          text: {
            primary: '#F0F6FC',
            secondary: '#8B949E',
            muted: '#656D76'
          }
        },
        neon: {
          teal: '#00D9FF',
          cyan: '#00F5FF', 
          purple: '#8B5CF6',
          lime: '#84CC16'
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow': '0 4px 20px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
