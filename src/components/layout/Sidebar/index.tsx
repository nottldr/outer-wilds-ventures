import React from 'react';
import { MapLayer } from '../../../types';
import CompactSidebar from './CompactSidebar';
import FullSidebar from './FullSidebar';

export type SidebarProps = {
  toggleSidebar: () => void;
  toggleLayer: (mapLayer: MapLayer) => void;
  visibleLayers: MapLayer[];
};

type Props = SidebarProps & {
  isOpen: boolean;
};

const Sidebar: React.FC<Props> = ({
  toggleSidebar,
  toggleLayer,
  visibleLayers,
  isOpen,
}) => {
  return (
    <div className={`bg-paper h-full overflow-y-auto flex flex-col`}>
      <div>
        {isOpen && (
          <FullSidebar
            toggleSidebar={toggleSidebar}
            toggleLayer={toggleLayer}
            visibleLayers={visibleLayers}
          />
        )}
        {!isOpen && <CompactSidebar toggleSidebar={toggleSidebar} />}
      </div>
    </div>
  );
};

export default Sidebar;
