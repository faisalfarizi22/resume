/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class', // Untuk mendukung dark/light mode toggle
    theme: {
      extend: {
        colors: {
          teal: {
            400: '#14b8a6',
            500: '#0d9488',
          },
          blue: {
            400: '#60a5fa',
            500: '#3b82f6',
          },
          purple: {
            400: '#c084fc',
            500: '#a855f7',
          },
          amber: {
            400: '#fbbf24',
            500: '#f59e0b',
          },
          emerald: {
            400: '#34d399',
            500: '#10b981',
          },
          orange: {
            400: '#fb923c',
            500: '#f97316',
          },
          pink: {
            400: '#f472b6',
            500: '#ec4899',
          },
          neutral: {
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        animation: {
          'bounce-slow': 'bounce 3s infinite',
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'spin-slow': 'spin 8s linear infinite',
          'wiggle': 'wiggle 1s ease-in-out infinite',
          'blink': 'blink 1s step-end infinite',
          'float': 'float 4s ease-in-out infinite',
          'gradient': 'gradient 8s ease infinite',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
          'width': 'width',
          'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
          blink: {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0 },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' },
          },
          gradient: {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
          mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        },
        fontSize: {
          '2xs': '0.625rem', // 10px
        },
        boxShadow: {
          'glow': '0 0 20px rgba(20, 184, 166, 0.15)',
          'glow-lg': '0 0 30px rgba(20, 184, 166, 0.25)',
        },
        maxWidth: {
          '8xl': '90rem', // 1440px
        },
        zIndex: {
          '60': 60,
          '70': 70,
          '80': 80,
          '90': 90,
          '100': 100,
        },
      },
    },
    plugins: [
      // Custom plugin for dark/light mode utils
      function({ addVariant }: { addVariant: (name: string, definition: string) => void }) {
        addVariant('light-theme', '.light-theme &');
        addVariant('dark-theme', '.dark-theme &');
      }
    ],
  }