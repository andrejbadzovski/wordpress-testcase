import { configureStore } from '@reduxjs/toolkit';
import apiConfigReducer from './features/apiConfigSlice';

export const store = configureStore({
    reducer: {
        apiConfig: apiConfigReducer,
    },
});
