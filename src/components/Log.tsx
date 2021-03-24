import React from 'react';

type Props = {
  logs: string[];
};

const Log: React.FC<Props> = ({ logs }) => {
  return (
    <div className="loggo absolute bottom-0 w-full">
      <div className="bg-log-bg border-2 text-log-text border-lightblue box-border mx-4 bottom-4 relative">
        <ul className="font-space-mono list-outside list-disc ml-6">
          {logs.map((log, idx) => (
            <li className="my-1" key={idx}>
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Log;
