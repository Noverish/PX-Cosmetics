export interface Product {
  name: string;
  price: number;
  section: number;
  area: PercentCoord[];
  realPrice?: number;
  rate?: number;
  link: string;
}

export interface ProductDAO {
  name: string;
  price: number;
  section: number;
  area: number[];
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

export type Polygon = {
  vertices: PercentCoord[],
  fillStyle: string,
  strokeStyle: string,
};

export type SwiperSize = {
  width: number;
  height: number;
};
