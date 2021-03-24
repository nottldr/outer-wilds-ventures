import React from 'react';
import { Universe as UniverseType } from '../data/universe/types';
import Location from './Location';

import theme from '../data/assets/theme.json';

type Props = UniverseType;

const List: React.FC<Props> = ({ nodes }) => {
  return (
    <div>
      {Object.keys(theme).map((key) => (
        <div>
          <p>
            {key} (<code>{(theme as any)[key].hex}</code>)
          </p>
          <div
            style={{
              backgroundColor: (theme as any)[key].hex,
              width: 100,
              height: 100,
            }}
          ></div>
        </div>
      ))}
      {/* {nodes.map((node, idx) => (
        <Location key={idx} {...node} />
      ))} */}
    </div>
  );
};

export default List;
