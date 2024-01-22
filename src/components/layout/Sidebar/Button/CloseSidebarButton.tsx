import React from 'react';

import SidebarButton from './SidebarButton';

type Props = { toggle: () => void };

const OpenSidebarButton: React.FC<Props> = ({ toggle }) => (
  <SidebarButton toggle={toggle}>
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
      clipRule="evenodd"
    ></path>
  </SidebarButton>
);

export default OpenSidebarButton;
