import { MapNodeSize } from '../data/universe/types';

type Dimensions = {
  width: number;
  height: number;
  titleFontSize: string;
  titleFontSizeA: string;
};

const BaseWidth = 130;
const BaseHeight = BaseWidth * 1.5;

const dimensionsFrom = (size: MapNodeSize): Dimensions => {
  switch (size) {
    case MapNodeSize.XSMALL:
      return {
        width: BaseWidth * 0.6,
        height: BaseHeight * 0.6,
        titleFontSize: 'text-xs',
        titleFontSizeA: '10px',
      };
    case MapNodeSize.SMALL:
      return {
        width: BaseWidth * 0.8,
        height: BaseHeight * 0.8,
        titleFontSize: 'text-xs',
        titleFontSizeA: '12px',
      };
    case MapNodeSize.LARGE:
      return {
        width: BaseWidth * 2,
        height: BaseHeight * 2,
        titleFontSize: 'text-lg',
        titleFontSizeA: '32px',
      };
    default:
    case MapNodeSize.MEDIUM:
      return {
        width: BaseWidth,
        height: BaseHeight,
        titleFontSize: 'text-base',
        titleFontSizeA: '16px',
      };
  }
};

export default dimensionsFrom;
