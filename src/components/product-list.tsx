import React from 'react';

import { Product } from 'src/models';
import ProductItem from './product-item';

interface Props {
  products: Product[];
}

const renderItem = (product: Product, index: number) => (
  <ProductItem product={product} key={index} />
);

const header = (
  <div className="tr">
    <span>제품명</span>
    <span>가격</span>
  </div>
);

const ProductList = (props: Props) => {
  const { products } = props;

  const list = products.map(renderItem);

  return (
    <div className="table">
      <div className="thead">
        {header}
      </div>
      <div className="tbody">
        {list}
      </div>
    </div>
  );
};

export default ProductList;
