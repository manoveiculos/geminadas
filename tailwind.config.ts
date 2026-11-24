import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: '#FAFAFA',
        ink: '#111827',
        emerald: {
          750: '#065F46',
          850: '#064E3B',
        },
      },
      boxShadow: {
        'soft': '0 10px 35px -10px rgba(17, 24, 39, 0.08)',
        'card': '0 4px 20px -2px rgba(17, 24, 39, 0.05), 0 1px 3px rgba(17, 24, 39, 0.04)',
        'cta': '0 14px 30px -8px rgba(6, 95, 70, 0.42)',
      },
      keyframes: {
        'subtle-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.45)' },
          '50%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
        },
      },
      animation: {
        'subtle-pulse': 'subtle-pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
