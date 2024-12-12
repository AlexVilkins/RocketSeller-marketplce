import { HttpClient } from '@app/api/httpClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

const httpClient = new HttpClient();

export const getSessionInfo = createAsyncThunk(
  'session/getSessionInfo',
  async (sessionID) => {
    const response = await httpClient.authGet(`/serviceSession/${sessionID}`);
    return response.data.result;
  }
);

export const getSessionProducts = createAsyncThunk(
  'session/getSessionProducts',
  async ({ limit, offset, sessionId }) => {
    const response = await httpClient.authGet(
      `/storage/wb/session/products?limit=${limit}&offset=${offset}&serviceSessionId=${sessionId}`
    );
    return response.data.result.products;
  }
);
