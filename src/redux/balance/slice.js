import { createSlice } from '@reduxjs/toolkit';
import { getBalance } from './asyncAction';

const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    balance: 0,
  },
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
  },
});

export default balanceSlice.reducer;

export const { setBalance } = balanceSlice.actions;
