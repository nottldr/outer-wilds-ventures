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
          key={node.id}
          className={`inline-block m-2 align-top ${
            node.id === selected?.id ? 'shadow-md' : ''
          }`}
        >
          <Card
            node={node}
            onSelect={onSelect}
            isSelected={node.id === selected?.id}
          />
        </div>
      ))}
      {selected && (
        <div className="sticky bottom-0 bg-white border-t-2 border-page-bg w-full">
          <ul className="list-disc list-inside mx-4 font-space-mono">
            {selected.logs.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Grid;
