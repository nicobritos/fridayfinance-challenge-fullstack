/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        accent: '#efff8b',
        'accent-2': '#8F9467',
        'accent-3': '#d7e67d',
        'accent-4': '#bfcc6f',
        'light-gray': '#fbfaf8',
      },
      maxWidth: {
        8: '8rem',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderWidth: {
        12: '12px',
      },
    },
  },
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  plugins: [],
};
