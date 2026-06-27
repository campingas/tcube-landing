import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,html}'],
  theme: {
    extend: {
      colors: {
        wada: {
          paper: '#ffffff', // proto #F7F4EF
          paperSoft: '#f5ecc2', // proto #EFEBE4
          ink: '#111314', // proto #1C1A17
          inkMid: '#34454c', // proto #4A4540
          inkSoft: '#a1a39a', // proto #8C867D
          coral: '#c55347', // proto #D4614A
          teal: '#00908a', // proto #3D8A85
          amber: '#bc892b', // proto #C8922A
          violet: '#66629c', // proto #6B5B8C
          sage: '#648f7b', // proto #5A7A5E
        },
      },
      fontFamily: {
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
        mono: ['SF Mono', 'Fira Mono', 'monospace'],
      },
      fontSize: {
        xs: '0.694rem',
        sm: '0.833rem',
        base: '1rem',
        md: '1.2rem',
        lg: '1.44rem',
        xl: '1.728rem',
        '2xl': '2.074rem',
        '3xl': '2.488rem',
        '4xl': '3.157rem',
        '5xl': '4.209rem',
      },
      borderRadius: {
        touch: '12px',
        panel: '24px',
        cube: '28px',
      },
      spacing: {
        'rhythm-1': '8px',
        'rhythm-2': '13px',
        'rhythm-3': '21px',
        'rhythm-5': '34px',
        'rhythm-8': '55px',
        'rhythm-13': '89px',
        'rhythm-21': '144px',
      },
      zIndex: {
        100: '100',
        200: '200',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config
