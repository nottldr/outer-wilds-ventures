import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarProps } from '.';
import { MapLayer } from '../../../util/map-layer';
import DiscordLogo from '../../theme/DiscordLogo';
import Logo from '../../theme/Logo';
import OuterWildsLogo from '../../theme/OuterWildsLogo';
import OpenSidebarButton from './Button/OpenSidebarButton';
import MapLayerCheckbox from './Checkbox/MapLayerConfig';
import XCheckbox from './Checkbox/XCheckbox';

type Props = SidebarProps;

const FullSidebar: React.FC<Props> = ({
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
      <div className="px-8 py-2 flex flex-row items-center justify-between relative">
        <div className="absolute top-4 left-4">
          <OpenSidebarButton toggle={toggleSidebar} />
        </div>
        <div className="flex flex-row flex-grow">
          <div className="flex flex-grow items-center justify-center">
            <NavLink to="/" className="focus:outline-none focus:shadow-outline">
              <div className="w-24 md:mt-4">
                <Logo />
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="mx-4 flex-row">
        {/* <nav>
          <div>
            <NavLink
              to="/"
              activeClassName="font-bold"
              className="block px-4 py-2 mt-2 text-sm text-page-bg bg-white rounded-lg focus:outline-none focus:shadow-outline"
              exact
            >
              Map
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/grid"
              activeClassName="font-bold"
              className="block px-4 py-2 mt-2 text-sm text-page-bg bg-white rounded-lg focus:outline-none focus:shadow-outline"
              exact
            >
              Grid
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/list"
              activeClassName="font-bold"
              className="block px-4 py-2 mt-2 text-sm text-page-bg bg-white rounded-lg focus:outline-none focus:shadow-outline"
              exact
            >
              List
            </NavLink>
          </div>
        </nav> */}

        <div className="font-space-mono text-xs">
          <div className="bg-darkblue text-white text-center px-4 py-2 font-serif mt-4 mb-6 text-base">
            <h1 className="uppercase">Outer Wilds Ventures</h1>
            <h2>Archaeologist Guide</h2>
          </div>
          <div className="mb-8">
            <ul>
              <li>
                Links (rumours) indicate Log sources, which may be found at
                either side and are not required for Archaeologist
              </li>
            </ul>
          </div>
          <div className="bg-orange text-white text-center px-4 py-2 font-serif my-6 text-base">
            <h3>Ship Log Categories</h3>
          </div>
          <div className="mb-8">
            <ul className="space-y-1">
              <li>
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
                  />{' '}
                  The Orbital Cannon &amp; The Eye
                </label>
              </li>
              <li>
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
                  />{' '}
                  The Quantum Moon &amp; related phenomena
                </label>
              </li>
              <li>
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
                  />{' '}
                  The Vessel &amp; Nomai arrival
                </label>
              </li>
              <li>
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
                  />{' '}
                  The Ash Twin Project
                </label>
              </li>
              <li>
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
                  />{' '}
                  Other, including The Interloper and the fate of the Nomai
                </label>
              </li>
            </ul>
          </div>
          <div className="bg-orange text-white text-center px-4 py-2 font-serif my-6 text-base">
            <h3>Layer Controls</h3>
          </div>
          <div className="mb-8">
            <ul className="space-y-1">
              <li>
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-show-log-counts"
                  checked={showLogCounts}
                  onChange={() => toggleShowLogCounts()}
                />{' '}
                <label htmlFor="toggle-show-log-counts">
                  <XCheckbox checked={showLogCounts} /> Show Log entry counts
                </label>
              </li>
              <li>
                <input
                  type="checkbox"
                  className="hidden"
                  id="toggle-spoiler-free-mode"
                  checked={spoilerFreeMode}
                  onChange={() => toggleSpoilerFreeMode()}
                />{' '}
                <label htmlFor="toggle-spoiler-free-mode">
                  <XCheckbox checked={spoilerFreeMode} /> Spoiler-free mode
                </label>
              </li>
              <li>
                <div onClick={() => reset()} className="cursor-pointer">
                  <div className="bg-card-red w-4 h-4 rounded-full inline-block align-middle" />{' '}
                  Reset everything
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-row md:sticky md:bottom-0 mx-auto py-4 flex-1 flex-grow bg-paper flex">
        <div className="flex items-end">
          <div className="mx-auto w-1/2">
            <a href="https://discord.gg/csKYR3w">
              <DiscordLogo className="m-auto mb-3 w-1/6" />
            </a>
            <div className="px-4">
              <a href="https://www.mobiusdigitalgames.com/outer-wilds.html">
                <OuterWildsLogo className="m-auto max-h-48" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullSidebar;
