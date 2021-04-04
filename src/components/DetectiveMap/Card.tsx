import { ResizeObserver } from '@juggle/resize-observer';
import React from 'react';
import useDimensions from 'react-cool-dimensions';
import { MapNode } from '../../data/universe/types';
import themeFrom from '../../util/theme-from';

export type Props = {
  onSelect?: (node: MapNode) => void;
  node: MapNode;
  isSelected?: boolean;
  onResize?: (
    id: MapNode['id'],
    size: { width: number; height: number }
  ) => void;
  showLogCount: boolean;
  spoilerFreeMode: boolean;
};

const BaseWidth = 110;
const BaseHeight = BaseWidth * 1.4;
const Padding = 4;

const Card: React.FC<Props> = ({
  onSelect,
  onResize,
  node,
  isSelected = false,
  showLogCount,
  spoilerFreeMode,
}) => {
  const { id, name, curiosity, logs } = node;

  const { observe } = useDimensions({
    useBorderBoxSize: true,
    polyfill: ResizeObserver,
    onResize: ({ width, height }) => {
      onResize?.(id, {
        width,
        height,
      });
    },
  });

  const theme = themeFrom(spoilerFreeMode ? undefined : curiosity, isSelected);

  return (
    <div
      ref={observe as any}
      className={`${theme.bg} ${theme.bghover} ${theme.text} cursor-pointer ${
        spoilerFreeMode ? 'font-flow-block' : 'font-space-mono'
      } flex flex-col`}
      style={{
        width: BaseWidth,
        maxWidth: BaseWidth,
        minWidth: BaseWidth,
        minHeight: BaseHeight,
        padding: Padding,
      }}
      onClick={() => onSelect?.(node)}
    >
      <h1
        className={`text-base font-bold text-center leading-tight pb-1 flex-1 flex justify-center items-center`}
        style={{
          textRendering: 'optimizeSpeed',
          fontSize: 14,
        }}
      >
        {name}
      </h1>
      <div
        className="w-full h-full"
        style={{
          width: BaseWidth - Padding * 2,
          height: BaseWidth - Padding * 2,
        }}
      >
        <div
          className={`h-full w-full flex items-center justify-center content-center text-6xl shadow-md bg-cover bg-page-bg font-space-mono text-white`}
          style={{
            imageRendering: 'pixelated',
            backgroundImage: spoilerFreeMode ? undefined : `url(${node.image})`,
            WebkitTextStroke: '1px black',
          }}
        >
          {showLogCount && (
            <>
              {spoilerFreeMode && '?'}
              {!spoilerFreeMode && logs.length}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
