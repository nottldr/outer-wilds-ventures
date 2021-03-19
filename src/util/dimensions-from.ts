import { MapNodeSize } from '../data/universe/types';

type Dimensions = {
  width: number;
  titleFontSize: string;
};

const dimensionsFrom = (size: MapNodeSize): Dimensions => {
  switch (size) {
    case MapNodeSize.XSMALL:
      return {
        width: 80,
        titleFontSize: 'text-xs',
      };
    case MapNodeSize.SMALL:
      return {
        width: 90,
        titleFontSize: 'text-xs',
      };
    case MapNodeSize.LARGE:
      return {
        width: 160,
        titleFontSize: 'text-lg',
      };
    default:
    case MapNodeSize.MEDIUM:
      return {
        width: 130,
        titleFontSize: 'text-base',
      };
  }
};

export default dimensionsFrom;
