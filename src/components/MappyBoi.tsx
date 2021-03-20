import React from 'react';
import { MapNode } from '../data/universe/types';
import dimensionsFrom from '../util/dimensions-from';
import notEmpty from '../util/not-empty';
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

  const sorted = React.useMemo(
    () =>
      nodes.sort((a, b) => {
        const da = dimensionsFrom(a.size);
        const db = dimensionsFrom(b.size);

        if (da.width < db.width) {
          return 1;
        } else if (da.width > db.width) {
          return -1;
        }

        const ya = a.location.y;
        const yb = b.location.y;

        if (ya < yb) {
          return -1;
        } else if (ya > yb) {
          return 1;
        }

        return 0;
      }),
    [nodes]
  );

  const connections = React.useMemo(() => {
    const findById = (id: string) => nodes.find((node) => node.id === id);

    return nodes.reduce((prev, node) => {
      const destinations = node.connections
        .map((connection) => findById(connection))
        .filter(notEmpty);

      for (const destination of destinations) {
        prev.push({
          source: node,
          destination,
        });
      }

      return prev;
    }, [] as { source: MapNode; destination: MapNode }[]);
  }, [nodes]);

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
      {sorted.map((node) => (
        <div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-2/4 ${
            node.id === selected?.id ? 'shadow-md' : ''
          }`}
          style={{
            left: `${node.location.x * 100}%`,
            top: `${node.location.y * 100}%`,
          }}
        >
          <Card
            node={node}
            onSelect={onSelect}
            isSelected={node.id === selected?.id}
          />
        </div>
      ))}
      {connections.length > 0 && (
        <svg width={size.width} height={size.height}>
          {connections.map((connection) => (
            <line
              key={`${connection.source.id}-to-${connection.destination.id}`}
              x1={`${connection.source.location.x * 100}%`}
              y1={`${connection.source.location.y * 100}%`}
              x2={`${connection.destination.location.x * 100}%`}
              y2={`${connection.destination.location.y * 100}%`}
              className="stroke-current text-card-grey"
              strokeWidth={6}
            />
          ))}
        </svg>
      )}
      {selected && (
        <div className="sticky bottom-0 w-full">
          <Log logs={selected.logs} />
        </div>
      )}
    </div>
  );
};

export default MappyBoi;
