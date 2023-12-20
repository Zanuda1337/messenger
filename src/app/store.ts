import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from 'src/slices/app/app.slice';
import { dialogsReducer } from 'src/slices/dialogs/dialogs.slice';
import { authApi } from 'src/api/authApi/authApi';
import { profileApi } from 'src/api/profileApi/profileApi';

export const store = configureStore({
  reducer: {
    app: appReducer,
    dialogsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});
