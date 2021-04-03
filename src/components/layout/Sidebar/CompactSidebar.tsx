import React from 'react';
import Logo from '../../theme/Logo';
import CloseSidebarButton from './Button/CloseSidebarButton';

type Props = {
  toggle: () => void;
};

const CompactSidebar: React.FC<Props> = ({ toggle }) => {
  return (
    <>
      <div className="visible md:hidden absolute top-4 left-4">
        <CloseSidebarButton toggle={toggle} />
      </div>
      <div className="p-4">
        <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4">
          <div className="flex justify-center h-12 md:h-auto">
            <Logo />
          </div>
          <div className="justify-center hidden md:flex">
            <CloseSidebarButton toggle={toggle} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompactSidebar;
