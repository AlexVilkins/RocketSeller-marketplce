import { Pagination } from '@mui/material';
import React from 'react';

const PaginateSessions = ({ currentPage, pagesTotal, paginateHandler }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Pagination
        count={pagesTotal}
        page={currentPage}
        size="small"
        variant="outlined"
        color="primary"
        shape="rounded"
        boundaryCount={0}
        onChange={(_, value) => {
          paginateHandler(value);
        }}
        sx={{
          '& li': {
            marginRight: '10px',
          },
        }}
      />
    </div>
  );
};

export default PaginateSessions;
