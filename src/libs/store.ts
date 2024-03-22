import { configureStore } from '@reduxjs/toolkit'

import productsSlice from './store/listProductsSlice';
import usersSlice from './store/usersSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      productsSlice,
      user: usersSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
