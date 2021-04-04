import React from 'react';
import { ReactComponent as LinkChevron } from '../../assets/images/link_chevron.svg';
import { Connection, MapNode } from '../../data/universe/types';
import BoundingBox from '../../util/bounding-box';
import dimensionsFrom from '../../util/dimensions-from';
import notEmpty from '../../util/not-empty';
import theme from '../../util/theme';
import Card from './Card';

type Size = {
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};

class Rect {
  private _centre: Point;
  private _size: Size;
  scale: number = 1;

  constructor(centre: Point, size: Size, scale = 1) {
    this._centre = centre;
    this._size = size;
    this.scale = scale;
  }

  get centre() {
    return this._centre;
  }

  get originalSize() {
    return this._size;
  }

  get size() {
    return {
      width: this._size.width * this.scale,
      height: this._size.height * this.scale,
    };
  }

  get topLeft(): Point {
    return {
      x: this.centre.x - this.size.width / 2,
      y: this.centre.y - this.size.height / 2,
    };
  }

  edgeIntersection(to: Point): Point {
    const sign = (n: number): 1 | -1 => {
      if (n >= 0) {
        return 1;
      }
      return -1;
    };

    const scaled = {
      x: to.x - this.centre.x,
      y: to.y - this.centre.y,
    };
    const magnitude = Math.sqrt(scaled.x * scaled.x + scaled.y * scaled.y);
    const normalised = {
      x: scaled.x / magnitude,
      y: scaled.y / magnitude,
    };

    const num1 = this.size.width * 0.5;
    const num2 = this.size.height * 0.5;

    if (Math.abs(normalised.y / normalised.x) < Math.abs(num2 / num1)) {
      const x = sign(normalised.x) * num1;
      const y = (normalised.y / normalised.x) * x;

      return {
        x: this.centre.x + x,
        y: this.centre.y + y,
      };
    }

    const y = sign(normalised.y) * num2;
    const x = (normalised.x / normalised.y) * y;

    return {
      x: this.centre.x + x,
      y: this.centre.y + y,
    };
  }
}

const pointBetween = (p1: Point, p2: Point, percent = 0.5): Point => ({
  x: percent * p1.x + (1 - percent) * p2.x,
  y: percent * p1.y + (1 - percent) * p2.y,
});

const lineWeight = 5;

const chevronScale = 0.6;
const chevronSelectedScale = 1.25;
const chevronShadowScale = 1.65;
const chevronSize = { w: 39, h: 29 };

type Props = {
  boundingBox: BoundingBox;
  nodes: MapNode[];
  onSelectNode: (node: MapNode) => void;
  onSelectConnection: (connection: Connection) => void;
  selected?: { node?: MapNode; connection?: Connection };
};

const DetectiveMap: React.FC<Props> = ({
  boundingBox,
  nodes: unsortedNodes,
  selected,
  onSelectNode,
  onSelectConnection,
}) => {
  const [sizes, setSizes] = React.useState<Record<MapNode['id'], Size>>({});

  const onCardResize = React.useCallback(
    (id: MapNode['id'], size: Size) => {
      setSizes({
        ...sizes,
        [id]: size,
      });
    },
    [sizes]
  );

  const mappableNodes = React.useMemo(() => {
    return unsortedNodes
      .sort((a, b) => {
        const da = sizes[a.id];
        const db = sizes[b.id];

        if (da == null && db == null) {
          return 0;
        }

        if (da == null) {
          return 1;
        }

        if (db == null) {
          return -1;
        }

        const ya = a.location.y;
        const yb = b.location.y;

        const sa = dimensionsFrom(a.sizeClass).scale;
        const sb = dimensionsFrom(b.sizeClass).scale;

        if (sa < sb) {
          return 1;
        } else if (sa > sb) {
          return -1;
        }

        if (ya < yb) {
          return -1;
        } else if (ya > yb) {
          return 1;
        }

        return 0;
      })
      .map((node) => {
        const frame = new Rect(
          boundingBox.pointFor(node.location),
          sizes[node.id] ?? { height: 0, width: 0 },
          dimensionsFrom(node.sizeClass).scale
        );

        return {
          node,
          frame,
        };
      });
  }, [unsortedNodes, boundingBox, sizes]);

  const connections = React.useMemo(() => {
    const findById = (id: string) =>
      mappableNodes.find(({ node }) => node.id === id);

    return mappableNodes.reduce(
      (prev, mappableNode) => {
        const destinations = mappableNode.node.connections
          .map((connection) => findById(connection.sourceId))
          .filter(notEmpty);

        for (const destination of destinations) {
          const duplicate = prev.find(
            (v) =>
              v.source.node.id === mappableNode.node.id &&
              v.destination.node.id === destination.node.id
          );

          if (duplicate != null) {
            continue;
          }

          const reverse = prev.find(
            (v) =>
              v.source.node.id === destination.node.id &&
              v.destination.node.id === mappableNode.node.id
          );

          if (reverse != null) {
            reverse.isReversible = true;
            continue;
          }

          prev.push({
            source: mappableNode,
            destination,
            isReversible: false,
          });
        }

        return prev;
      },
      [] as {
        source: typeof mappableNodes[0];
        destination: typeof mappableNodes[0];
        isReversible: boolean;
      }[]
    );
  }, [mappableNodes]);

  const lines = React.useMemo(() => {
    return connections.map(({ source, destination, isReversible }) => {
      const from = source.frame.edgeIntersection(destination.frame.centre);
      const to = destination.frame.edgeIntersection(source.frame.centre);

      const offsets = isReversible ? [0.65, 0.35] : [0.5];

      return {
        from,
        to,
        source,
        destination,
        chevronsAt: offsets.map((offset, idx) => ({
          point: pointBetween(from, to, offset),
          rotation: 180 * idx,
        })),
        angle: boundingBox.angleBetween(from, to),
      };
    });
  }, [connections, boundingBox]);

  return (
    <g>
      {lines.map((line, idx) => {
        const lineIsSelected =
          selected?.connection?.from.id === line.source.node.id &&
          selected?.connection?.to.id === line.destination.node.id;

        const baseScale =
          chevronScale * (lineIsSelected ? chevronSelectedScale : 1);
        const shadowScale = chevronShadowScale * baseScale;
        return (
          <g
            key={idx}
            className={`stroke-current ${
              lineIsSelected ? 'text-white' : 'text-card-grey'
            } hover:text-white cursor-pointer`}
            onClick={() =>
              onSelectConnection?.({
                from: line.source.node,
                to: line.destination.node,
              })
            }
          >
            <line
              x1={`${line.from.x}`}
              y1={`${line.from.y}`}
              x2={`${line.to.x}`}
              y2={`${line.to.y}`}
              strokeWidth={lineWeight * 2}
              strokeLinecap="square"
              className="fill-current text-page-bg"
              stroke={theme.colors['page-bg']}
            />
            <line
              x1={`${line.from.x}`}
              y1={`${line.from.y}`}
              x2={`${line.to.x}`}
              y2={`${line.to.y}`}
              strokeWidth={lineWeight}
              strokeLinecap="square"
            />

            {line.chevronsAt.map((chevronAt) => (
              <g key={`chevron-${chevronAt.point.x}-${chevronAt.point.y}`}>
                <g
                  transform={`translate(-${
                    (chevronSize.w / 2) * shadowScale
                  } -${(chevronSize.h / 2) * shadowScale}) translate(${
                    chevronAt.point.x
                  } ${chevronAt.point.y}) rotate(${
                    line.angle + chevronAt.rotation
                  } ${(chevronSize.w / 2) * shadowScale} ${
                    (chevronSize.h / 2) * shadowScale
                  })`}
                >
                  <g
                    stroke={theme.colors['page-bg']}
                    transform={`translate(${
                      3.4 * shadowScale
                    } 0) scale(${shadowScale})`}
                    className="fill-current text-page-bg"
                  >
                    <LinkChevron />
                  </g>
                </g>
                <g
                  className="fill-current"
                  transform={`translate(-${(chevronSize.w / 2) * baseScale} -${
                    (chevronSize.h / 2) * baseScale
                  }) translate(${chevronAt.point.x} ${
                    chevronAt.point.y
                  }) rotate(${line.angle + chevronAt.rotation} ${
                    (chevronSize.w / 2) * baseScale
                  } ${(chevronSize.h / 2) * baseScale})`}
                >
                  <g transform={`scale(${baseScale})`}>
                    <LinkChevron />
                  </g>
                </g>
              </g>
            ))}
          </g>
        );
      })}
      {mappableNodes.map(({ node, frame }) => (
        <svg
          key={node.id}
          x={frame.topLeft.x}
          y={frame.topLeft.y}
          width={frame.size.width}
          height={frame.size.height}
        >
          <g
            width={frame.size.width}
            height={frame.size.height}
            style={{
              transform: `scale(${frame.scale})`,
            }}
          >
            <foreignObject
              width={frame.originalSize.width}
              height={frame.originalSize.height}
            >
              <div
                // @ts-ignore
                xmlns="http://www.w3.org/1999/xhtml"
              >
                <Card
                  node={node}
                  onSelect={onSelectNode}
                  onResize={onCardResize}
                  isSelected={node.id === selected?.node?.id}
                />
              </div>
            </foreignObject>
          </g>
        </svg>
      ))}
    </g>
  );
};

export default React.memo(DetectiveMap);
