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
        'accent-3': '#F9FAEE',
        'accent-4': '#1B3D2F',
        'light-gray': '#fafaf8',
      },
      maxWidth: {
        8: '8rem',
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
