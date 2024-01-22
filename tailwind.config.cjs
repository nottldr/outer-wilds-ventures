/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const theme = require('./src/util/theme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      current: 'currentColor',
      ...theme.colors,
    },
    fontFamily: {
      'flow-block': ['Flow Block'],
      serif: ['ITC Serif Gothic Std', 'serif'],
      'space-mono': ['Space Mono', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
