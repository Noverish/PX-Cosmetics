import React from 'react';

import { Product } from 'src/models';
import { getLinkName, numberWithCommas } from 'src/utils';

interface Props {
  product: Product;
}

export default (props: Props) => {
  const { product } = props;
  const isMobile = window.innerWidth < 768;

  const {
    id, name, amount, link,
  } = product;
  const price: string = numberWithCommas(product.price);
  const linkName: string | undefined = getLinkName(product.link);

  if (isMobile) {
    return (
      <a className="tr" href={link} target="_blank" rel="noopener noreferrer">
        <div className="first-row">
          <span>{id}</span>
          <span className="name">{name}</span>
          <span className="amount">{amount}</span>
        </div>
        <div className="second-row">
          <span>
            ₩
            {price}
          </span>
          <span className="float-right">{linkName}</span>
        </div>
      </a>
    );
  }
  return (
    <a className="tr" href={link} target="_blank" rel="noopener noreferrer">
      <span>{id}</span>
      <span className="name">{name}</span>
      <span>{amount}</span>
      <span>{price}</span>
      <span>{linkName}</span>
    </a>
  );
};
