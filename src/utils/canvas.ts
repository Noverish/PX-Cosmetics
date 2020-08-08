import { RealCoord } from 'src/models';

export function drawArea(ctx: CanvasRenderingContext2D, coords: RealCoord[]) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
  ctx.strokeStyle = 'rgba(0, 255, 255, 1)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  coords.forEach((v, i) => ((i === 0) ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)));
  ctx.closePath();

  ctx.save();
  ctx.clip();
  ctx.lineWidth *= 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
