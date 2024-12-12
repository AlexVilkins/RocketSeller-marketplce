import { createSlice } from '@reduxjs/toolkit';

import { getGlobalCategories } from './asyncAction';

const globalCategoriesSlice = createSlice({
  name: 'globalCategories',
  initialState: {
    globalCategories: [],
    status: 'loading',
  },
  reducers: {
    setGlobalCategories: (state, action) => {
      state.globalCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalCategories.pending, (state) => {
        state.status = 'loading';
        // state.globalCategories = [];
      })
      .addCase(getGlobalCategories.fulfilled, (state, action) => {
        state.globalCategories = [...state.globalCategories, ...action.payload];
        state.status = 'loaded';
      })
      .addCase(getGlobalCategories.rejected, (state) => {
        state.status = 'error';
        state.globalCategories = [];
      });
  },
});

export const { setGlobalCategories } = globalCategoriesSlice.actions;

export default globalCategoriesSlice.reducer;
