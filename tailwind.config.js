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
        newspaper: {
          50: '#fdfbf7',
          100: '#f5f1e8',
          200: '#e7e3d7', // Primary Newspaper Paper Background
          300: '#dad5c7',
          400: '#c5bfae',
          500: '#a39c89',
          900: '#1a1917',
        },
        ink: {
          800: '#262420',
          900: '#1a1917', // High contrast ink text
          950: '#11100e',
        },
        magma: {
          50: '#fff5f0',
          100: '#ffe6d9',
          200: '#ffbfab',
          300: '#ff9073',
          400: '#ff5c33',
          500: '#ff3300', // Neon Magma Core Glow
          600: '#e62e00',
          700: '#b32000',
          800: '#801400',
          900: '#4d0a00',
          950: '#260400',
        },
        brand: {
          50: '#fff5f0',
          100: '#ffe6d9',
          200: '#ffbfab',
          300: '#ff9073',
          400: '#ff5c33',
          500: '#ff3300',
          600: '#e62e00',
          700: '#b32000',
          800: '#801400',
          900: '#4d0a00',
          950: '#140805',
        },
        silver: {
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        },
        gold: {
          300: '#ffe066',
          400: '#ffd43b',
          500: '#fcc419',
          600: '#fab005',
        },
        charcoal: {
          800: '#1c1c1c',
          900: '#121212',
          950: '#080808', // Deep Charcoal Grain Canvas
        },
        ember: {
          800: '#2b1008',
          900: '#1c0a06',
          950: '#080808',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
