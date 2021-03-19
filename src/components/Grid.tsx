import React from 'react';
import { MapNode, Universe as UniverseType } from '../data/universe/types';
import Card from './Card';

type Props = UniverseType;

const Grid: React.FC<Props> = ({ nodes }) => {
  const [selected, setSelected] = React.useState<MapNode | undefined>();

  const onSelect = React.useCallback(
    (node: MapNode) => {
      if (selected?.id === node.id) {
        setSelected(undefined);
      } else {
        setSelected(node);
      }
    },
    [selected?.id]
  );

  return (
    <div>
      {nodes.map((node) => (
        <div
          className={`inline-block m-2 align-top ${
            node.id === selected?.id ? 'shadow-sm' : ''
          }`}
        >
          <Card key={node.id} node={node} onSelect={onSelect} />
        </div>
      ))}
      {selected && (
        <ul className="list-disc list-inside mx-4 font-space-mono">
          {selected.logs.map((log, idx) => (
            <li key={idx}>{log}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Grid;
