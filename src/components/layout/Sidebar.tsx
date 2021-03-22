import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <>
    <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
      <NavLink
        to="/"
        className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
      >
        Outer Wilds Ventures
      </NavLink>
      <button className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline">
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
          <path
            x-show="!open"
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
          <path
            x-show="open"
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <nav>
      <div className="block px-4 py-2 mt-2 text-sm font-semibold text-page-bg bg-paper rounded-lg focus:outline-none focus:shadow-outline">
        <NavLink to="/" activeClassName="font-bold" exact>
          Map
        </NavLink>
      </div>
      <div className="block px-4 py-2 mt-2 text-sm font-semibold text-page-bg bg-paper rounded-lg focus:outline-none focus:shadow-outline">
        <NavLink to="/grid" activeClassName="font-bold" exact>
          Grid
        </NavLink>
      </div>
      <div className="block px-4 py-2 mt-2 text-sm font-semibold text-page-bg bg-paper rounded-lg focus:outline-none focus:shadow-outline">
        <NavLink to="/list" activeClassName="font-bold" exact>
          List
        </NavLink>
      </div>
    </nav>
  </>
);

export default Sidebar;
