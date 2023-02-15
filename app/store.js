import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../features/navSlice.js'
export const store = configureStore({
    reducer: {
        nav:navReducer
    }
});