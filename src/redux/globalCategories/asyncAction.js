import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@api/api';
import Cookies from 'js-cookie';

export const getGlobalCategories = createAsyncThunk(
  'categories/getGlobalCategories',
  async ({ limit, offset }) => {
    const response = await api.get(
      `/mpstats/categories?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );
    return response.data.result.categories;
  }
);
