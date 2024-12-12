import React, { useCallback, useEffect, useState } from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Collapse, TableCell, TableRow, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import { setWeightProduct } from '@api/operator/useCollectGoodsAPI';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import AnalogTable from '../AnalogTable/AnalogTable';
import styles from './Table.module.scss';

const theme = createTheme({
  palette: {
    red: {
      main: '#e63946',
    },
  },
});

const status = {
  CREATED: 'Создан',
  APPROVED: 'Подтвержден',
  PARTIAL_APPROVED: 'Частично подтвержден',
  PARTIAL_REJECTED: 'Частично отклонен',
  REJECTED: 'Отклонен',
  DELETED: 'Удален',
};

const TableRowItem = ({ item, sessionId }) => {
  const [open, setOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [weightChange, setWeightChange] = useState();
  const [analogTableWeight, setAnalogTableWeight] = useState();

  const [rowStatus, setRowStatus] = useState('CREATED');
  const wbProductStatus = useSelector(
    (state) => state.wbStatus.items[item.id]?.status
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setRowStatus(item.status);
  }, []);

  const handleOpenPanel = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const openWeight = (e) => {
    e.stopPropagation();
    setWeightOpen(true);
  };

  const changeWeight = async (e) => {
    e.stopPropagation();
    setWeightOpen(false);

    if (weightChange !== null && weightChange.match(/^[0-9.]+$/)) {
      setAnalogTableWeight(weightChange);
      const response = await setWeightProduct(sessionId, item.id, weightChange);

      if (response.message !== 'Success') {
        enqueueSnackbar('Ошибка изменения веса!', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow className={styles.anima}>
          <TableCell align="center">{item.id}</TableCell>
          <TableCell>
            <div className={styles.avatar}>
              <img src={item.photoPath} alt="product image" />
              <p>{item.name}</p>
            </div>
          </TableCell>
          <TableCell align="center">
            <a href={item.productUrl} target="_blank">
              {item.productUrl}
            </a>
          </TableCell>
          <TableCell className={styles.statusCell}>
            <div
              className={`${styles.statusWrapper} ${
                styles[wbProductStatus?.toLowerCase() || status[rowStatus]]
              }`}
            >
              {status[wbProductStatus] || status[rowStatus]}
            </div>
          </TableCell>
          <TableCell align="center">
            <div className={styles.weightWrapper}>
              {weightOpen ? (
                <div>
                  <input
                    className={styles.weightInput}
                    type="number"
                    min="1"
                    value={weightChange}
                    onChange={(e) => setWeightChange(e.target.value)}
                  />
                  <Tooltip title="Сохранить вес">
                    <button
                      className={styles.weightButton}
                      onClick={changeWeight}
                    >
                      <CheckCircleIcon
                        style={{ color: '#6ed26e', display: 'flex' }}
                      />
                    </button>
                  </Tooltip>
                </div>
              ) : (
                <button
                  className={styles.expandButton}
                  onClick={(e) => openWeight(e)}
                >
                  Изменить вес
                </button>
              )}
            </div>
          </TableCell>
          <TableCell align="center" sx={{ width: 'max-content' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
            >
              <button
                className={styles.expandButton}
                onClick={(e) => handleOpenPanel(e)}
              >
                Товары с 1688
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              padding: 0,
              border: 'none',
            }}
            colSpan={7}
          >
            <Collapse in={open} timeout={1}>
              <AnalogTable itemId={item.id} weight={analogTableWeight} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
};

TableRowItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photoPath: PropTypes.string.isRequired,
    productUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  sessionId: PropTypes.string.isRequired,
};

export default TableRowItem;
