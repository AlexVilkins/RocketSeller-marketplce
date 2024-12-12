import { createSlice } from '@reduxjs/toolkit';

const sesionListenersSlice = createSlice({
  name: 'sessionListeners',
  initialState: {
    listeners: {},
    countListeners: 0,
  },
  reducers: {
    setSessionListener(state, action) {
      const sessionId = action.payload.sessionId;
      const newListener = setInterval(
        async () => await action.payload.listener(sessionId),
        1000
      );
      state.listeners[sessionId] = newListener;
      state.countListeners += 1;
    },
    deleteSessionListener(state, action) {
      const sessionId = action.payload;
      const deletingListener = state.listeners[sessionId];
      if (deletingListener) {
        clearInterval(deletingListener);
        delete state.listeners[sessionId];
        state.countListeners -= 1;
      }
    },
  },
});

export const { setSessionListener, deleteSessionListener } =
  sesionListenersSlice.actions;
export default sesionListenersSlice.reducer;
