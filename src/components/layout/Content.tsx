import React from 'react';

const Content: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex flex-1 relative">{children}</div>
);

export default Content;
