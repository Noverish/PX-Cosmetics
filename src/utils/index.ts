import { PercentCoord } from 'src/models';

export const floor2 = (n: number) => Math.floor(n * 100) / 100;
export const isMobile = () => window.innerWidth < 768;

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function sortCoordClockwise(coords: PercentCoord[]) {
  const { x: totalX, y: totalY } = coords.reduce((prev, curr) => ({ x: prev.x + curr.x, y: prev.y + curr.y }));
  const avgX = totalX / coords.length;
  const avgY = totalY / coords.length;

  coords.sort((lhs, rhs) => {
    const lhsAngle = Math.atan2(lhs.y - avgY, lhs.x - avgX);
    const rhsAngle = Math.atan2(rhs.y - avgY, rhs.x - avgX);

    if (lhsAngle < rhsAngle) return -1;
    if (lhsAngle > rhsAngle) return 1;
    return 0;
  });
}

export function coordInPolygon(coords: PercentCoord[], point: PercentCoord): boolean {
  let crosses = 0;
  for (let i = 0; i < coords.length; i += 1) {
    const j = (i + 1) % coords.length;

    if ((coords[i].y > point.y) !== (coords[j].y > point.y)) {
      const atX = (coords[j].x - coords[i].x) * (point.y - coords[i].y) / (coords[j].y - coords[i].y) + coords[i].x;

      if (point.x < atX) {
        crosses += 1;
      }
    }
  }
  return crosses % 2 > 0;
}

/*
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
*/
