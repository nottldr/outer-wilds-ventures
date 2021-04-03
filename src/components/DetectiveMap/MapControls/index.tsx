import React from 'react';

import trackUp from './assets/track-up.svg';
import trackDown from './assets/track-down.svg';
import trackMarker from './assets/track-marker.svg';
import track from './assets/track.svg';

type Props = {
  level: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const MapControls: React.FC<Props> = ({ onZoomIn, onZoomOut, level }) => {
  const trackLength = 110;
  const y = (1 - level) * trackLength;
  return (
    <div
      className="relative"
      style={{
        width: 25,
        height: 154,
      }}
    >
      <img
        className="absolute left-1/2"
        style={{ marginLeft: -3.5, top: 15 }}
        src={track}
        alt=""
      />
      <img
        className="absolute left-1/2"
        style={{ marginLeft: -11.5, top: y + 20 - 11.5 }}
        src={trackMarker}
        alt=""
      />
      <img
        className="absolute left-1/2 top-0 cursor-pointer"
        style={{ marginLeft: -11.5 }}
        src={trackUp}
        alt=""
        onClick={() => onZoomIn()}
      />
      <img
        className="absolute left-1/2 bottom-0 cursor-pointer"
        style={{ marginLeft: -11.5 }}
        src={trackDown}
        alt=""
        onClick={() => onZoomOut()}
      />
    </div>
  );
};

export default MapControls;
