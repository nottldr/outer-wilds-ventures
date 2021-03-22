import { MapNodeSize } from '../data/universe/types';

type Dimensions = {
  width: number;
  titleFontSize: string;
};

const Base = 130;

const dimensionsFrom = (size: MapNodeSize): Dimensions => {
  switch (size) {
    case MapNodeSize.XSMALL:
      return {
        width: Base * 0.6,
        titleFontSize: 'text-xs',
      };
    case MapNodeSize.SMALL:
      return {
        width: Base * 0.8,
        titleFontSize: 'text-xs',
      };
    case MapNodeSize.LARGE:
      return {
        width: Base * 2,
        titleFontSize: 'text-lg',
      };
    default:
    case MapNodeSize.MEDIUM:
      return {
        width: Base,
        titleFontSize: 'text-base',
      };
  }
};

export default dimensionsFrom;
