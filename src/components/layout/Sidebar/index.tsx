import React from 'react';
import { Curiousity } from '../../../data/universe/types';
import CompactSidebar from './CompactSidebar';
import FullSidebar from './FullSidebar';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
  toggleLayer: (curiosity: Curiousity) => void;
};

const Sidebar: React.FC<Props> = ({ toggleSidebar, toggleLayer, isOpen }) => {
  return (
    <div className={`bg-paper h-full overflow-y-auto flex flex-col`}>
      <div>
        {isOpen && (
          <FullSidebar
            toggleSidebar={toggleSidebar}
            toggleLayer={toggleLayer}
          />
        )}
        {!isOpen && <CompactSidebar toggleSidebar={toggleSidebar} />}
      </div>
    </div>
  );
};

export default Sidebar;
