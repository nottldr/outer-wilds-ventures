import React, { useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { MapNode } from '../data/universe/types';
import BoundingBox from '../util/bounding-box';
import dimensionsFrom from '../util/dimensions-from';
import notEmpty from '../util/not-empty';
import theme from '../util/theme';
import themeFrom from '../util/theme-from';
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

  const Viewer = React.useRef<ReactSVGPanZoom>(null);

  React.useEffect(() => {
    Viewer.current?.fitToViewer();
  }, []);

  const [value, onChangeValue] = React.useState({});

  const _zoomIn = () => Viewer.current?.zoomOnViewerCenter(1.3);
  const _zoomOut = () => Viewer.current?.zoomOnViewerCenter(1 / 1.3);
  const _fitToViewer = () =>
    (Viewer.current?.fitToViewer as any)('center', 'center');

  const { ref, width, height } = useDimensions();

  useEffect(() => {
    if (width === 0 || height === 0) {
      return;
    }

    window.requestAnimationFrame(() => {
      _fitToViewer();
    });
  }, [width, height]);

  console.log({ width, height }, width > 0 && height > 0);

  return (
    <>
      <div className="bg-page-bg relative max-w-full h-full overflow-scroll">
        {false &&
          sorted.map((node) => (
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
        <div
          className="text-white absolute top-0 right-0"
          style={{ zIndex: 999 }}
        >
          <button className="btn" onClick={() => _zoomIn()}>
            Zoom +
          </button>
          /
          <button className="btn" onClick={() => _zoomOut()}>
            Zoom -
          </button>
          /
          <button className="btn" onClick={() => _fitToViewer()}>
            Fit
          </button>
        </div>
        <div
          ref={ref as any}
          className={`${
            width > 0 && height > 0 ? 'visible' : 'invisible'
          } h-full`}
        >
          {(true || (width > 0 && height > 0)) && (
            <ReactSVGPanZoom
              value={value as any}
              onChangeValue={onChangeValue}
              tool="pan"
              background={theme.colors['page-bg']}
              SVGBackground={theme.colors['page-bg']}
              onChangeTool={() => {}}
              miniatureProps={{
                position: 'none',
                background: '',
                width: 0,
                height: 0,
              }}
              toolbarProps={{ position: 'none' }}
              ref={Viewer}
              width={width > 0 ? width : 500}
              height={height > 0 ? height : 500}
            >
              <svg
                width={boundingBox.size.width}
                height={boundingBox.size.height}
              >
                {connections.length > 0 &&
                  connections.map((connection, idx) => (
                    <g key={idx}>
                      <line
                        key={`${connection.source.id}-to-${connection.destination.id}-${idx}`}
                        x1={`${
                          boundingBox.pointFor(connection.source.location).x
                        }`}
                        y1={`${
                          boundingBox.pointFor(connection.source.location).y
                        }`}
                        x2={`${
                          boundingBox.pointFor(connection.destination.location)
                            .x
                        }`}
                        y2={`${
                          boundingBox.pointFor(connection.destination.location)
                            .y
                        }`}
                        className="stroke-current text-card-grey"
                        strokeWidth={6}
                      />
                      <g
                        transform={`translate(-${24 * 1.7} -${
                          24 * 1.7
                        }) translate(${
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
                {sorted.map((node) => {
                  const theme = themeFrom(
                    node.colour,
                    node.id === selected?.id
                  );
                  const dimensions = dimensionsFrom(node.size);
                  const point = boundingBox.pointFor(node.location);

                  return (
                    <foreignObject
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
                {sorted.map((node) => {
                  const theme = themeFrom(
                    node.colour,
                    node.id === selected?.id
                  );
                  const dimensions = dimensionsFrom(node.size);

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
              </svg>
            </ReactSVGPanZoom>
          )}
        </div>
      </div>
      {selected && (
        <div className="sticky bottom-0 w-full">
          <Log logs={selected.logs} />
        </div>
      )}
    </>
  );
};

export default MappyBoi;
