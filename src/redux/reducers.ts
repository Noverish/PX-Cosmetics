import { combineReducers } from '@reduxjs/toolkit';

import clickedProduct from './clicked-product';
import clickedCoord from './clicked-coord';
import screen from './screen';

const rootReducer = combineReducers({
  clickedProduct,
  clickedCoord,
  screen,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
