import { createSlice } from '@reduxjs/toolkit';

import { getWbProducts } from './asyncAction';

const wbSlice = createSlice({
  name: 'wbProducts',
  initialState: {
    items: [],
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
      .addCase(getWbProducts.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(getWbProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload.products;
      })
      .addCase(getWbProducts.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const wbSliceSelectors = {
  responseStatus: (state) => state.status, //TODO: использовать для отображения скелетона
  products: (state) => state.items, // TODO:  массив товаров использовать для отрисовки в таблице
};

export const { setWbProducts, deleteWbProduct } = wbSlice.actions;

export default wbSlice.reducer;
