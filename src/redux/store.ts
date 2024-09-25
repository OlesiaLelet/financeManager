import { configureStore } from '@reduxjs/toolkit';
import financeManagerReducer from './FinanceSlice';
import authorizationReducer from './AuthorizationSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


export const store = configureStore({

  reducer: {
    financeManager : financeManagerReducer,
    authorization: authorizationReducer
  },
  
})

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;