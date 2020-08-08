import React, { useRef, useEffect, useCallback, useState } from 'react';
import { PercentCoord, RealCoord, Product, CanvasProperty, ProductWithCoord } from 'src/models';
import { calcCanvasProperty, percentToRealCoord, realToPercentCoord, isPointInTriangle, drawArea } from 'src/utils';

interface Props {
  src: string;
  vertices: PercentCoord[];
  products: Product[];
  onProductClick(product: ProductWithCoord | null): void;
}

function drawProductArea(ctx: CanvasRenderingContext2D, realCoordVertices: RealCoord[], product: Product) {
  const vertices = product.area.map((v) => realCoordVertices[v]);
  drawArea(ctx, vertices);
}

function drawVertice(ctx: CanvasRenderingContext2D, vertices: RealCoord[]) {
  ctx.fillStyle = 'white';
  ctx.font = '24px serif';
  vertices.forEach((v, i) => {
    ctx.fillText(i.toString(), v.x, v.y);
  });
}

export default ({
  src, vertices, products, onProductClick,
}: Props) => {
  const canvasRef = useRef(null as HTMLCanvasElement | null);
  const [canvasProperty, setCanvasProperty] = useState(null as CanvasProperty | null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas?.parentElement;
    const context = canvas?.getContext('2d');

    if (canvas && canvasParent && context) {
      canvas.width = canvasParent.clientWidth;
      canvas.height = canvasParent.clientHeight;

      const img = new Image();
      img.src = src;
      img.onload = function onload() {
        const canvasProperty2 = calcCanvasProperty(canvas.width, canvas.height, img.width, img.height);

        if (process.env.NODE_ENV === 'development') {
          const realCoordinateVertices = vertices.map((v) => percentToRealCoord(canvasProperty2, v));

          products.forEach((v) => drawProductArea(context, realCoordinateVertices, v));
          drawVertice(context, realCoordinateVertices);
        }

        setCanvasProperty(canvasProperty2);
      };
    } else {
      throw new Error();
    }
  }, [src, vertices, products]);

  const onClick = useCallback((e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const tmp = e.currentTarget.getBoundingClientRect();
    const coord: RealCoord = {
      x: e.clientX - tmp.left,
      y: e.clientY - tmp.top,
    };

    if (process.env.NODE_ENV === 'development') {
      const tmp2 = realToPercentCoord(canvasProperty!, coord);
      console.log(`[${tmp2.x}, ${tmp2.y}],`);
    }

    // realCoordinateVertices
    const rcv = vertices.map((v) => percentToRealCoord(canvasProperty!, v));

    const product = products.find((v) => {
      const coordInTriangle1 = isPointInTriangle(rcv[v.area[0]], rcv[v.area[1]], rcv[v.area[2]], coord);
      const coordInTriangle2 = isPointInTriangle(rcv[v.area[2]], rcv[v.area[3]], rcv[v.area[0]], coord);
      return coordInTriangle1 || coordInTriangle2;
    });

    onProductClick((product) ? { product, x: coord.x, y: coord.y } : null);
  }, [canvasProperty, products, vertices, onProductClick]);

  return (
    <>
      <canvas ref={canvasRef} onClick={onClick} />
    </>
  );
};
