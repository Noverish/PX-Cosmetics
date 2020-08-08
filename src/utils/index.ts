import { PercentCoord, RealCoord, CanvasProperty } from 'src/models';

export * from './canvas';

const floor2 = (n: number) => Math.floor(n * 100) / 100;

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function percentToRealCoord(canvasProperty: CanvasProperty, coord: PercentCoord): RealCoord {
  return {
    x: Math.floor(coord.x * canvasProperty.imgWidth / 100 + canvasProperty.imgLeftMargin),
    y: Math.floor(coord.y * canvasProperty.imgHeight / 100 + canvasProperty.imgTopMargin),
  };
}

export function realToPercentCoord(canvasProperty: CanvasProperty, coord: RealCoord): PercentCoord {
  return {
    x: floor2((coord.x - canvasProperty.imgLeftMargin) / canvasProperty.imgWidth * 100),
    y: floor2((coord.y - canvasProperty.imgTopMargin) / canvasProperty.imgHeight * 100),
  };
}

export function isPointInTriangle(p1: RealCoord, p2: RealCoord, p3: RealCoord, p: RealCoord) {
  const alpha = ((p2.y - p3.y) * (p.x - p3.x) + (p3.x - p2.x) * (p.y - p3.y)) / ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
  const beta = ((p3.y - p1.y) * (p.x - p3.x) + (p1.x - p3.x) * (p.y - p3.y)) / ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
  const gamma = 1 - alpha - beta;
  return (alpha > 0) && (beta > 0) && (gamma > 0);
}

export function calcCanvasProperty(canvasWidth: number, canvasHeight: number, originImgWidth: number, originImgHeight: number): CanvasProperty {
  let imgHeight; let imgWidth; let imgLeftMargin; let imgTopMargin;

  if (originImgHeight * canvasWidth > originImgWidth * canvasHeight) {
    imgHeight = canvasHeight;
    imgWidth = canvasHeight * originImgWidth / originImgHeight;
    imgLeftMargin = (canvasWidth - imgWidth) / 2;
    imgTopMargin = 0;
  } else {
    imgHeight = canvasWidth * originImgHeight / originImgWidth;
    imgWidth = canvasWidth;
    imgLeftMargin = 0;
    imgTopMargin = (canvasHeight - imgHeight) / 2;
  }

  return {
    canvasWidth,
    canvasHeight,
    imgWidth,
    imgHeight,
    imgLeftMargin,
    imgTopMargin,
  };
}
