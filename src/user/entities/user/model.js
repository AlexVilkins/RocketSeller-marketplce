import { createSlice } from '@reduxjs/toolkit';

const userModelSlice = createSlice({
  name: 'userModel',
  initialState: {
    id: '',
    login: '',
    balance: 0,
  },
  reducers: {
    setCurrentSession(state, action) {
      state.sessionId = action.payload;
    },
  },
});

export const { setCurrentSession } = userModelSlice.actions;
export default userModelSlice.reducer;
