/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#050505',
        void: '#000000',
        industrial: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#111111',
          800: '#171717',
          700: '#262626',
          600: '#404040',
        },
        cyan: {
          accent: '#06B6D4',
          glow: '#00F0FF',
        },
        emerald: {
          accent: '#10B981',
          glow: '#34D399',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        'thin-white': 'rgba(255, 255, 255, 0.08)',
        'thin-cyan': 'rgba(6, 182, 212, 0.2)',
        'thin-emerald': 'rgba(16, 185, 129, 0.2)',
      },
      boxShadow: {
        'cyan-glow': '0 0 40px -10px rgba(6, 182, 212, 0.3)',
        'emerald-glow': '0 0 40px -10px rgba(16, 185, 129, 0.3)',
        'deep-void': '0 30px 60px rgba(0, 0, 0, 0.95)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
