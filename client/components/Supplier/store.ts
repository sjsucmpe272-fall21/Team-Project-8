import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';


import { SupplierTypes } from '../../../shared/SupplierTypes';
import { machineReducer } from './reducer/machine';



export const store = configureStore({
  reducer: {
    machines: machineReducer
  },
});

export interface SupplierState {
  machines: SupplierTypes.Machine[];
}


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string> 
>;
