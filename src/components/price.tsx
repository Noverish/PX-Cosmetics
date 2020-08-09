import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

import { RootState } from 'src/redux';
import { numberWithCommas } from 'src/utils';

const { Title } = Typography;

const Price = () => {
  const clickedProduct = useSelector((state: RootState) => state.clickedProduct);

  let tmp;
  if (!clickedProduct) {
    tmp = <>₩ 0</>;
  } else {
    const { price, realPrice } = clickedProduct;
    const priceStr = numberWithCommas(price);

    if (realPrice) {
      const realPriceStr = numberWithCommas(realPrice);
      const ratio = Math.floor((realPrice - price) / realPrice * 100);

      tmp = (
        <>
          <span style={{ textDecoration: 'line-through' }}>{`₩ ${realPriceStr}`}</span>
          <span>{` → ₩ ${priceStr} (${ratio}%)`}</span>
        </>
      );
    } else {
      tmp = <>{`₩ ${priceStr}`}</>;
    }
  }

  return (
    <Title style={{ textAlign: 'right' }} level={4}>
      {tmp}
    </Title>
  );
};

export default Price;
