import React from 'react';
import { MapNode as MapNodeType } from '../data/universe/types';

type Props = MapNodeType;

const MapNode: React.FC<Props> = ({ name, logs }) => {
  return (
    <div>
      <h1 className="text-lg font-bold">{name}</h1>
      <ul className="list-disc list-inside">
        {logs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapNode;
