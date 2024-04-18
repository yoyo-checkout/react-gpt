/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      white: 'var(--white)',
      black: 'var(--black)',
      'brand-purple': 'var(--brand-purple)',
      gray: {
        50: 'var(--gray-50)',
        100: 'var(--gray-100)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        600: 'var(--gray-600)',
        700: 'var(--gray-700)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)',
        950: 'var(--gray-950)',
      },

      token: {
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          quaternary: 'var(--text-quaternary)',
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
