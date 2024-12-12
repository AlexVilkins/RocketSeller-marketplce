import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';
import { createProductWrapper } from '../ProductWrapper';
import styles from './ProductsRow.module.scss';

const ProductsRow = ({
  item,
  addToCartHandler,
  delFromCartHandler,
  openBasekt,
}) => {
  const wrappedProduct = createProductWrapper(
    item,
    addToCartHandler,
    delFromCartHandler,
    openBasekt
  );

  return (
    <TableRow className={styles.productRow}>
      {Object.keys(wrappedProduct).map((key) => (
        <TableCell
          key={key}
          align={wrappedProduct[key].align}
          style={wrappedProduct[key].style || {}}
          className={styles.productsRowCell}
        >
          {wrappedProduct[key].component()}
        </TableCell>
      ))}
    </TableRow>
  );
};

ProductsRow.propTypes = {
  addToCartHandler: PropTypes.any,
  item: PropTypes.any,
};

export default ProductsRow;
