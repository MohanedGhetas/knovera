import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0F1E36',
          50: '#E8ECF2',
          100: '#D1D9E5',
          200: '#A3B3CB',
          300: '#758DB1',
          400: '#476797',
          500: '#0F1E36',
          600: '#0C1829',
          700: '#090F1C',
          800: '#060810',
          900: '#030508',
        },
        accent: {
          DEFAULT: '#C5A880',
          50: '#F9F6F2',
          100: '#F3EDE5',
          200: '#E7DBCC',
          300: '#DBC9B2',
          400: '#CFB799',
          500: '#C5A880',
          600: '#A8906D',
          700: '#8B785A',
          800: '#6E6047',
          900: '#514834',
        },
        textPrimary: '#1E293B',
        textMuted: '#64748B',
        textLight: '#F1F5F9',
        bgAlabaster: '#FAFAFA',
        bgCream: '#FDFBF7',
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
      boxShadow: {
        elegant: '0 4px 20px -2px rgba(15, 30, 54, 0.05)',
        'elegant-lg': '0 10px 30px -5px rgba(15, 30, 54, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
