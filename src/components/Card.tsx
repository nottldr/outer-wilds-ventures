import React from 'react';
import { MapNode } from '../data/universe/types';
import dimensionsFrom from '../util/dimensions-from';
import themeFrom from '../util/theme-from';

export type Props = {
  onSelect?: (node: MapNode) => void;
  node: MapNode;
  isSelected?: boolean;
};

const Card: React.FC<Props> = ({ onSelect, node, isSelected = false }) => {
  const { name, colour, size, logs } = node;

  const dimensions = dimensionsFrom(size);
  const theme = themeFrom(colour, isSelected);

  return (
    <div
      className={`${theme.bg} ${theme.bghover} ${theme.text} cursor-pointer font-space-mono`}
      style={{
        width: dimensions.width,
        maxWidth: dimensions.width,
        minWidth: dimensions.width,
        padding: 2,
      }}
      onClick={() => onSelect?.(node)}
    >
      <h1
        className={`${dimensions.titleFontSize} font-bold text-center leading-tight p-1`}
      >
        {name}
      </h1>
      <div className="relative w-full aspect-w-1 aspect-h-1">
        <div
          className="h-full w-full absolute bg-white bg-cover"
          style={{ backgroundImage: `url(/img/cards/${node.image})` }}
        ></div>
        <div
          className="h-full w-full absolute flex items-center justify-center content-center text-white text-6xl shadow-md"
          style={{
            textShadow:
              '0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black',
          }}
        >
          {logs.length}
        </div>
      </div>
    </div>
  );
};

export default Card;
