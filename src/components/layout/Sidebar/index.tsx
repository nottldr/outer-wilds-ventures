import React from 'react';
import CompactSidebar from './CompactSidebar';
import FullSidebar from './FullSidebar';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const Sidebar: React.FC<Props> = ({ toggle, isOpen }) => {
  return (
    <div className={`bg-paper h-full overflow-y-auto flex flex-col`}>
      <div>
        {isOpen && <FullSidebar toggle={toggle} />}
        {!isOpen && <CompactSidebar toggle={toggle} />}
      </div>
    </div>
  );
};

export default Sidebar;
