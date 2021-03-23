import React, { useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import { MapNode } from '../data/universe/types';
import BoundingBox from '../util/bounding-box';
import theme from '../util/theme';
import DetectiveMap from './DetectiveMap';
import Log from './Log';

type Props = {
  nodes: MapNode[];
};

const MappyBoi: React.FC<Props> = ({ nodes }) => {
  const [selected, setSelected] = React.useState<MapNode | undefined>();
  const [isReady, setIsReady] = React.useState(false);

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

  const boundingBox = React.useMemo(() => {
    const b = new BoundingBox(normalised.map((n) => n.location));
    b.setPadding(150);
    return b;
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
      console.log('resize via requestAnimationFrame');
      setIsReady(true);
      _fitToViewer();
    });
  }, [width, height]);

  console.log({ width, height });

  return (
    <>
      <div className="bg-page-bg relative max-w-full h-full overflow-scroll">
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
          className={`${isReady ? 'visible' : 'invisible'} h-full`}
        >
          {
            <ReactSVGPanZoom
              value={value as any}
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
            >
              <svg
                width={boundingBox.size.width}
                height={boundingBox.size.height}
              >
                <DetectiveMap
                  nodes={normalised}
                  boundingBox={boundingBox}
                  onSelect={onSelect}
                />
              </svg>
            </ReactSVGPanZoom>
          }
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
