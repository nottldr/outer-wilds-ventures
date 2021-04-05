import React, { useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { ReactSVGPanZoom, Value } from 'react-svg-pan-zoom';
import DetectiveMap from '.';
import { Connection, MapNode } from '../../data/universe/types';
import BoundingBox from '../../util/bounding-box';
import { MapLayer } from '../../util/map-layer';
import theme from '../../util/theme';
import Log from '../Log';
import MapControls from './MapControls';
import { zoomToScaleOnViewerCenter } from './util/zoom';

type Props = {
  nodes: MapNode[];
  visibleLayers: MapLayer[];
  showLogCounts: boolean;
  spoilerFreeMode: boolean;
  resetAt?: number;
};

const scaleFactorMax = 3;
const scaleFactorMin = 0.1;
const scaleSteps = 20;

const MappyBoi: React.FC<Props> = ({
  nodes,
  visibleLayers,
  showLogCounts,
  spoilerFreeMode,
  resetAt,
}) => {
  const [selected, setSelected] = React.useState<{
    node?: MapNode;
    connection?: Connection;
  }>({});
  const [isReady, setIsReady] = React.useState(false);
  const [logs, setLogs] = React.useState<string[]>([]);

  const normalised = React.useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        location: {
          x: node.location.x,
          y: -node.location.y,
        },
      })),
    [nodes]
  );

  React.useEffect(() => {
    if (resetAt != null) {
      setSelected({});
      _fitToViewer();
    }
  }, [resetAt]);

  const boundingBox = React.useMemo(() => {
    const b = new BoundingBox(normalised.map((n) => n.location));
    b.setPadding(150);
    return b;
  }, [normalised]);

  const onSelectNode = React.useCallback(
    (node: MapNode) => {
      if (selected.node?.id === node.id) {
        setSelected({});
        setLogs([]);
      } else {
        setSelected({ node });
        setLogs(node.logs);
      }
    },
    [selected.node?.id]
  );

  const onSelectConnection = React.useCallback(
    (connection: Connection) => {
      if (
        selected.connection?.from.id === connection.from.id &&
        selected.connection?.to.id === connection.to.id
      ) {
        setSelected({});
        setLogs([]);
      } else {
        setSelected({ connection });
        setLogs([
          ...connection.from.connections
            .filter((c) => c.sourceId === connection.to.id)
            .map((c) => c.text),

          // also, for reverse special case:
          ...connection.to.connections
            .filter((c) => c.sourceId === connection.from.id)
            .map((c) => c.text),
        ]);
      }
    },
    [selected.connection?.from.id, selected.connection?.to.id]
  );

  const Viewer = React.useRef<ReactSVGPanZoom>(null);

  React.useEffect(() => {
    Viewer.current?.fitToViewer();
  }, []);

  const [value, setValue] = React.useState<Value>();
  const [scaleFactor, setScaleFactor] = React.useState(scaleFactorMax);

  const onChangeValue = (value: Value) => {
    setValue(value);
    setScaleFactor(value.a);
  };

  const _zoomIn = () =>
    _zoomToScaleFactor(
      scaleFactor + (scaleFactorMax - scaleFactorMin) / scaleSteps
    );
  const _zoomOut = () =>
    _zoomToScaleFactor(
      scaleFactor - (scaleFactorMax - scaleFactorMin) / scaleSteps
    );
  const _zoomToLevel = (level: number) => {
    _zoomToScaleFactor(
      level * (scaleFactorMax - scaleFactorMin) + scaleFactorMin
    );
  };
  const _zoomToScaleFactor = (scaleFactor: number) => {
    if (Viewer.current == null) {
      return;
    }

    Viewer.current.setValue(
      zoomToScaleOnViewerCenter(Viewer.current.getValue(), scaleFactor)
    );
  };
  const _fitToViewer = () =>
    (Viewer.current?.fitToViewer as any)('center', 'center');

  const { observe, width, height } = useDimensions();

  useEffect(() => {
    if (width === 0 || height === 0) {
      return;
    }

    window.requestAnimationFrame(() => {
      setIsReady(true);
      _fitToViewer();
    });
  }, [width, height]);

  const level =
    (scaleFactor - scaleFactorMin) / (scaleFactorMax - scaleFactorMin);

  return (
    <>
      <div className="bg-page-bg relative max-w-full overflow-scroll scrollbar-off flex-row flex-1">
        <div className="absolute top-4 right-4" style={{ zIndex: 999 }}>
          <MapControls
            onZoomIn={_zoomIn}
            onZoomOut={_zoomOut}
            onZoom={_zoomToLevel}
            level={level}
          />
        </div>
        <div
          ref={observe as any}
          className={`${isReady ? 'visible' : 'invisible'} h-full`}
        >
          {
            <ReactSVGPanZoom
              value={value ?? ({} as Value)}
              onChangeValue={onChangeValue}
              tool="auto"
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
              detectAutoPan={false}
              scaleFactorMax={scaleFactorMax}
              scaleFactorMin={scaleFactorMin}
            >
              <svg
                width={boundingBox.size.width}
                height={boundingBox.size.height}
              >
                <DetectiveMap
                  nodes={normalised}
                  boundingBox={boundingBox}
                  onSelectNode={onSelectNode}
                  onSelectConnection={onSelectConnection}
                  selected={selected}
                  visibleLayers={visibleLayers}
                  showLogCounts={showLogCounts}
                  spoilerFreeMode={spoilerFreeMode}
                />
              </svg>
            </ReactSVGPanZoom>
          }
        </div>
      </div>
      {(selected.node || selected.connection) && (
        <Log logs={logs} spoilerFreeMode={spoilerFreeMode} />
      )}
    </>
  );
};

export default MappyBoi;
