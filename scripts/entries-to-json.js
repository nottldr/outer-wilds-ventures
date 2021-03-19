#!/usr/bin/env node

const fs = require('fs');
const slugify = require('slugify');

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('error, requires 1 arg to entries.txt');
  process.exit(1);
}

const filename = args[0];

const raw = fs.readFileSync(filename, 'utf-8');

const scrubbers = [
  (input) => input.replace(/^\d: ALPHABETICAL LIST OF ENTRIES.*$/gm, ''),
  (input) => input.replace(/^[A-Z]$/gm, ''),
  (input) => input.replace(/^\(\d+\) /gm, ''),
  (input) => input.replace(/^["“”](.*)$/gm, '$1'),
  (input) => input.replace(/^(.*)["“”]$/gm, '$1'),
  (input) => input.replace(/\n\n\n+/gm, '\n\n'),
  (input) => input.trim(),
];

const scrub = (input) => {
  let output = input;

  for (const scrubber of scrubbers) {
    output = scrubber(output);
  }

  return output;
};

const PlanetColour = '%%PlanetColour.GREY%%';
const MapNodeSize = '%%MapNodeSize.MEDIUM%%';

const nodes = scrub(raw)
  .split('\n\n')
  .map((part) => {
    const lines = part.split('\n');
    const name = lines[0];
    const logs = lines.slice(1);
    const slug = slugify(name, { lower: true });

    return {
      id: slug,
      name,
      image: `${slug}.png`,
      logs,
      colour: PlanetColour,
      size: MapNodeSize,
      connections: [],
      location: {
        x: 0,
        y: 0,
      },
    };
  });

const out = JSON.stringify(nodes, null, 2).replace(/"%%(.*)%%"/gm, '$1');

console.log(out);
