import React from 'react';

import { Product } from 'src/models';
import { numberWithCommas } from 'src/utils';

interface Props {
  product: Product;
}

export default ({ product }: Props) => {
  const {
    name, link, price, realPrice, rate,
  } = product;
  const priceStr = numberWithCommas(price);

  const priceElement = (realPrice && rate) ? (
    <span>
      <span style={{ textDecoration: 'line-through' }}>{`₩ ${numberWithCommas(realPrice)}`}</span>
      <span>{` → ₩ ${priceStr} (${rate}%)`}</span>
    </span>
  ) : (
    <span>{priceStr}</span>
  );

  return (
    <a className="tr" href={link} target="_blank" rel="noopener noreferrer">
      <span className="name">{name}</span>
      {priceElement}
    </a>
  );
};
