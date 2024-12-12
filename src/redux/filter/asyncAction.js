import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories } from '@user/api/table';
import { getFiltersRange } from '@user/api/table';

export const getUserCategories = createAsyncThunk(
  'filter/getUserCategories',
  async () => {
    const response = await getCategories();
    return response;
  }
);

export const getUserFiltersRange = createAsyncThunk(
  'filter/getUserFiltersRange',
  async () => {
    const response = await getFiltersRange();
    return response;
  }
);
