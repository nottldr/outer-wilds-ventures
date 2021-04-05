import React from 'react';

type Props = {
  logs: string[];
  spoilerFreeMode: boolean;
};

const Log: React.FC<Props> = ({ logs, spoilerFreeMode }) => {
  return (
    <div className="loggo absolute bottom-0 w-full">
      <div className="bg-log-bg border-2 text-log-text border-lightblue box-border mx-4 bottom-4 relative">
        <div
          className="overflow-auto"
          style={{
            maxHeight: '300px',
          }}
        >
          <ul
            className={`${
              spoilerFreeMode ? 'font-flow-block' : 'font-space-mono'
            } list-outside list-disc ml-6`}
          >
            {logs.map((log, idx) => (
              <li className="my-1" key={idx}>
                {log}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Log;
