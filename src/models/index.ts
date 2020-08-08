export interface Product {
  name: string;
  price: number;
  section: number;
  area: [number, number, number, number];
  realPrice?: number;
  link?: string;
}

export type PercentCoord = { x: number, y: number };
export type RealCoord = { x: number, y: number };
export type CanvasProperty = {
  imgWidth: number,
  imgHeight: number,
  imgLeftMargin: number,
  imgTopMargin: number,
  canvasWidth: number,
  canvasHeight: number,
};

export type ProductWithCoord = {
  product: Product;
  x: number;
  y: number;
};
