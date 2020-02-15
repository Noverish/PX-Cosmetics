import React, { useState, useEffect } from 'react';
import { Typography, Input, Pagination  } from 'antd';

import { Product } from 'src/models';
import { ProductList } from 'src/components';
import { MOBILE_PAGE_SIZE, DESKTOP_PAGE_SIZE } from 'src/envs';

const { Title } = Typography;
const { Search } = Input;

const App = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const PAGE_SIZE = (window.innerWidth < 769) ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/db.json`)
      .then((response) => response.json())
      .then(setProducts)
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const onChange = (page: number) => {
    setPage(page);
  }

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  }

  const filtered = products.filter(p => p.name.includes(query))
  const sliced = filtered.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);
  const total = filtered.length;

  return (
    <div>
      <Title style={{ textAlign: 'center' }}>국방부 근무지원단 PX 화장품 목록</Title>
      <Title style={{ textAlign: 'right' }} level={4}>마지막 업데이트: 2020-02-09</Title>
      <Search enterButton="Search" onChange={onQueryChange} value={query} />
      <ProductList products={sliced} />
      <Pagination onChange={onChange} current={page} total={total} pageSize={PAGE_SIZE} />
    </div>
  );
}

export default App;
