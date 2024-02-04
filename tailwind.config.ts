import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      transitionTimingFunction: {
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'in-out-quard': 'cubic-bezier(0.45, 0, 0.55, 1)',
        'in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary: {
          dark: '#01080E',
          light: '#011627',
          DEFAULT: '#011221'
        },
        secondary: {
          dark: '#607B96',
          light: '#3C9D93',
          DEFAULT: '#4D5BCE'
        },
        'pale-orange': '#FEA55F',
        aquamarine: '#43D9AD',
        salmon: '#E99287',
        lavender: '#C98BDF',
        divider: '#1E2D3D'
      }
    },
    keyframes: {
      fadeInUp: {
        '0%': {
          opacity: '0',
          transform: 'translateY(1rem)'
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)'
        }
      },
      fadeOut: {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        }
      }
    },
    animation: {
      fadeInUp: 'fadeInUp 0.5s cubic-bezier(0.61, 1, 0.88, 1)',
      fadeOut: 'fadeOut 0.5s ease-out'
    }
  },
  plugins: []
};
export default config;
