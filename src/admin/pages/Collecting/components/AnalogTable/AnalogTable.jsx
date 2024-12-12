import { useEffect, useState } from 'react';

import {
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

import { getAlibabaProducts } from '@api/operator/useCollectGoodsAPI';
import AnalogRow from './AnalogRow';

import styles from './Table.module.scss';

const AnalogTable = ({ itemId, weight }) => {
  const [products, setProducts] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const headerContent = [
    {
      key: 'article',
      name: 'Артикул',
      sortable: false,
      direction: 'asc',
    },
    {
      key: 'name',
      name: 'Товар',
      sortable: true,
      direction: 'asc',
    },

    {
      key: 'price',
      name: 'Цена',
      sortable: true,
      direction: 'asc',
    },
    {
      key: 'weight',
      name: 'Вес',
      sortable: true,
      direction: 'asc',
    },
    {
      key: 'link',
      name: 'Ссылка',
      sortable: true,
      direction: 'asc',
    },
    {
      key: 'status',
      name: 'Статус',
      sortable: true,
      direction: 'asc',
    },
    {
      key: 'action',
      name: 'Действие',
      sortable: false,
      direction: 'asc',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getAlibabaProducts(itemId, 10, 0);
      setPagesTotal(Math.ceil(response.total / 10));
      setProducts(response.products);
      setLoading(false);
    };
    fetchData();
  }, [itemId]);

  useEffect(() => {
    if (products.length !== 0 && weight !== undefined) {
      setProducts(
        products.map((product) => {
          return product.weight === 0 ? { ...product, weight } : product;
        })
      );
    }
  }, [weight]);

  const paginateHandler = async (page) => {
    setLoading(true);
    const response = await getAlibabaProducts(itemId, 10, page * 10 - 10);
    // console.log(response.products);

    setProducts(response.products);
    setLoading(false);
  };

  const handleFilteredProducts = (newFilteredProducts) => {
    setNoProductsFound(newFilteredProducts.length === 0);
  };

  return (
    <>
      {/* <FiltersAnalogTable
        handleInputChange={(e) => e}
        products={products} // TODO: дописать обработчик
        onFilter={handleFilteredProducts}
      /> */}
      {loading ? ( // Лоадер, пока загружаются товары
        <CircularProgress />
      ) : noProductsFound ? ( // товаров по фильтрам нет
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Товары по вашему запросу не найдены
        </div>
      ) : (
        // товары по фильтрам есть
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow className={styles.tableHead}>
              {headerContent.map((item) => (
                <TableCell
                  key={item.key}
                  align="center"
                  className={styles.tableHeadCell}
                >
                  <div>{item.name}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& > :nth-last-of-type(1)': {
                '& > *': { border: 'none' },
              },
            }}
          >
            {products.map((item) => (
              <AnalogRow key={item.id} item={item} wbItemId={itemId} />
            ))}
          </TableBody>
        </Table>
      )}
      <Pagination
        count={pagesTotal}
        variant="outlined"
        shape="rounded"
        color="primary"
        boundaryCount={0}
        onChange={(_, value) => {
          paginateHandler(value);
        }}
        sx={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '20px',
          borderBottom: '1px solid #6183a21a',
          borderTop: '1px solid #6183a21a',
        }}
      />
    </>
  );
};

export default AnalogTable;

AnalogTable.propTypes = {
  itemId: PropTypes.number,
  weight: PropTypes.number,
};
