import React from 'react';
import { Universe as UniverseType } from '../data/universe/types';
import Location from './Location';

type Props = UniverseType;

const List: React.FC<Props> = ({ nodes }) => {
  return (
    <div>
      {nodes.map((node, idx) => (
        <Location key={idx} {...node} />
      ))}
    </div>
  );
};

export default List;
