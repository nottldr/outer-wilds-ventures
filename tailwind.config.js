const theme = require('./src/util/theme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: theme.colors,
    fontFamily: {
      'flow-block': ['Flow Block'],
      serif: ['ITC Serif Gothic Std', 'serif'],
      'space-mono': ['Space Mono', 'monospace'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
