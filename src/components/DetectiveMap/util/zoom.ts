// import {
//   ACTION_ZOOM,
//   MODE_IDLE,
//   MODE_ZOOMING,
//   ALIGN_CENTER,
//   ALIGN_LEFT,
//   ALIGN_RIGHT,
//   ALIGN_TOP,
//   ALIGN_BOTTOM,
//   ALIGN_COVER,
// } from '../constants';
// import { decompose, getSVGPoint, set } from './common';
// import calculateBox from '../utils/calculateBox';
import { MODE_IDLE, Value } from 'react-svg-pan-zoom';
import {
  fromObject,
  inverse,
  scale,
  transform,
  translate,
} from 'transformation-matrix';
import { ACTION_ZOOM, getSVGPoint, ValueV3 } from './common';

function set(
  value: ValueV3,
  patch: Partial<ValueV3>,
  action: string | null = null
) {
  value = Object.assign({}, value, patch, { lastAction: action });
  return Object.freeze(value);
}

export function isZoomLevelWithinBounds(value: ValueV3, scaleValue: number) {
  const lessThanScaleFactorMax =
    scaleValue < (value.scaleFactorMax ?? Infinity);
  const moreThanScaleFactorMin =
    scaleValue > (value.scaleFactorMin ?? -Infinity);

  return lessThanScaleFactorMax && moreThanScaleFactorMin;
}

export function zoomToScaleOnViewerCenter(value: Value, scaleValue: number) {
  let { viewerWidth, viewerHeight } = value;
  let SVGPoint = getSVGPoint(value, viewerWidth / 2, viewerHeight / 2);
  return zoomToScale(value, SVGPoint.x, SVGPoint.y, scaleValue);
}

export function zoomToScale(
  value: ValueV3,
  SVGPointX: number,
  SVGPointY: number,
  scaleValue: number
) {
  if (!isZoomLevelWithinBounds(value, scaleValue)) {
    if (value.scaleFactorMin == null && value.scaleFactorMax == null) {
      // Do not change translation and scale of value
      return value;
    }

    // clamp to min/max
    if (value.scaleFactorMin != null && scaleValue < value.scaleFactorMin) {
      scaleValue = value.scaleFactorMin;
    }

    if (value.scaleFactorMax != null && scaleValue > value.scaleFactorMax) {
      scaleValue = value.scaleFactorMax;
    }
  }

  const inv = inverse(fromObject(value));

  const matrix = transform(
    fromObject(value),
    translate(SVGPointX, SVGPointY),
    scale(inv.a, inv.d),
    scale(scaleValue, scaleValue),
    translate(-SVGPointX, -SVGPointY)
  );

  return set(
    value,
    {
      mode: MODE_IDLE,
      ...matrix,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    },
    ACTION_ZOOM
  );
}
