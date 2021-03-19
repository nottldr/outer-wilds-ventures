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
          <div className="bg-log-bg border-2 text-log-text border-lightblue box-border mx-4 bottom-4 relative">
            <ul className="font-space-mono list-outside list-disc ml-6">
              {selected.logs.map((log, idx) => (
                <li className="my-1" key={idx}>
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
