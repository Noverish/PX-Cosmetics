import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'src/models';

const clickedProduct = createSlice({
  name: 'clickedProduct',
  initialState: null as Product | null,
  reducers: {
    setClickedProduct(_, action: PayloadAction<Product | null>) {
      return action.payload;
    },
  },
});

export const { setClickedProduct } = clickedProduct.actions;
export default clickedProduct.reducer;
