// XXX: this feels like a weird smell, and we should use:
// https://tailwindcss.com/docs/configuration#referencing-in-java-script
// but the TS/JS interplay is kinda weird, and the `preval` vs CRA is more trouble than it's worth

const gameTheme = require('../data/assets/theme.json');

const theme = {
  colors: {
    'page-bg': '#02101B',
    darkblue: '#292C54',
    paper: '#F4EADB',
    orange: '#FF7D24',
    lightblue: '#5878B6',
    'log-bg': '#06101A',
    'log-text': '#CFCFD1',
    white: '#FFFFFF',

    'card-green': gameTheme.sunkenModuleColor.hex,
    'card-green-hover': gameTheme.sunkenModuleHighlight.hex,
    'card-green-text': '#0D2527',

    'card-purple': gameTheme.quantumMoonColor.hex,
    'card-purple-hover': gameTheme.quantumMoonHighlight.hex,
    'card-purple-text': '#161C31',

    'card-red': '#B85053',
    'card-red-hover': '#FE8F86',
    'card-red-text': '#3B1E23',

    'card-orange': '#BD7E53',
    'card-orange-hover': '#FFC480',
    'card-orange-text': '#3E2F31',

    'card-grey': gameTheme.neutralColor.hex,
    'card-grey-hover': gameTheme.neutralHighlight.hex,
    'card-grey-text': '#1B242B',
  },
};

module.exports = theme;
