import { MapNodeSize } from '../data/universe/types';

type Dimensions = {
  width: number;
  height: number;
  titleFontSize: string;
  titleFontSizeA: string;
};

const BaseWidth = 110;
const BaseHeight = BaseWidth * 1.4;

const dimensionsFrom = (size: MapNodeSize): Dimensions => {
  switch (size) {
    case MapNodeSize.XSMALL:
      return {
        width: BaseWidth * 0.6,
        height: BaseHeight * 0.6,
        titleFontSize: 'text-xs',
        titleFontSizeA: '8px',
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
        titleFontSizeA: '28px',
      };
    default:
    case MapNodeSize.MEDIUM:
      return {
        width: BaseWidth,
        height: BaseHeight,
        titleFontSize: 'text-base',
        titleFontSizeA: '14px',
      };
  }
};

export default dimensionsFrom;
