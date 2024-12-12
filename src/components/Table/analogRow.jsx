import { DeleteForever } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { hideProductById, approveProductById } from '@api/operator/useChinaAPI';
import styles from './Table.module.scss';

const AnalogRow = React.memo(function AnalogRow({ item }) {
  const [rowStatus, setRowStatus] = useState(item.status);
  const navigate = useNavigate();

  const status = {
    CREATED: 'Созд',
    APPROVED: 'Подтвержден',
    DELETED: 'Удален',
  };

  const approveHandler = useCallback((itemId) => {
    setRowStatus('APPROVED');
    approveProductById(itemId);
  }, []);

  const hideHandler = useCallback((itemId) => {
    setRowStatus('DELETED');
    hideProductById(itemId);
  }, []);

  const handleClickRow = useCallback(() => {
    navigate('/admin/prodinfo', { state: { data: item, sourse: 'china' } });
  }, [navigate, item]);

  return (
    <React.Fragment>
      <TableRow
        sx={{ '& > *': { borderBottom: 'none' } }}
        className={`${styles[rowStatus.toLowerCase()]}`}
      >
        <Tooltip title="Посмотреть товар 1688" placement="left-start">
          <TableCell
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'red',
              },
            }}
            onClick={() => handleClickRow()}
          >
            <Avatar
              alt="Remy Sharp"
              src={item.img}
              variant="square"
              sx={{ mr: 1 }}
            />
            {/* {item} */}
          </TableCell>
        </Tooltip>
        <TableCell align="center">{item.priceInfo.origin_price}</TableCell>
        <TableCell align="center">{item.shopInfo.company_name}</TableCell>
        <TableCell align="center">{item.productUrl}</TableCell>

        <TableCell align="center">
          <span className={`${styles.status} `}>{status[rowStatus]}</span>
        </TableCell>
        <TableCell align="center" sx={{ display: 'flex' }}>
          <Tooltip title="Подтвердить">
            <IconButton onClick={() => approveHandler(item.id)}>
              <CheckCircleIcon color="success" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Не отображать">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => hideHandler(item.id)}
            >
              <DeleteForever color="red" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
});

AnalogRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priceInfo: PropTypes.shape({
      origin_price: PropTypes.number.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    productUrl: PropTypes.number.isRequired,
    shopInfo: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnalogRow;
