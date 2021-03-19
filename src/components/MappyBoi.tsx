import React from 'react';
import { MapNode } from '../data/universe/types';
import Card from './Card';
import Log from './Log';

type Props = {
  nodes: MapNode[];
};

const size = {
  width: 3000,
  height: 3000,
};

const MappyBoi: React.FC<Props> = ({ nodes }) => {
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
    <div
      className="bg-page-bg relative"
      style={{ width: size.width, height: size.height }}
    >
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute block m-2 align-top ${
            node.id === selected?.id ? 'shadow-md' : ''
          }`}
          style={{
            left: node.location.x * size.width,
            top: node.location.y * size.height,
          }}
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

export default MappyBoi;
