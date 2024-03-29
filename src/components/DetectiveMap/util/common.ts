import { Value } from 'react-svg-pan-zoom';
import { applyToPoint, fromObject, inverse } from 'transformation-matrix';

export type ValueV3 = Value & {
  scaleFactorMax?: number;
  scaleFactorMin?: number;
};

export const ACTION_ZOOM = 'zoom';

export function getSVGPoint(value: Value, viewerX: number, viewerY: number) {
  const matrix = fromObject(value);

  const inverseMatrix = inverse(matrix);
  return applyToPoint(inverseMatrix, { x: viewerX, y: viewerY });
}
