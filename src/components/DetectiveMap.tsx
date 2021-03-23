import React from 'react';
import { MapNode } from '../data/universe/types';
import BoundingBox from '../util/bounding-box';
import dimensionsFrom from '../util/dimensions-from';
import notEmpty from '../util/not-empty';
import themeFrom from '../util/theme-from';
import Card from './Card';

type Props = {
  boundingBox: BoundingBox;
  nodes: MapNode[];
  onSelect: (node: MapNode) => void;
  selected?: MapNode;
};

const DetectiveMap: React.FC<Props> = ({
  boundingBox,
  nodes: unsortedNodes,
  selected,
  onSelect,
}) => {
  const sortedNodes = React.useMemo(() => {
    return unsortedNodes.sort((a, b) => {
      const da = dimensionsFrom(a.sizeClass);
      const db = dimensionsFrom(b.sizeClass);

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
    });
  }, [unsortedNodes]);

  const connections = React.useMemo(() => {
    const findById = (id: string) =>
      unsortedNodes.find((node) => node.id === id);

    return unsortedNodes.reduce((prev, node) => {
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
  }, [unsortedNodes]);

  return (
    <g>
      {connections.length > 0 &&
        connections.map((connection, idx) => (
          <g key={idx}>
            <line
              key={`${connection.source.id}-to-${connection.destination.id}-${idx}`}
              x1={`${boundingBox.pointFor(connection.source.location).x}`}
              y1={`${boundingBox.pointFor(connection.source.location).y}`}
              x2={`${boundingBox.pointFor(connection.destination.location).x}`}
              y2={`${boundingBox.pointFor(connection.destination.location).y}`}
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
          </g>
        ))}
      {sortedNodes.map((node) => {
        const dimensions = dimensionsFrom(node.sizeClass);
        const point = boundingBox.pointFor(node.location);

        return (
          <foreignObject
            key={node.id}
            x={point.x - dimensions.width / 2}
            y={point.y - dimensions.height / 2}
            width={dimensions.width}
            height={dimensions.height}
          >
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <div
                key={node.id}
                // className={`absolute transform -translate-x-1/2 -translate-y-2/4 ${
                //   node.id === selected?.id ? 'shadow-md' : ''
                // }`}
                style={
                  {
                    // left: `${boundingBox.pointFor(node.location).x}px`,
                    // top: `${boundingBox.pointFor(node.location).y}px`,
                  }
                }
              >
                <Card
                  node={node}
                  onSelect={onSelect}
                  isSelected={node.id === selected?.id}
                />
              </div>
            </div>
          </foreignObject>
        );
      })}
      {false &&
        sortedNodes.map((node) => {
          const theme = themeFrom(node.colour, node.id === selected?.id);
          const dimensions = dimensionsFrom(node.sizeClass);

          return (
            <circle
              key={node.id}
              className={`fill-current ${theme.bgtext}`}
              cx={boundingBox.pointFor(node.location).x}
              cy={boundingBox.pointFor(node.location).y}
              r={dimensions.width / 4}
            />
          );
        })}
    </g>
  );
};

export default React.memo(DetectiveMap);
