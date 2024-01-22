import { FC } from 'react';
import { Universe as UniverseType } from '../data/universe/types';
import keysOf from '../util/keys-of';

import theme from '../data/assets/theme.json';

type Props = UniverseType;

const List: FC<Props> = () => {
  return (
    <div>
      {keysOf(theme).map((key) => (
        <div key={key}>
          <p>
            {key} (<code>{theme[key].hex}</code>)
          </p>
          <div
            style={{
              backgroundColor: theme[key].hex,
              width: 100,
              height: 100,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default List;
