import React from 'react';
import { Universe as UniverseType } from '../data/universe/types';
import Location from './Location';

type Props = UniverseType;

const Universe: React.FC<Props> = ({ nodes }) => {
  return (
    <div>
      {nodes.map((node, idx) => (
        <Location key={idx} {...node} />
      ))}
    </div>
  );
};

export default Universe;
