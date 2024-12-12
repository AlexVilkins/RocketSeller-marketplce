import React, { useCallback, useEffect, useState } from 'react';

import check from '@assets/table/check.svg';
import deleteIcon from '@assets/table/delete.svg';

import {
  approveAlibabaProduct,
  rejectAlibabaProduct,
} from '@api/operator/useCollectGoodsAPI';
import edit from '@assets/collecting/edit.svg';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { sendUpdatedProductPrice } from '../../../../widgets/CollectingContent/api';
import { changeWbProductStatus } from '../../../../../redux/wbStatus/slice';
import styles from './Table.module.scss';

const AnalogRow = ({ item, wbItemId }) => {
  const [rowStatus, setRowStatus] = useState('CREATED');
  const [previousPrice, setPreviousPrice] = useState(item.price);
  const [price, setPrice] = useState(item.price);
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  const dispatch = useDispatch();

  const status = {
    CREATED: 'Создан',
    APPROVED: 'Подтвержден',
    REJECTED: 'Удален',
  };

  useEffect(() => {
    setRowStatus(item.status);
  }, []);

  const approveHandler = useCallback(
    (itemId) => {
      setRowStatus('APPROVED');
      approveAlibabaProduct(itemId);
      // console.log(rowStatus);

      dispatch(
        changeWbProductStatus({
          id: wbItemId,
          isApproving: true,
          prevStatus: rowStatus,
        })
      );
    },
    [rowStatus]
  );

  const hideHandler = useCallback(
    (itemId) => {
      setRowStatus('REJECTED');
      rejectAlibabaProduct(itemId);
      // console.log(rowStatus);
      dispatch(
        changeWbProductStatus({
          id: wbItemId,
          isApproving: false,
          prevStatus: rowStatus,
        })
      );
    },
    [rowStatus]
  );

  const updateItemPrice = useCallback(
    (productId, price) => {
      sendUpdatedProductPrice(productId, price);
      setIsEditing(false);
    },
    [price]
  );

  const handlePriceChange = (e) => {
    const newValue = e.target.value;

    if (/^[1-9]\d*(\.\d*)?$|^0\.\d+$/.test(newValue) || newValue === '') {
      setPrice(newValue);
      setIsValid(true);
      setShowTooltip(false);
    } else {
      setIsValid(false);
      setShowTooltip(true);
    }
  };

  const handleEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (isValid) {
          updateItemPrice(item.id, price || '1');
        }
      }
    },
    [isValid]
  );

  const handleBlur = () => {
    if (!isValid) {
      setPreviousPrice(previousPrice);
      setShowTooltip(false);
      return;
    }
    const finalPrice = price === '' ? '1' : price;
    setPrice(finalPrice);
    updateItemPrice(item.id, finalPrice);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell align="center">{item.id}</TableCell>
        <TableCell>
          <div className={styles.avatar}>
            <img src={item.img} alt="analog product image" />
            <p>{item.title}</p>
          </div>
        </TableCell>
        <TableCell align="center" style={{ position: 'relative' }}>
          {isEditing ? (
            <>
              <input
                className={`${styles.newPriceInput} ${!isValid && styles.invalid}`}
                type="text"
                value={price}
                onChange={handlePriceChange}
                onBlur={handleBlur}
                onKeyDown={handleEnter}
                autoFocus
                style={{
                  width: `${price.toString().length}ch`, // ширина инпута в зависимости от длины числа в ячейке
                }}
              />
              {showTooltip && (
                <div className={styles.editPriceTooltip}>
                  Только цифры и точка
                </div>
              )}
            </>
          ) : (
            <div
              className={styles.priceWrapper}
              onClick={() => setIsEditing(true)}
            >
              <span className={styles.priceValue}>{price}</span>
              <img className={styles.editIcon} src={edit}></img>
            </div>
          )}
        </TableCell>
        <TableCell align="center">{item.weight}</TableCell>
        <TableCell align="center">
          <a href={item.productUrl} target="_blank">
            {item.productUrl}
          </a>
        </TableCell>
        <TableCell className={styles.statusCell}>
          <div
            className={`${styles.statusWrapper} ${
              styles[rowStatus.toLowerCase()]
            }`}
          >
            {status[rowStatus]}
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
            <Tooltip title="Подтвердить">
              <IconButton onClick={() => approveHandler(item.id)}>
                <img src={check} width={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Не отображать">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => hideHandler(item.id)}
              >
                <img src={deleteIcon} width={20} />
              </IconButton>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

AnalogRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productUrl: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  wbItemId: PropTypes.number.isRequired,
};

export default AnalogRow;
