import React from 'react';
import { MapNode } from '../data/universe/types';
import themeFrom from '../util/theme-from';
import Card from './Card';

export type Props = MapNode;

const Location: React.FC<Props> = (props) => {
  const { name, logs, colour } = props;

  const theme = themeFrom(colour);

  return (
    <div>
      <h1
        className={`text-lg font-bold p-4 my-2 text-center ${theme.bg} ${theme.bghover} ${theme.text} font-serif`}
      >
        {name}
      </h1>
      <Card node={props} />
      <ul className="list-disc list-inside mx-4 font-space-mono">
        {logs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Location;
