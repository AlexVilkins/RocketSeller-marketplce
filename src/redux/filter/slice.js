import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { getUserCategories, getUserFiltersRange } from './asyncAction';
import initialState from './initialState.json';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setFilter(state, action) {
      const { key, fild, value } = action.payload;
      state.filtersList[key][fild] = value;
    },
    getFilters(state) {
      return state.filtersList;
    },
    dropFilters(state) {
      state.filtersList = initialState.filtersList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCategories.pending, (state) => {
        state.status = 'loading';
        // state.filtersList = [];
      })
      .addCase(getUserCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.filtersList.category.value = action.payload;
      })
      .addCase(getUserCategories.rejected, (state) => {
        state.filtersList = 'error';
        state.filtersList.category.value = [];
      })

      .addCase(getUserFiltersRange.fulfilled, (state, action) => {
        const filtersRange = action.payload;

        const updatedFilters = cloneDeep(state.filtersList);

        Object.keys(filtersRange).forEach((key) => {
          const newKey = key[0].toUpperCase() + key.slice(1);
          if (updatedFilters[newKey]) {
            updatedFilters[newKey] = {
              ...updatedFilters[newKey],
              value: [filtersRange[key].min, filtersRange[key].max],
              selected: [filtersRange[key].min, filtersRange[key].max],
            };
          }
        });

        state.filtersList = updatedFilters;
        state.status = 'success';
      })
      .addCase(getUserFiltersRange.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { setFilter, getFilters, dropFilters } = filterSlice.actions;

export default filterSlice.reducer;
