import notEmpty from '../../util/not-empty';
import library from './library';
import shipLogs, { ShipLog } from './ship-logs';
import sprites from './sprites';
import { Curiosity, MapNode, MapNodeSize } from './types';

const entries: ShipLog['entries'] = shipLogs.flatMap((shipLog) => {
  return shipLog.entries;
});

const curiosityForString = (s: string): Curiosity => {
  switch (s) {
    case 'QUANTUM_MOON':
      return Curiosity.QUANTUM_MOON;
    case 'SUNKEN_MODULE':
      return Curiosity.SUNKEN_MODULE;
    case 'VESSEL':
      return Curiosity.VESSEL;
    case 'TIME_LOOP':
      return Curiosity.TIME_LOOP;
    case 'COMET_CORE':
      return Curiosity.COMET_CORE;
    case 'INVISIBLE_PLANET':
      return Curiosity.INVISIBLE_PLANET;
  }

  throw new Error(`Unknown curiosity: ${s}`);
};

const nodes: MapNode[] = entries
  .map((entry) => {
    const libraryEntry = library.entries.find((e) => e.id === entry.id);
    if (libraryEntry == null) {
      return undefined;
    }

    let sizeClass = MapNodeSize.MEDIUM;

    const { parentId } = entry;
    if (parentId != null) {
      const parent = entries.find((e) => e.id === parentId);
      if (parent?.isCuriousity) {
        sizeClass = MapNodeSize.SMALL;
      } else {
        sizeClass = MapNodeSize.XSMALL;
      }
    } else if (entry.isCuriousity) {
      sizeClass = MapNodeSize.LARGE;
    }

    const curiosity: Curiosity | undefined = (() => {
      if (entry.curiousity) {
        return curiosityForString(entry.curiousity);
      }
    })();

    return {
      id: entry.id,
      name: entry.name,
      image: sprites[libraryEntry.spritePath.replace(/\.png/, '.jpg')],
      curiosity,
      sizeClass,
      logs: entry.facts.explore.map((f) => f.text),
      connections: entry.facts.rumor.filter((c) => c.sourceId != null) as any,
      location: libraryEntry.cardPosition,
    };
  })
  .filter(notEmpty);

export default nodes;
