// XXX: this feels like a weird smell, and we should use:
// https://tailwindcss.com/docs/configuration#referencing-in-java-script
// but the TS/JS interplay is kinda weird, and the `preval` vs CRA is more trouble than it's worth

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

    'card-green': '#398E64',
    'card-green-hover': '#73EFC8',
    'card-green-text': '#0D2527',

    'card-purple': '#5B4F9E',
    'card-purple-hover': '#A88CFF',
    'card-purple-text': '#161C31',

    'card-red': '#B85053',
    'card-red-hover': '#FE8F86',
    'card-red-text': '#3B1E23',

    'card-orange': '#BD7E53',
    'card-orange-hover': '#FFC480',
    'card-orange-text': '#3E2F31',

    'card-grey': '#848683',
    'card-grey-hover': '#ECEDE7',
    'card-grey-text': '#1B242B',
  },
};

module.exports = theme;
