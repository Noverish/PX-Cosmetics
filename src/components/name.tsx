import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

import { RootState } from 'src/redux';

const { Title } = Typography;

const Name = () => {
  const clickedProduct = useSelector((state: RootState) => state.clickedProduct);

  let tmp;
  if (!clickedProduct) {
    tmp = <>상품을 클릭하세요!</>;
  } else {
    const { name, link } = clickedProduct;
    tmp = <a href={link} rel="noopener noreferrer" target="_blank">{name}</a>;
  }

  return (
    <Title style={{ textAlign: 'center' }} level={4}>
      {tmp}
    </Title>
  );
};

export default Name;
