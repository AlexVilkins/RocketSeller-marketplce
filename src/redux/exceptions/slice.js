import { createSlice } from '@reduxjs/toolkit';

const exceptionSlice = createSlice({
  name: 'exception',
  initialState: {
    exception: '',
  },
  reducers: {
    setException(state, action) {
      state.exception = action.payload;
    },
  },
});

export default exceptionSlice.reducer;
