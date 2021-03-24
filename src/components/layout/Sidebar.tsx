import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../theme/Logo';
import DiscordLogo from '../theme/DiscordLogo';
import OuterWildsLogo from '../theme/OuterWildsLogo';

const Sidebar: React.FC = () => (
  <div className="bg-paper h-full overflow-y-auto flex flex-col">
    <div className="px-8 py-4 flex flex-row items-center justify-between">
      <NavLink to="/" className="focus:outline-none focus:shadow-outline">
        <div className="flex flex-row justify-center">
          <div className="w-2/3">
            <Logo />
          </div>
        </div>
      </NavLink>
      <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
          <path
            x-show="!open"
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
          <path
            x-show="open"
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>

    <div className="mx-4 flex-row">
      <nav>
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
      </nav>

      <div className="font-space-mono text-xs">
        <div className="bg-darkblue text-white text-center px-4 py-2 font-serif my-8 text-base">
          <h1 className="uppercase">Outer Wilds Ventures</h1>
          <h2>Archaeologist Guide</h2>
        </div>
        <div className="mb-8">
          <ul className="list-disc list-outside mx-2 pl-2">
            <li>Numbers indicate how many entries per Log card</li>
            <li>
              Links (rumours) indicate Log sources, which may be found at either
              side and are not required for Archaeologist
            </li>
          </ul>
        </div>
        <div className="bg-orange text-white text-center px-4 py-2 font-serif my-8 text-base">
          <h3>Ship Log Categories</h3>
        </div>
        <div className="mb-8">
          <ul className="list-disc list-outside mx-2 pl-2">
            <li>The Orbital Cannon &amp; The Eye</li>
            <li>The Quantum Moon &amp; related phenomena</li>
            <li>The Vessel &amp; Nomai arrival</li>
            <li>The Ash Twin Project</li>
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
  </div>
);

export default Sidebar;
