import { Curiosity, PlanetColour } from '../data/universe/types';

type LocationTheme = {
  bg: string;
  bghover: string;
  text: string;
  bgtext: string;
  bghovertext: string;
  bgborder: string;
};

const colourForCuriosity = (c: Curiosity | undefined): PlanetColour => {
  switch (c) {
    case Curiosity.QUANTUM_MOON:
      return PlanetColour.PURPLE;
    case Curiosity.SUNKEN_MODULE:
      return PlanetColour.GREEN;
    case Curiosity.VESSEL:
      return PlanetColour.RED;
    case Curiosity.TIME_LOOP:
      return PlanetColour.ORANGE;
    case Curiosity.INVISIBLE_PLANET:
      return PlanetColour.BLUE;
  }

  return PlanetColour.GREY;
};

const themeFrom = (
  curiosity: Curiosity | undefined,
  isSelected = false
): LocationTheme => {
  const colour = colourForCuriosity(curiosity);

  switch (colour) {
    case PlanetColour.GREEN:
      return {
        bg: isSelected ? 'bg-card-green-hover' : 'bg-card-green',
        bghover: 'hover:bg-card-green-hover',
        text: 'text-card-green-text',
        bgtext: isSelected ? 'text-card-green-hover' : 'text-card-green',
        bghovertext: 'hover:text-card-green-hover',
        bgborder: isSelected ? 'border-card-green-hover' : 'border-card-green',
      };
    case PlanetColour.ORANGE:
      return {
        bg: isSelected ? 'bg-card-orange-hover' : 'bg-card-orange',
        bghover: 'hover:bg-card-orange-hover',
        text: 'text-card-orange-text',
        bgtext: isSelected ? 'text-card-orange-hover' : 'text-card-orange',
        bghovertext: 'hover:text-card-orange-hover',
        bgborder: isSelected
          ? 'border-card-orange-hover'
          : 'border-card-orange',
      };
    case PlanetColour.RED:
      return {
        bg: isSelected ? 'bg-card-red-hover' : 'bg-card-red',
        bghover: 'hover:bg-card-red-hover',
        text: 'text-card-red-text',
        bgtext: isSelected ? 'text-card-red-hover' : 'text-card-red',
        bghovertext: 'hover:text-card-red-hover',
        bgborder: isSelected ? 'border-card-red-hover' : 'border-card-red',
      };
    case PlanetColour.PURPLE:
      return {
        bg: isSelected ? 'bg-card-purple-hover' : 'bg-card-purple',
        bghover: 'hover:bg-card-purple-hover',
        text: 'text-card-purple-text',
        bgtext: isSelected ? 'text-card-purple-hover' : 'text-card-purple',
        bghovertext: 'hover:text-card-purple-hover',
        bgborder: isSelected
          ? 'border-card-purple-hover'
          : 'border-card-purple',
      };
    case PlanetColour.BLUE:
      return {
        bg: isSelected ? 'bg-card-blue-hover' : 'bg-card-blue',
        bghover: 'hover:bg-card-blue-hover',
        text: 'text-card-blue-text',
        bgtext: isSelected ? 'text-card-blue-hover' : 'text-card-blue',
        bghovertext: 'hover:text-card-blue-hover',
        bgborder: isSelected ? 'border-card-blue-hover' : 'border-card-blue',
      };
    default:
    case PlanetColour.GREY:
      return {
        bg: isSelected ? 'bg-card-grey-hover' : 'bg-card-grey',
        bghover: 'hover:bg-card-grey-hover',
        text: 'text-card-grey-text',
        bgtext: isSelected ? 'text-card-grey-hover' : 'text-card-grey',
        bghovertext: 'hover:text-card-grey-hover',
        bgborder: isSelected ? 'border-card-grey-hover' : 'border-card-grey',
      };
  }
};

export default themeFrom;
