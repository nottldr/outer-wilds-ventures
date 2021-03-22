import notEmpty from '../../util/not-empty';
import library from './library';
import shipLogs, { ShipLog } from './ship-logs';
import sprites from './sprites';
import { MapNode, MapNodeSize, PlanetColour } from './types';

const entries: ShipLog['entries'] = shipLogs.flatMap((shipLog) => {
  return shipLog.entries;
});

const colourForCuriosity = (c: string | undefined): PlanetColour => {
  switch (c) {
    case 'QUANTUM_MOON':
      return PlanetColour.PURPLE;
    case 'SUNKEN_MODULE':
      return PlanetColour.GREEN;
    case 'VESSEL':
      return PlanetColour.RED;
    case 'TIME_LOOP':
      return PlanetColour.ORANGE;
  }

  return PlanetColour.GREY;
};

const nodes: MapNode[] = entries
  .map((entry) => {
    const libraryEntry = library.entries.find((e) => e.id === entry.id);
    if (libraryEntry == null) {
      return undefined;
    }

    let size = MapNodeSize.MEDIUM;

    const { parentId } = entry;
    if (parentId != null) {
      const parent = entries.find((e) => e.id === parentId);
      if (parent?.isCuriousity) {
        size = MapNodeSize.XSMALL;
      } else {
        size = MapNodeSize.SMALL;
      }
    } else if (entry.isCuriousity) {
      size = MapNodeSize.LARGE;
    }

    return {
      id: entry.id,
      name: entry.name,
      image: sprites[libraryEntry.spritePath],
      colour: colourForCuriosity(entry.curiousity),
      size,
      logs: entry.facts.explore.map((f) => f.text),
      connections: entry.facts.rumor.map((f) => f.sourceId).filter(notEmpty),
      location: libraryEntry.cardPosition,
    };
  })
  .filter(notEmpty);

export default nodes;
