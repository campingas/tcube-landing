import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,html}'],
  theme: {
    extend: {
      colors: {
        wada: {
          ink: '#f5ecc2', // ligth theme 
          teal: '#f99d1b', //  ligth theme 
          salmon: '#fdd4bd', //  ligth theme 
          rufous: '#f6917e', //  ligth theme 
          paper: '#111314', //  ligth theme 
          moss: '#6b7140', //  ligth theme 
          slate: '#ebd3a2', //  ligth theme 
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-hero': [
          'clamp(2.5rem, 8vw, 6.875rem)',
          { lineHeight: '1.0', letterSpacing: '-0.04em' },
        ],
        'display-h2': [
          'clamp(1.75rem, 5vw, 4.25rem)',
          { lineHeight: '1.05', letterSpacing: '-0.025em' },
        ],
        lead: ['1.625rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.75' }],
        caption: ['0.625rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'size-stamp': '24px',
        'size-chip': '39px',
        'size-tile': '63px',
        'size-block': '102px',
        'size-hero': '164px',
        'size-god': '328px',
        'rhythm-1': '8px',
        'rhythm-2': '13px',
        'rhythm-3': '21px',
        'rhythm-5': '34px',
        'rhythm-8': '55px',
        'rhythm-13': '89px',
        'rhythm-21': '144px',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease both',
        'fade-in': 'fade-in 0.4s ease both',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(1.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
