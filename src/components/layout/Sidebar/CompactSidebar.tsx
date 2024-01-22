import React from 'react';
import { SidebarProps } from '.';
import { MapLayer } from '../../../util/map-layer';
import Logo from '../../theme/Logo';
import CloseSidebarButton from './Button/CloseSidebarButton';
import MapLayerCheckbox from './Checkbox/MapLayerConfig';
import XCheckbox from './Checkbox/XCheckbox';

type Props = SidebarProps;

const CompactSidebar: React.FC<Props> = ({
  toggleSidebar,
  toggleLayer,
  visibleLayers,
  toggleShowLogCounts,
  showLogCounts,
  toggleSpoilerFreeMode,
  spoilerFreeMode,
  reset,
}) => {
  return (
    <>
      <div className="visible md:hidden absolute top-4 left-4">
        <CloseSidebarButton toggle={toggleSidebar} />
      </div>
      <div className="p-4">
        <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 justify-center">
          <div className="w-12 max-h-12">
            <Logo />
          </div>
          <div className="justify-center hidden md:flex">
            <CloseSidebarButton toggle={toggleSidebar} />
          </div>
        </div>
        <div className="mt-4 md:mt-8 text-center space-x-1 md:space-x-0">
          <div className="mb-4 md:mb-8 inline-block md:block">
            <ul className="space-y-1 space-x-1 md:space-x-0">
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-SUNKEN_MODULE"
                  checked={visibleLayers.includes(MapLayer.SUNKEN_MODULE)}
                  onChange={() => toggleLayer(MapLayer.SUNKEN_MODULE)}
                />{' '}
                <label htmlFor="toggle-SUNKEN_MODULE">
                  <MapLayerCheckbox
                    checked={visibleLayers.includes(MapLayer.SUNKEN_MODULE)}
                    mapLayer={MapLayer.SUNKEN_MODULE}
                  />
                </label>
              </li>
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-QUANTUM_MOON"
                  checked={visibleLayers.includes(MapLayer.QUANTUM_MOON)}
                  onChange={() => toggleLayer(MapLayer.QUANTUM_MOON)}
                />{' '}
                <label htmlFor="toggle-QUANTUM_MOON">
                  <MapLayerCheckbox
                    checked={visibleLayers.includes(MapLayer.QUANTUM_MOON)}
                    mapLayer={MapLayer.QUANTUM_MOON}
                  />
                </label>
              </li>
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-VESSEL"
                  checked={visibleLayers.includes(MapLayer.VESSEL)}
                  onChange={() => toggleLayer(MapLayer.VESSEL)}
                />{' '}
                <label htmlFor="toggle-VESSEL">
                  <MapLayerCheckbox
                    checked={visibleLayers.includes(MapLayer.VESSEL)}
                    mapLayer={MapLayer.VESSEL}
                  />
                </label>
              </li>
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-TIME_LOOP"
                  checked={visibleLayers.includes(MapLayer.TIME_LOOP)}
                  onChange={() => toggleLayer(MapLayer.TIME_LOOP)}
                />{' '}
                <label htmlFor="toggle-TIME_LOOP">
                  <MapLayerCheckbox
                    checked={visibleLayers.includes(MapLayer.TIME_LOOP)}
                    mapLayer={MapLayer.TIME_LOOP}
                  />
                </label>
              </li>
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-INVISIBLE_PLANET"
                  checked={visibleLayers.includes(MapLayer.INVISIBLE_PLANET)}
                  onChange={() => toggleLayer(MapLayer.INVISIBLE_PLANET)}
                />{' '}
                <label htmlFor="toggle-INVISIBLE_PLANET">
                  <MapLayerCheckbox
                    checked={visibleLayers.includes(MapLayer.INVISIBLE_PLANET)}
                    mapLayer={MapLayer.INVISIBLE_PLANET}
                  />
                </label>
              </li>
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-OTHER"
                  checked={visibleLayers.includes(MapLayer.OTHER)}
                  onChange={() => toggleLayer(MapLayer.OTHER)}
                />{' '}
                <label htmlFor="toggle-OTHER">
                  <MapLayerCheckbox
                    checked={visibleLayers.includes(MapLayer.OTHER)}
                    mapLayer={MapLayer.OTHER}
                  />
                </label>
              </li>
            </ul>
          </div>

          <div className="mb-4 md:mb-8 inline-block md:block">
            <ul className="space-y-1 space-x-1 md:space-x-0">
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-show-log-counts"
                  checked={showLogCounts}
                  onChange={() => toggleShowLogCounts()}
                />{' '}
                <label htmlFor="toggle-show-log-counts">
                  <XCheckbox checked={showLogCounts} />
                </label>
              </li>
              <li className="inline-block md:block">
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-spoiler-free-mode"
                  checked={spoilerFreeMode}
                  onChange={() => toggleSpoilerFreeMode()}
                />{' '}
                <label htmlFor="toggle-spoiler-free-mode">
                  <XCheckbox checked={spoilerFreeMode} />
                </label>
              </li>
              <li className="inline-block md:block">
                <div onClick={() => reset()} className="cursor-pointer">
                  <div className="bg-card-red w-4 h-4 rounded-full inline-block align-middle" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompactSidebar;
