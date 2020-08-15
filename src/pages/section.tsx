import React, {
  useMemo, useCallback, useState, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './section.scss';

import { Name, Price, Canvas } from 'src/components';
import { setClickedProduct } from 'src/redux/clicked-product';
import { PercentCoord, Product, Polygon } from 'src/models';
import { useWindowSize } from 'src/hooks';
import { coordInPolygon } from 'src/utils';
import { products, vertices } from 'src/data';
import { RootState } from 'src/redux';

interface Size {
  width: number;
  height: number;
}

function findClickedProduct(section: number, coord: PercentCoord): Product | null {
  const productsInSection = products.filter((v) => v.section === section);
  const clickedProduct = productsInSection.find((v) => coordInPolygon(v.area, coord));
  return clickedProduct || null;
}

function clickedProductToPolygon(clickedProduct: Product | null): Polygon[] {
  if (!clickedProduct) {
    return [];
  }

  return [{
    vertices: clickedProduct.area,
    fillStyle: 'transparent',
    strokeStyle: 'cyan',
  }];
}

const SectionPage = () => {
  const dispatch = useDispatch();
  const clickedProduct = useSelector((state: RootState) => state.clickedProduct);

  const section = parseInt(useParams<{ section: string }>().section);
  const windowWidth = useWindowSize()[0];
  const [size, setSize] = useState({ width: 100, height: 100 } as Size);
  const divRef = useRef(null as HTMLDivElement | null);
  const imgSrc = `${process.env.PUBLIC_URL}/img/00${section}.jpg`;

  const onCanvasClick = useCallback((coord: PercentCoord) => {
    const newClickedProduct = findClickedProduct(section, coord);
    dispatch(setClickedProduct(newClickedProduct));

    if (process.env.NODE_ENV === 'development') {
      console.log(`[${coord.x}, ${coord.y}],`);
    }
  }, [section, dispatch]);

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      const newHeight = Math.floor(div.clientWidth * 1.3333);
      setSize({ width: div.clientWidth, height: newHeight });
    }
  }, [windowWidth]);

  const polygons = useMemo(() => clickedProductToPolygon(clickedProduct), [clickedProduct]);
  const vertices2 = useMemo(() => vertices[section] || [], [section]);

  return (
    <>
      <Name />
      <Price />
      <div
        ref={divRef}
        className="section-image-div"
        style={{ backgroundImage: `url(${imgSrc})`, height: size.height }}
      >
        <Canvas polygons={polygons} onClick={onCanvasClick} width={size.width} height={size.height} vertices={vertices2} />
      </div>
    </>
  );
};

export default SectionPage;
