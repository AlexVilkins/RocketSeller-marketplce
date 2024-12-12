import { createSlice } from '@reduxjs/toolkit';
import { getSessionInfo, getSessionProducts } from './asyncAction';

const STATUS_SESSION = {
  PENDING: 'pending',
  SUCCESS: 'success',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionId: '',
    name: '',
    status: '',
    isPendingSession: false,
    products: [],
    isLoadData: false,
    pagination: 0,
  },
  reducers: {
    setCurrentSession(state, action) {
      state.sessionId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionInfo.pending, (state) => {
        state.name = '';
        state.total = 0;
        state.isLoadData = false;
        state.products = [];
      })
      .addCase(getSessionInfo.fulfilled, (state, action) => {
        const sessionInfo = action.payload;
        state.sessionId = sessionInfo.id;
        state.status = sessionInfo.status;
        state.name = sessionInfo.name;
        state.total = sessionInfo.total;
        state.isPendingSession = sessionInfo.status == STATUS_SESSION.PENDING;
        state.products = [];
      })
      .addCase(getSessionProducts.pending, (state) => {
        state.isPendingSession = false;
        state.isLoadData = true;
        state.products = [];
      })
      .addCase(getSessionProducts.fulfilled, (state, action) => {
        state.isLoadData = false;
        state.products = action.payload;
      })
      .addCase(getSessionProducts.rejected, (state) => {
        state.isLoadData = false;
        state.products = [];
      });
  },
});

export const { setCurrentSession } = sessionSlice.actions;
export default sessionSlice.reducer;
