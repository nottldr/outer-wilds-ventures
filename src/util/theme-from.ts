import { PlanetColour } from '../data/universe/types';

type LocationTheme = {
  bg: string;
  bghover: string;
  text: string;
};

const themeFrom = (colour: PlanetColour, isSelected = false): LocationTheme => {
  switch (colour) {
    case PlanetColour.GREEN:
      return {
        bg: isSelected ? 'bg-card-green-hover' : `bg-card-green`,
        bghover: `hover:bg-card-green-hover`,
        text: `text-card-green-text`,
      };
    case PlanetColour.ORANGE:
      return {
        bg: isSelected ? 'bg-card-orange-hover' : `bg-card-orange`,
        bghover: `hover:bg-card-orange-hover`,
        text: `text-card-orange-text`,
      };
    case PlanetColour.RED:
      return {
        bg: isSelected ? 'bg-card-red-hover' : `bg-card-red`,
        bghover: `hover:bg-card-red-hover`,
        text: `text-card-red-text`,
      };
    case PlanetColour.PURPLE:
      return {
        bg: isSelected ? 'bg-card-purple-hover' : `bg-card-purple`,
        bghover: `hover:bg-card-purple-hover`,
        text: `text-card-purple-text`,
      };
    default:
    case PlanetColour.GREY:
      return {
        bg: isSelected ? 'bg-card-grey-hover' : `bg-card-grey`,
        bghover: `hover:bg-card-grey-hover`,
        text: `text-card-grey-text`,
      };
  }
};

export default themeFrom;
