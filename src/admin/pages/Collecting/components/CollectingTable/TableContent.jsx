import { TableBody } from '@mui/material';
import PropTypes from 'prop-types';

import { setWbProductStatus } from '@redux/wbStatus/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TableRowItem from './TableRowItem';

const TableContent = ({ products, sessionId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWbProductStatus(products));
  }, [products]);

  return (
    <TableBody
      sx={{
        '& > :nth-last-of-type(1)': {
          '& > *': { border: 'none' },
        },
        // overflow: 'visible',
      }}
    >
      {products.map((item) => (
        <TableRowItem key={item.id} item={item} sessionId={sessionId} />
      ))}
    </TableBody>
  );
};

TableContent.propTypes = {
  products: PropTypes.array,
  sessionId: PropTypes.string,
};

export default TableContent;
