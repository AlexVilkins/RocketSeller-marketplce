import { HttpClient } from '@app/api/httpClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

const httpClient = new HttpClient();

//временно тут до создания глобального объекта user
export const getBalance = createAsyncThunk('user/getBalance', async () => {
  const response = await httpClient.authGet(`/accounts/balance`);
  return response.data.result.amount;
});
