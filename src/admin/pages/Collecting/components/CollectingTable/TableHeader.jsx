import { useState } from 'react';

import { TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

import sortImg from '@assets/table/sort.svg';
import styles from './Table.module.scss';

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
    key: 'url',
    name: 'Ссылка',
    sortable: true,
    direction: 'asc',
  },
  {
    key: 'status',
    name: 'Статус',
    sortable: false,
    direction: 'asc',
  },
  {
    key: 'fild',
    name: 'Вес',
    sortable: false,
    direction: 'asc',
  },
  {
    key: 'action',
    name: 'Действие',
    sortable: false,
    direction: 'asc',
  },
];

const TableHeader = ({ changeDirection }) => {
  const [headers, setHeaders] = useState(headerContent);

  const getNewDirection = (headItem) => {
    let direction = 'asc';

    if (headItem.direction === 'asc') {
      direction = 'desc';
    } else direction = 'asc';

    return direction;
  };

  const requestSort = (headItem) => {
    if (!headItem.sortable) {
      return;
    }

    let direction = getNewDirection(headItem);

    const updatedHeaders = headers.map((item) =>
      item.key === headItem.key ? { ...item, direction } : item
    );

    setHeaders(updatedHeaders);
    changeDirection(headItem.key, direction);
  };

  return (
    <TableHead>
      <TableRow className={styles.tableHead}>
        {headers.map((headItem) => {
          return (
            <TableCell
              key={headItem.key}
              align="center"
              sx={{ ...(headItem.sortable && { cursor: 'pointer' }) }}
              onClick={() => requestSort(headItem)}
              className={styles.tableHeadCell}
            >
              <div>
                {headItem.name}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  changeDirection: PropTypes.func,
};

export default TableHeader;
