import React from 'react';
import { MapLayer } from '../../../util/map-layer';
import CompactSidebar from './CompactSidebar';
import FullSidebar from './FullSidebar';

export type SidebarProps = {
  toggleSidebar: () => void;
  toggleLayer: (mapLayer: MapLayer) => void;
  visibleLayers: MapLayer[];
  toggleShowLogCounts: () => void;
  showLogCounts: boolean;
  toggleSpoilerFreeMode: () => void;
  spoilerFreeMode: boolean;
};

type Props = SidebarProps & {
  isOpen: boolean;
};

const Sidebar: React.FC<Props> = ({
  toggleSidebar,
  toggleLayer,
  visibleLayers,
  toggleShowLogCounts,
  showLogCounts,
  toggleSpoilerFreeMode,
  spoilerFreeMode,
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
            toggleShowLogCounts={toggleShowLogCounts}
            showLogCounts={showLogCounts}
            toggleSpoilerFreeMode={toggleSpoilerFreeMode}
            spoilerFreeMode={spoilerFreeMode}
          />
        )}
        {!isOpen && <CompactSidebar toggleSidebar={toggleSidebar} />}
      </div>
    </div>
  );
};

export default Sidebar;
