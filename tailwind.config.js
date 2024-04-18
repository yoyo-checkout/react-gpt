/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      white: 'rgb(var(--white) / <alpha-value>)',
      black: 'rgb(var(--black) / <alpha-value>)',
      'brand-purple': 'rgb(var(--brand-purple) / <alpha-value>)',
      gray: {
        50: 'rgb(var(--gray-50) / <alpha-value>)',
        100: 'rgb(var(--gray-100) / <alpha-value>)',
        200: 'rgb(var(--gray-200) / <alpha-value>)',
        300: 'rgb(var(--gray-300) / <alpha-value>)',
        400: 'rgb(var(--gray-400) / <alpha-value>)',
        500: 'rgb(var(--gray-500) / <alpha-value>)',
        600: 'rgb(var(--gray-600) / <alpha-value>)',
        700: 'rgb(var(--gray-700) / <alpha-value>)',
        800: 'rgb(var(--gray-800) / <alpha-value>)',
        900: 'rgb(var(--gray-900) / <alpha-value>)',
        950: 'rgb(var(--gray-950) / <alpha-value>)',
      },

      token: {
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)',
          quaternary: 'rgb(var(--text-quaternary) / <alpha-value>)',
        },
        border: {
          light: 'var(--border-light)',
          medium: 'var(--border-medium)',
          heavy: 'var(--border-heavy)',
          xheavy: 'var(--border-xheavy)',
        },
        'main-surface': {
          primary: 'var(--main-surface-primary)',
          secondary: 'var(--main-surface-secondary)',
          tertiary: 'var(--main-surface-tertiary)',
        },
        'sidebar-surface': {
          primary: 'var(--sidebar-surface-primary)',
          secondary: 'var(--sidebar-surface-secondary)',
          tertiary: 'var(--sidebar-surface-tertiary)',
        },
        link: 'var(--link)',
        'link-hover': 'var(--link-hover)',
      },
    },
  },
  plugins: [],
}
