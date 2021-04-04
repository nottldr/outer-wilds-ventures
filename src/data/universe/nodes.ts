import notEmpty from '../../util/not-empty';
import library from './library';
import shipLogs, { ShipLog } from './ship-logs';
import sprites from './sprites';
import { Curiousity, MapNode, MapNodeSize } from './types';

const entries: ShipLog['entries'] = shipLogs.flatMap((shipLog) => {
  return shipLog.entries;
});

const curiousityForString = (s: string): Curiousity => {
  switch (s) {
    case 'QUANTUM_MOON':
      return Curiousity.QUANTUM_MOON;
    case 'SUNKEN_MODULE':
      return Curiousity.SUNKEN_MODULE;
    case 'VESSEL':
      return Curiousity.VESSEL;
    case 'TIME_LOOP':
      return Curiousity.TIME_LOOP;
    case 'COMET_CORE':
      return Curiousity.COMET_CORE;
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

    const curiousity: Curiousity | undefined = (() => {
      if (entry.curiousity) {
        return curiousityForString(entry.curiousity);
      }
    })();

    return {
      id: entry.id,
      name: entry.name,
      image: sprites[libraryEntry.spritePath.replace(/\.png/, '.jpg')],
      curiousity: curiousity,
      sizeClass,
      logs: entry.facts.explore.map((f) => f.text),
      connections: entry.facts.rumor.filter((c) => c.sourceId != null) as any,
      location: libraryEntry.cardPosition,
    };
  })
  .filter(notEmpty);

export default nodes;
