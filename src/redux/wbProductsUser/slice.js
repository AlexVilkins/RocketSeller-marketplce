import { createSlice } from '@reduxjs/toolkit';

import { getProducts } from './asyncAction';

const wbSlice = createSlice({
  name: 'wbProductsUser',
  initialState: {
    items: [],
    total: 0,
    status: 'loading',
  },
  reducers: {
    setWbProducts(state, action) {
      state.items = action.payload;
    },

    deleteWbProduct(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.status = 'success';
      })
      .addCase(getProducts.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const { setWbProducts, deleteWbProduct } = wbSlice.actions;

export default wbSlice.reducer;
