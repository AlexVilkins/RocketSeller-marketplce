import { useEffect, useState } from 'react';

import { Paper, Table, TableContainer } from '@mui/material';
import PropTypes from 'prop-types';

import sortedData from '@utils/sortedData';
import FiltersTable from './FiltersTable';
import TableContent from './TableContent';
import TableHeader from './TableHeader';

import { getSessionProducts } from '@redux/sessionSlice/asyncAction';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Table.module.scss';

const CollectingTable = ({ sessionId }) => {
  const [sortedProducts, setSortedProducts] = useState([]);

  const products = useSelector((state) => state.session.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function refreshProducts() {
      if (products.length == 0) {
        dispatch(
          await getSessionProducts({
            limit: 20,
            offset: 0,
            sessionId: sessionId,
          })
        );
      }
    }

    refreshProducts();
  }, []);

  useEffect(() => {
    setSortedProducts([...products]);
  }, [products]);

  const changeDirectionHandle = (key, direction) => {
    setSortedProducts(sortedData(products, key, direction));
  };

  const handleInputChange = (e) => {
    setSortedProducts(
      [...products].filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      {products.length > 0 && (
        <div className={styles.table}>
          <FiltersTable
            sessionId={sessionId}
            handleInputChange={(e) => handleInputChange(e)}
          />
          <TableContainer
            component={Paper}
            elevation={0}
            className={styles.container}
          >
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="collapsible table"
              style={{ overflow: 'hidden' }} //Иначе при загрузке товаров появляется полоса прокрутки и прыгает верстка
            >
              <TableHeader
                changeDirection={(key, direction) =>
                  changeDirectionHandle(key, direction)
                }
              />
              <TableContent products={products} sessionId={sessionId} />
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

CollectingTable.propTypes = {
  sessionId: PropTypes.string,
};

export default CollectingTable;
