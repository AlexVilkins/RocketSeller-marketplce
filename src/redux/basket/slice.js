import { createSlice } from '@reduxjs/toolkit';
import { addItem, buyItem, delItem, getItems } from './asyncAction';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basketItems: [],
    basketTotal: 0,
    basketStatus: 'loading',
  },
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    // },
    // removeItem(state, action) {
    //   state.items = state.items.filter((item) => item !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.basketStatus = 'loading';
        state.basketItems = [];
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.basketStatus = 'success';
        state.basketItems = action.payload.items;
        state.basketTotal = action.payload.total;
      })
      .addCase(getItems.rejected, (state) => {
        state.basketStatus = 'error';
        state.basketItems = [];
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.basketItems.push(action.payload);
        state.basketTotal += 1;
      })
      .addCase(delItem.fulfilled, (state, action) => {
        const idsToRemove = action.payload.map((item) => item.id);
        state.basketItems = state.basketItems.filter(
          (item) => !idsToRemove.includes(item.id)
        );
        state.basketTotal -= action.payload.length;
      })
      .addCase(buyItem.fulfilled, (state, action) => {
        state.basketItems = state.basketItems.filter(
          (item) => !action.payload.includes(item.id)
        );
        state.basketTotal -= action.payload.length;
      });
  },
});

// export const { addItem, removeItem } = basketSlice.actions;

export default basketSlice.reducer;
