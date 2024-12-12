import { Pagination } from '@mui/material';
import { getSessionProducts } from '@redux/sessionSlice/asyncAction';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PaginationTable = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const currentSessionId = useSelector((state) => state.session.sessionId);
  const paginationCount = useSelector((state) => state.session.total);

  const paginateHandler = async (page) => {
    setCurrentPage(page);
    dispatch(
      await getSessionProducts({
        limit: 20,
        offset: page * 20 - 20,
        sessionId: currentSessionId,
      })
    );
  };
  return (
    <Pagination
      count={Math.ceil(paginationCount / 20)}
      page={currentPage}
      variant="outlined"
      shape="rounded"
      color="primary"
      boundaryCount={0}
      onChange={(_, value) => {
        paginateHandler(value);
      }}
      sx={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
      }}
    />
  );
};

export default PaginationTable;
