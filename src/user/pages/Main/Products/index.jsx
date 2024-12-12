import { Pagination, Table, TableBody } from '@mui/material';
import styles from './Products.module.scss';
import ProductsHeader from './components/ProductsHeader/ProductsHeader';
import ProductsRow from './components/ProductsRow/ProductsRow';

const ProductsTable = ({
  addToCartHandler,
  products,
  paginateHandler,
  currentPage,
  total,
  delFromCartHandler,
  openBasekt,
}) => {
  return (
    <div className={styles.tableWrapper}>
      <Table size="small">
        <ProductsHeader />
        <TableBody>
          {products.map((item) => (
            <ProductsRow
              key={item.id}
              item={item}
              addToCartHandler={addToCartHandler}
              delFromCartHandler={delFromCartHandler}
              openBasekt={openBasekt}
            />
          ))}
        </TableBody>
      </Table>

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
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '20px',
          borderBottom: '1px solid #6183a21a',
          borderTop: '1px solid #6183a21a',
        }}
      />
    </div>
  );
};

export default ProductsTable;
