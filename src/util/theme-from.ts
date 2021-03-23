import { PlanetColour } from '../data/universe/types';

type LocationTheme = {
  bg: string;
  bghover: string;
  text: string;
  bgtext: string;
  bghovertext: string;
};

const themeFrom = (colour: PlanetColour, isSelected = false): LocationTheme => {
  switch (colour) {
    case PlanetColour.GREEN:
      return {
        bg: isSelected ? 'bg-card-green-hover' : 'bg-card-green',
        bghover: 'hover:bg-card-green-hover',
        text: 'text-card-green-text',
        bgtext: isSelected ? 'text-card-green-hover' : 'text-card-green',
        bghovertext: 'hover:text-card-green-hover',
      };
    case PlanetColour.ORANGE:
      return {
        bg: isSelected ? 'bg-card-orange-hover' : 'bg-card-orange',
        bghover: 'hover:bg-card-orange-hover',
        text: 'text-card-orange-text',
        bgtext: isSelected ? 'text-card-orange-hover' : 'text-card-orange',
        bghovertext: 'hover:text-card-orange-hover',
      };
    case PlanetColour.RED:
      return {
        bg: isSelected ? 'bg-card-red-hover' : 'bg-card-red',
        bghover: 'hover:bg-card-red-hover',
        text: 'text-card-red-text',
        bgtext: isSelected ? 'text-card-red-hover' : 'text-card-red',
        bghovertext: 'hover:text-card-red-hover',
      };
    case PlanetColour.PURPLE:
      return {
        bg: isSelected ? 'bg-card-purple-hover' : 'bg-card-purple',
        bghover: 'hover:bg-card-purple-hover',
        text: 'text-card-purple-text',
        bgtext: isSelected ? 'text-card-purple-hover' : 'text-card-purple',
        bghovertext: 'hover:text-card-purple-hover',
      };
    default:
    case PlanetColour.GREY:
      return {
        bg: isSelected ? 'bg-card-grey-hover' : 'bg-card-grey',
        bghover: 'hover:bg-card-grey-hover',
        text: 'text-card-grey-text',
        bgtext: isSelected ? 'text-card-grey-hover' : 'text-card-grey',
        bghovertext: 'hover:text-card-grey-hover',
      };
  }
};

export default themeFrom;
