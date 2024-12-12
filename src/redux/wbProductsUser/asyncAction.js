import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductsUserTable } from '@user/api/table';

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, offset, filterval }) => {
    const response = await getProductsUserTable(limit, offset, filterval);
    return response;
  }
);
