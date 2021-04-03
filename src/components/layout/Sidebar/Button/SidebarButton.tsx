import React from 'react';

type Props = {
  toggle: () => void;
  children: React.ReactNode;
};

const SidebarButton: React.FC<Props> = ({ toggle, children }) => (
  <button
    className="rounded-lg focus:outline-none focus:shadow-outline"
    onClick={toggle}
  >
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
      {children}
    </svg>
  </button>
);

export default SidebarButton;
