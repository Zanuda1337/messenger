import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from 'src/app/app.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
