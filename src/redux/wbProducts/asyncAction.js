import { HttpClient } from '@app/api/httpClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

const httpClient = new HttpClient();

export const getWbProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ categoryName, paybackPeriod, investmentAmount }) => {
    const response = await httpClient.authGet(
      '/marketplace/products',
      {
        categoryName,
        paybackPeriod,
        investmentAmount,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log('response', response);
    return response.data.result;
  }
);
