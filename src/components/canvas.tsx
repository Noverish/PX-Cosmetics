import React, { useRef, useEffect, useCallback } from 'react';
import { Polygon, PercentCoord } from 'src/models';
import { floor2 } from 'src/utils';

function drawPolygon(ctx: CanvasRenderingContext2D, polygon: Polygon) {
  const { width } = ctx.canvas;
  const { height } = ctx.canvas;

  ctx.fillStyle = polygon.fillStyle;
  ctx.strokeStyle = polygon.strokeStyle;
  ctx.lineWidth = 2;
  ctx.beginPath();
  polygon.vertices.forEach((v, i) => {
    const realX = v.x * width / 100;
    const realY = v.y * height / 100;
    if (i === 0) {
      ctx.moveTo(realX, realY);
    } else {
      ctx.lineTo(realX, realY);
    }
  });
  ctx.closePath();

  // draw stroke inside
  ctx.save();
  ctx.clip();
  ctx.lineWidth *= 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawVertex(ctx: CanvasRenderingContext2D, vertex: PercentCoord, index: number) {
  const { width } = ctx.canvas;
  const { height } = ctx.canvas;
  const realX = vertex.x * width / 100;
  const realY = vertex.y * height / 100;

  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(index.toString(), realX, realY);
}

interface Props {
  polygons: Polygon[];
  width: number;
  height: number;
  vertices: PercentCoord[];
  onClick?: (coord: PercentCoord) => void;
}

const Canvas = ({
  polygons, width, height, onClick, vertices,
}: Props) => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      context.clearRect(0, 0, width, height);
      polygons.forEach((v) => drawPolygon(context, v));

      if (process.env.NODE_ENV === 'development') {
        vertices.forEach((v, i) => drawVertex(context, v, i));
      }
    }
  }, [width, height, polygons, vertices]);

  const onClick2 = useCallback((e) => {
    const tmp = e.currentTarget.getBoundingClientRect();
    onClick?.({
      x: floor2((e.clientX - tmp.left) / width * 100),
      y: floor2((e.clientY - tmp.top) / height * 100),
    });
  }, [onClick, width, height]);

  return (
    <canvas ref={canvasRef} width={width} height={height} onClick={onClick2} />
  );
};

export default Canvas;
