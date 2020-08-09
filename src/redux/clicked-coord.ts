import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RealCoord } from 'src/models';

const clickedCoord = createSlice({
  name: 'clickedCoord',
  initialState: null as RealCoord | null,
  reducers: {
    setClickedCoord(_, action: PayloadAction<RealCoord | null>) {
      return action.payload;
    },
  },
});

export const { setClickedCoord } = clickedCoord.actions;
export default clickedCoord.reducer;
