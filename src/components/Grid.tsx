import React from 'react';
import { MapNode, Universe as UniverseType } from '../data/universe/types';
import Card from './DetectiveMap/Card';
import Log from './Log';

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
    <div className="bg-page-bg">
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
        <div className="sticky bottom-0 w-full">
          <Log logs={selected.logs} />
        </div>
      )}
    </div>
  );
};

export default Grid;
