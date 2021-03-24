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
  const { name, colour, sizeClass, logs } = node;

  const dimensions = dimensionsFrom(sizeClass);
  const theme = themeFrom(colour, isSelected);

  return (
    <div
      className={`${theme.bg} ${theme.bghover} ${theme.text} cursor-pointer font-space-mono flex flex-col`}
      style={{
        width: dimensions.width,
        maxWidth: dimensions.width,
        minWidth: dimensions.width,
        minHeight: dimensions.height,
        padding: 2,
      }}
      onClick={() => onSelect?.(node)}
    >
      <h1
        className={`${dimensions.titleFontSize} font-bold text-center leading-tight pb-1 flex-1 flex justify-center items-center`}
        style={{
          textRendering: 'optimizeSpeed',
          fontSize: dimensions.titleFontSizeA,
        }}
      >
        {name}
      </h1>
      <div
        className="w-full h-full bg-darkblue"
        style={{
          width: dimensions.width - 4,
          height: dimensions.width - 4,
        }}
      >
        <div
          className="h-full w-full flex items-center justify-center content-center text-white text-6xl shadow-md bg-cover"
          style={{
            imageRendering: 'pixelated',
            backgroundImage: `url(${node.image})`,
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
