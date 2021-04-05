import React from 'react';

import trackUp from './assets/track-up.svg';
import trackDown from './assets/track-down.svg';
import trackMarker from './assets/track-marker.svg';
import track from './assets/track.svg';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type Props = {
  level: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoom: (level: number) => void;
};

const trackLength = 95;

const yForLevel = (level: number): number => {
  const y = (1 - level) * trackLength;
  return y;
};

const levelForY = (y: number): number => {
  const level = -(y / trackLength - 1);
  return level;
};

const MapControls: React.FC<Props> = ({
  onZoomIn,
  onZoomOut,
  onZoom,
  level,
}) => {
  const y = yForLevel(level);
  const [isDragging, setIsDragging] = React.useState(false);

  const draggy = React.useRef<HTMLElement>(null);

  const onStart = React.useCallback(() => {
    setIsDragging(true);
  }, []);

  const onStop = React.useCallback((e: DraggableEvent, data: DraggableData) => {
    // console.log(e);
    setIsDragging(false);
  }, []);

  const onDrag = React.useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const level = levelForY(data.y);
      onZoom(level);
    },
    [onZoom]
  );

  return (
    <div className="bg-page-bg p-2 rounded-md">
      <div
        className="relative"
        style={{
          width: 25,
          height: 154,
        }}
      >
        <div
          className="absolute left-1/2"
          style={{
            backgroundImage: `url(${track})`,
            top: 14,
            width: 8,
            marginLeft: -4,
            height: 125,
          }}
        />
        <Draggable
          nodeRef={draggy}
          onDrag={onDrag}
          onStart={onStart}
          onStop={onStop}
          axis="y"
          bounds={{ bottom: yForLevel(0), top: yForLevel(1) }}
          position={{ x: 0, y }}
        >
          <div
            ref={draggy as any}
            className="absolute left-1/2"
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              backgroundImage: `url(${trackMarker})`,
              top: 10,
              width: 37,
              height: 37,
              marginLeft: -37 / 2 + 0.5,
            }}
          />
        </Draggable>
        <div
          className="absolute left-1/2 cursor-pointer"
          style={{
            backgroundImage: `url(${trackUp})`,
            top: 0,
            width: 24,
            height: 17,
            marginLeft: -24 / 2,
          }}
          onClick={() => onZoomIn()}
        />
        <div
          className="absolute left-1/2 cursor-pointer"
          style={{
            backgroundImage: `url(${trackDown})`,
            bottom: 0,
            width: 24,
            height: 17,
            marginLeft: -24 / 2,
          }}
          onClick={() => onZoomOut()}
        />
      </div>
    </div>
  );
};

export default MapControls;
