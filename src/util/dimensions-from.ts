import { MapNodeSize } from '../data/universe/types';

type Dimensions = {
  scale: number;
};

const dimensionsFrom = (size: MapNodeSize): Dimensions => {
  switch (size) {
    case MapNodeSize.XSMALL:
      return {
        scale: 0.6,
      };
    case MapNodeSize.SMALL:
      return {
        scale: 0.8,
      };
    case MapNodeSize.LARGE:
      return {
        scale: 2,
      };
    default:
    case MapNodeSize.MEDIUM:
      return {
        scale: 1,
      };
  }
};

export default dimensionsFrom;
