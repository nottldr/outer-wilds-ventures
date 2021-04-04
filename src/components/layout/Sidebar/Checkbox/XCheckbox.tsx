import React from 'react';

type Props = {
  checked: boolean;
};

const XCheckbox: React.FC<Props> = ({ checked }) => {
  return (
    <div className={`inline-block align-middle w-4 h-4 bg-white`}>
      {checked && (
        <div className="w-full h-full flex items-center justify-center place-items-center font-space-mono text-page-bg">
          X
        </div>
      )}
    </div>
  );
};

export default XCheckbox;
