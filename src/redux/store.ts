
import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';


const store = configureStore({
    reducer: {
        filter: filterSlice,
        itemsInCart: cartSlice,
        items: pizzasSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;