import React from 'react';
import { MapNode, PlanetColour } from '../data/universe/types';

export type Props = MapNode;

type CardTheme = {
  bg: string;
  bghover: string;
  text: string;
};

const themeFrom = (colour: PlanetColour): CardTheme => {
  switch (colour) {
    case PlanetColour.GREEN:
      return {
        bg: `bg-card-green`,
        bghover: `hover:bg-card-green-hover`,
        text: `text-card-green-text`,
      };
    case PlanetColour.ORANGE:
      return {
        bg: `bg-card-orange`,
        bghover: `hover:bg-card-orange-hover`,
        text: `text-card-orange-text`,
      };
    case PlanetColour.RED:
      return {
        bg: `bg-card-red`,
        bghover: `hover:bg-card-red-hover`,
        text: `text-card-red-text`,
      };
    case PlanetColour.PURPLE:
      return {
        bg: `bg-card-purple`,
        bghover: `hover:bg-card-purple-hover`,
        text: `text-card-purple-text`,
      };
    default:
    case PlanetColour.GREY:
      return {
        bg: `bg-card-grey`,
        bghover: `hover:bg-card-grey-hover`,
        text: `text-card-grey-text`,
      };
  }
};

const Card: React.FC<Props> = ({ name, logs, colour }) => {
  const theme = themeFrom(colour);

  return (
    <div>
      <h1
        className={`text-lg font-bold p-4 my-2 text-center ${theme.bg} ${theme.bghover} ${theme.text}`}
      >
        {name}
      </h1>
      <ul className="list-disc list-inside mx-4">
        {logs.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
