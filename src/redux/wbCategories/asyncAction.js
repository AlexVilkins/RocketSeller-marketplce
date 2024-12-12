import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@api/api';
import Cookies from 'js-cookie';

export const getWbCategories = createAsyncThunk(
  'categories/getWbCategoriesWB',
  async () => {
    const response = await api.get('/wildberries/categories', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return response.data.result.categories;
  }
);

export const addWbCategory = createAsyncThunk(
  'categories/addWbCategory',
  async ({ path, url, name }) => {
    const newCategory = {
      path: path,
      url: url,
      name: name,
    };
    const response = await api.post('/wildberries/category', newCategory, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    // console.log('id', response.data.result.id);
    await api.post(
      '/products/collectProducts',
      {
        wbProductCount: 5,
        similarProductCount: 5,
        categoryId: response.data.result.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );
    return response.data.result;
  }
);
