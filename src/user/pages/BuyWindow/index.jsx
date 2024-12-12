import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getBuyWindowProducts } from '@user/api/table';
import Empty from '@widgets/Empty';
import tableEmpty from '@widgets/assets/emptyIcons/tableEmpty.svg';
import Table from './Table';

import { Pagination } from '@mui/material';
import styles from './BuyWindow.module.scss';
import headers from './headers.json';

const BuyWindow = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async (limit, offset) => {
      try {
        const { items, total } = await getBuyWindowProducts(limit, offset);
        setItems(items);
        setTotal(total);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    getProducts(10, 0);
  }, []);

  const paginateHandler = async (value) => {
    const { items } = await getBuyWindowProducts(10, value * 10 - 10);
    setCurrentPage(value);
    setItems(items);
  };

  if (loading) {
    return;
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Мои покупки</h1>
      </header>

      {items.length === 0 ? (
        <Empty
          icon={tableEmpty}
          text="Похоже, что у нас нет купленных товаров. Для покупки перейдите к каталогу товаров."
          buttonText="Перейти к каталогу товаров"
          onClick={() => navigate('/user/main')}
        />
      ) : (
        <body>
          <h2>Товары</h2>
          <Table headers={headers} items={items} />
          <Pagination
            count={Math.ceil(total / 10)}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            color="primary"
            boundaryCount={0}
            onChange={(_, value) => {
              paginateHandler(value);
            }}
            sx={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </body>
      )}
    </div>
  );
};

export default BuyWindow;
