import React, { useState, useCallback } from 'react';
import {
  Typography, Input, Pagination, Button, Dropdown, Menu,
} from 'antd';
import { Link } from 'react-router-dom';

import { products } from 'src/data';
import { MOBILE_PAGE_SIZE, DESKTOP_PAGE_SIZE, TOTAL_SECTION } from 'src/envs';
import { ProductList } from 'src/components';
import './home.scss';
import { isMobile } from 'src/utils';

const { Title } = Typography;
const { Search } = Input;

const menuItems = Array.from(Array(TOTAL_SECTION).keys()).map((v) => (
  <Menu.Item key={v}>
    <Link to={`/sections/${v}`}>
      {v + 1}
      번째 선반
    </Link>
  </Menu.Item>
));

const menu = (
  <Menu>
    {menuItems}
  </Menu>
);

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const PAGE_SIZE = (isMobile()) ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;

  const onQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  }, []);

  const filtered = products.filter((p) => p.name.includes(query));
  const sliced = filtered.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page);
  const total = filtered.length;

  return (
    <>
      <Title style={{ textAlign: 'center' }} level={2}>
        국방부 근무지원단
        <br />
        PX 화장품 목록
      </Title>
      <Title style={{ textAlign: 'right' }} level={4}>마지막 업데이트: 2020-08-10</Title>
      <div className="search-bar">
        <Search enterButton="Search" onChange={onQueryChange} value={query} />
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Button type="primary">사진으로 찾기</Button>
        </Dropdown>
      </div>
      <ProductList products={sliced} />
      <Pagination onChange={setPage} current={page} total={total} pageSize={PAGE_SIZE} size={isMobile() ? 'small' : 'default'} />
    </>
  );
};

export default HomePage;
