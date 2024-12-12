import { createSlice } from '@reduxjs/toolkit';

import { getWbCategories, addWbCategory } from './asyncAction';

const wbCategoriesSclice = createSlice({
  name: 'categoriesWB',
  initialState: {
    addedCategories: [],
    status: 'loading',
  },
  reducers: {
    setWbCategories(state, action) {
      state.addedCategories = action.payload;
    },

    setDeleteWbCategoty(state, action) {
      state.addedCategories = state.addedCategories.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWbCategories.pending, (state) => {
        state.status = 'loading';
        state.addedCategories = [];
      })
      .addCase(getWbCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.addedCategories = action.payload;
      })
      .addCase(getWbCategories.rejected, (state) => {
        state.status = 'error';
        state.addedCategories = [];
      })
      .addCase(addWbCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addWbCategory.fulfilled, (state, action) => {
        state.status = 'success';
        state.addedCategories = [...state.addedCategories, action.payload];
      });
  },
});

export const { setWbCategories, setDeleteWbCategoty } =
  wbCategoriesSclice.actions;
export default wbCategoriesSclice.reducer;
