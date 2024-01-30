import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
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
        lavender:'#C98BDF',
        divider:'#1E2D3D',
      }
    }
  },
  plugins: []
};
export default config;
