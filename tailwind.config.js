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
        black: '#000000',
        void: '#050505',
        surface: '#080808',
        'surface-raised': '#0f0f0f',
        border: 'rgba(255, 255, 255, 0.1)',
        'border-subtle': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', '-apple-system', 'sans-serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'tight': '-0.03em',
        'widest': '0.25em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
