import React from 'react';
import { MapNode, MapNodeSize } from '../data/universe/types';
import themeFrom from '../util/theme-from';

export type Props = {
  onSelect?: (node: MapNode) => void;
  node: MapNode;
};

type Dimensions = {
  width: number;
};

const dimensionsFrom = (size: MapNodeSize): Dimensions => {
  switch (size) {
    case MapNodeSize.XSMALL:
      return {
        width: 80,
      };
    case MapNodeSize.SMALL:
      return {
        width: 100,
      };
    case MapNodeSize.LARGE:
      return {
        width: 140,
      };
    default:
    case MapNodeSize.MEDIUM:
      return {
        width: 120,
      };
  }
};

const Card: React.FC<Props> = ({ onSelect, node }) => {
  const { name, colour, size, logs } = node;

  const dimensions = dimensionsFrom(size);
  const theme = themeFrom(colour);

  return (
    <div
      className={`${theme.bg} ${theme.bghover} ${theme.text} cursor-pointer font-space-mono`}
      style={{
        width: dimensions.width,
        padding: 2,
      }}
      onClick={() => onSelect?.(node)}
    >
      <h1 className={`text-lg font-bold text-center`}>{name}</h1>
      <div className="relative">
        <div
          className="h-full w-full absolute flex items-center justify-center content-center text-white text-6xl shadow-md"
          style={{
            textShadow:
              '0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black',
          }}
        >
          {logs.length}
        </div>
        <img
          src="/img/cards/BH_BLACK_HOLE_FORGE.png"
          alt={`${name}`}
          className="block"
        />
      </div>
    </div>
  );
};

export default Card;
