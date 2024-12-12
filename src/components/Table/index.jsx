import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import emptyState from '@assets/table/emptyState.svg';
import sortImg from '@assets/table/sort.svg';
import Row from './mainRow';
import styles from './Table.module.scss';

const CollapsibleTable = React.memo(function CollapsibleTable({
  search,
  currentPage,
  handlePageChange,
  products,
  categoryState,
}) {
  const totalPages = useSelector((state) => state.wbProducts.totalPages);
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: 'asc',
  });

  const filterData = useMemo(() => {
    return products?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filterData];
    // console.log(sortableItems);
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filterData, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.table}>
      {products.length === 0 ? (
        categoryState === 1 ? (
          <div className={styles.emptyState}>
            <img src={emptyState} alt="Empty State" />
            <p className={styles.title}>Товары не найдены</p>
            <p className={styles.text}>Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <img src={emptyState} alt="Empty State" />
            <p className={styles.title}>Вы не применили фильтры для поиска</p>
            <p className={styles.text}>
              Заполните поля фильтров, чтобы начать работу c таблицей
            </p>
          </div>
        )
      ) : (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            className={styles.container}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="collapsible table"
            >
              <TableHead>
                <TableRow className={styles.tableHead}>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('name')}
                  >
                    Товар <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('revenue')}
                  >
                    Доход <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('rating')}
                  >
                    Рейтинг <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('comments')}
                  >
                    Отзывы <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('sales')}
                  >
                    Продажи <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('revenue')}
                  >
                    Выручка <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell align="center">Динамика продаж</TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => requestSort('status')}
                  >
                    Статус <img src={sortImg} alt="sort" />
                  </TableCell>
                  <TableCell align="center">Действие</TableCell>
                </TableRow>
              </TableHead>

              <TableBody
                sx={{
                  '& > :nth-last-of-type(n)': {
                    '& > *': { borderBottom: 'none' },
                  },
                }}
              >
                {sortedData.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack className={styles.pagination}>
            <Pagination
              count={totalPages}
              shape="rounded"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      )}
    </div>
  );
});

CollapsibleTable.propTypes = {
  search: PropTypes.string,
  deleteRow: PropTypes.func,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
  products: PropTypes.array,
  categoryState: PropTypes.number,
};

export default CollapsibleTable;
