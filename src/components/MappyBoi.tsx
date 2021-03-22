import React from 'react';
import { MapNode } from '../data/universe/types';
import BoundingBox from '../util/bounding-box';
import dimensionsFrom from '../util/dimensions-from';
import notEmpty from '../util/not-empty';
import Card from './Card';
import Log from './Log';

type Props = {
  nodes: MapNode[];
};

const MappyBoi: React.FC<Props> = ({ nodes }) => {
  const [selected, setSelected] = React.useState<MapNode | undefined>();

  const normalised = nodes.map((node) => ({
    ...node,
    location: {
      x: node.location.x,
      y: -node.location.y,
    },
  }));

  const boundingBox = new BoundingBox(normalised.map((n) => n.location));
  boundingBox.setPadding(150);

  const sorted = React.useMemo(
    () =>
      normalised.sort((a, b) => {
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
    [normalised]
  );

  const connections = React.useMemo(() => {
    const findById = (id: string) => normalised.find((node) => node.id === id);

    return normalised.reduce((prev, node) => {
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
  }, [normalised]);

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
      style={{ width: boundingBox.size.width, height: boundingBox.size.height }}
    >
      {sorted.map((node) => (
        <div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-2/4 ${
            node.id === selected?.id ? 'shadow-md' : ''
          }`}
          style={{
            left: `${boundingBox.pointFor(node.location).x}px`,
            top: `${boundingBox.pointFor(node.location).y}px`,
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
        <>
          <svg width={boundingBox.size.width} height={boundingBox.size.height}>
            {connections.map((connection, idx) => (
              <>
                <line
                  key={`${connection.source.id}-to-${connection.destination.id}-${idx}`}
                  x1={`${boundingBox.pointFor(connection.source.location).x}`}
                  y1={`${boundingBox.pointFor(connection.source.location).y}`}
                  x2={`${
                    boundingBox.pointFor(connection.destination.location).x
                  }`}
                  y2={`${
                    boundingBox.pointFor(connection.destination.location).y
                  }`}
                  className="stroke-current text-card-grey"
                  strokeWidth={6}
                />
                <g
                  transform={`translate(-${24 * 1.7} -${24 * 1.7}) translate(${
                    boundingBox.pointBetween(
                      connection.source.location,
                      connection.destination.location
                    ).x
                  } ${
                    boundingBox.pointBetween(
                      connection.source.location,
                      connection.destination.location
                    ).y
                  }) rotate(${
                    boundingBox.angleBetween(
                      connection.source.location,
                      connection.destination.location
                    ) + 180
                  } ${24 * 1.7} ${24 * 1.7})`}
                >
                  <path
                    className="fill-current text-page-bg"
                    d="M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z"
                    transform="scale(1.7)"
                  />
                </g>
                <g
                  className="fill-current text-card-grey"
                  transform={`translate(-24 -24) translate(${
                    boundingBox.pointBetween(
                      connection.source.location,
                      connection.destination.location
                    ).x
                  } ${
                    boundingBox.pointBetween(
                      connection.source.location,
                      connection.destination.location
                    ).y
                  }) rotate(${
                    boundingBox.angleBetween(
                      connection.source.location,
                      connection.destination.location
                    ) + 180
                  } 24 24)`}
                >
                  <path
                    d="M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z"
                    transform="scale(1)"
                  />
                </g>
              </>
            ))}
          </svg>
        </>
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
