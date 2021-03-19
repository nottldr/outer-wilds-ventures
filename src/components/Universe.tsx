import React from 'react';
import { Universe as UniverseType } from '../data/universe/types';
import MapNode from './Card';

type Props = UniverseType;

const Universe: React.FC<Props> = ({ nodes }) => {
  return (
    <div>
      {nodes.map((node) => (
        <MapNode {...node} />
      ))}
    </div>
  );
};

export default Universe;
