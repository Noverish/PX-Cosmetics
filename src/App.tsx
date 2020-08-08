import React, { useMemo, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import { Canvas } from 'src/components';
import { products, vertices } from 'src/data';
import { ProductWithCoord, Product } from 'src/models';
import { numberWithCommas } from 'src/utils';

function renderName(product: Product) {
  const { name, link } = product;

  if (link) {
    return <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>;
  }
  const href = `https://search.shopping.naver.com/search/all?query=${name}`;
  return <a href={href} rel="noopener noreferrer" target="_blank">{name}</a>;
}

function renderPrice(product: Product) {
  const { price, realPrice } = product;
  const priceStr = numberWithCommas(price);

  if (realPrice) {
    const realPriceStr = numberWithCommas(realPrice);
    const ratio = Math.floor((realPrice - price) / realPrice * 100);

    return (
      <>
        <span style={{ textDecoration: 'line-through' }}>
          ₩
          {realPriceStr}
        </span>
        {' '}
        → ₩
        {' '}
        {priceStr}
        {' '}
        (
        {ratio}
        %)
      </>
    );
  }
  return (
    <>
      ₩
      {priceStr}
    </>
  );
}

const App = () => {
  const [clickedProduct, setClickedProduct] = useState(null as ProductWithCoord | null);

  const slides = useMemo(() => [0, 1, 2, 3].map((section) => {
    const nowProducts = products.filter((v) => v.section === section);
    const nowVertices = vertices[section] || [];

    return (
      <SwiperSlide key={section} style={{ backgroundImage: `url(img/00${section}.jpg)` }}>
        <Canvas src={`img/00${section}.jpg`} vertices={nowVertices} products={nowProducts} onProductClick={setClickedProduct} />
      </SwiperSlide>
    );
  }), []);

  const onSlideChange = useCallback(() => {
    setClickedProduct(null);
  }, []);

  return (
    <>
      <h3>{clickedProduct ? renderName(clickedProduct.product) : '상품을 클릭하세요!'}</h3>
      <p>{clickedProduct ? renderPrice(clickedProduct.product) : '₩ 0'}</p>
      <Swiper
        spaceBetween={50}
        onSlideChange={onSlideChange}
      >
        {slides}
      </Swiper>
    </>
  );
};

export default App;
