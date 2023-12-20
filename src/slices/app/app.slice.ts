import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateStatus } from 'src/types';
import { User } from 'src/slices/app/app.types';

interface AppState {
  status: StateStatus;
  isLoggedIn: boolean;
  initialized: boolean;
  user: User | null;
  meta: { updating: boolean };
}

const initialState: AppState = {
  status: 'idle',
  isLoggedIn: false,
  initialized: false,
  user: null,
  meta: { updating: false },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    initialize: (state) => {
      state.initialized = true;
    },
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;
