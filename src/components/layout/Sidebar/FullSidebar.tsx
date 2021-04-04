import React from 'react';
import { NavLink } from 'react-router-dom';
import { Curiosity } from '../../../data/universe/types';
import DiscordLogo from '../../theme/DiscordLogo';
import Logo from '../../theme/Logo';
import OuterWildsLogo from '../../theme/OuterWildsLogo';
import OpenSidebarButton from './Button/OpenSidebarButton';

type Props = {
  toggleSidebar: () => void;
  toggleLayer: (curiosity: Curiosity) => void;
};

const FullSidebar: React.FC<Props> = ({ toggleSidebar, toggleLayer }) => {
  return (
    <>
      <div className="absolute top-4 left-4">
        <OpenSidebarButton toggle={toggleSidebar} />
      </div>

      <div className="px-8 py-4 flex flex-row items-center justify-between">
        <NavLink to="/" className="focus:outline-none focus:shadow-outline">
          <div className="flex flex-row justify-center">
            <div className="w-2/3">
              <Logo />
            </div>
          </div>
        </NavLink>
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
          <div className="bg-darkblue text-white text-center px-4 py-2 font-serif my-8 text-base">
            <h1 className="uppercase">Outer Wilds Ventures</h1>
            <h2>Archaeologist Guide</h2>
          </div>
          <div className="mb-8">
            <ul className="list-disc list-outside mx-2 pl-2">
              <li>Numbers indicate how many entries per Log card</li>
              <li>
                Links (rumours) indicate Log sources, which may be found at
                either side and are not required for Archaeologist
              </li>
            </ul>
          </div>
          <div className="bg-orange text-white text-center px-4 py-2 font-serif my-8 text-base">
            <h3>Ship Log Categories</h3>
          </div>
          <div className="mb-8">
            <ul className="list-disc list-outside mx-2 pl-2">
              <li>
                <input type="checkbox" id="toggle-ORBITAL_PROBE_CANNON" />{' '}
                <label htmlFor="toggle-ORBITAL_PROBE_CANNON">
                  The Orbital Cannon &amp; The Eye
                </label>
              </li>
              <li>
                <input type="checkbox" id="toggle-QUANTUM_MOON" />{' '}
                <label htmlFor="toggle-QUANTUM_MOON">
                  The Quantum Moon &amp; related phenomena
                </label>
              </li>
              <li>
                <input type="checkbox" id="toggle-DB_VESSEL" />{' '}
                <label htmlFor="toggle-DB_VESSEL">
                  The Vessel &amp; Nomai arrival
                </label>
              </li>
              <li>
                <input type="checkbox" id="toggle-TT_TIME_LOOP_DEVICE" />{' '}
                <label htmlFor="toggle-TT_TIME_LOOP_DEVICE">
                  The Ash Twin Project
                </label>
              </li>
              <li>Other, including The Interloper and the fate of the Nomai</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-row md:sticky md:bottom-0 mx-auto pt-8 pb-8 flex-1 flex-grow bg-paper flex">
        <div className="flex items-end">
          <div className="mx-auto w-2/3">
            <a href="https://discord.com/">
              <DiscordLogo className="m-auto mb-6" />
            </a>
            <div className="px-4">
              <OuterWildsLogo className="m-auto max-h-48" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullSidebar;
