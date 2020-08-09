import { createSlice } from '@reduxjs/toolkit';

const screen = createSlice({
  name: 'screen',
  initialState: { width: window.screen.width, height: window.screen.height },
  reducers: {
    setScreen() {
      return { width: window.screen.width, height: window.screen.height };
    },
  },
});

export const { setScreen } = screen.actions;
export default screen.reducer;
