import { configureStore } from '@reduxjs/toolkit';
import financeManagerReducer from './FinanceSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({

  reducer: {
    financeManager : financeManagerReducer
  },
  
})

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;