import React from 'react';

import { Product } from 'src/models';
import { numberWithCommas } from 'src/utils';

interface Props {
  product: Product;
}

export default ({ product }: Props) => {
  const { name, link } = product;
  const price = numberWithCommas(product.price);

  return (
    <a className="tr" href={link} target="_blank" rel="noopener noreferrer">
      <span className="name">{name}</span>
      <span>{price}</span>
    </a>
  );
};
