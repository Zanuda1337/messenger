import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'src/api/authApi/authApi';
import { LoginRequest, RegistrationRequest } from 'src/api/authApi/authApi.types';
import { StateStatus } from 'src/types';
import { createReducersHandler } from 'src/utils';
import { User } from 'src/app/app.types';

interface AppState {
  status: StateStatus;
  isLoggedIn: boolean;
  initialized: boolean;
  user: User | null;
}

const initialState: AppState = {
  status: 'idle',
  isLoggedIn: false,
  initialized: false,
  user: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(getUserAsync.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
    });
    builder.addCase(initializeAsync.fulfilled, (state) => {
      state.initialized = true;
    });
    builder.addCase(initializeAsync.rejected, (state) => {
      state.initialized = true;
    });
    createReducersHandler(builder);
  },
});

export const { reducer: appReducer, actions: appActions } = appSlice;

export const checkEmailAsync = createAsyncThunk(
  'app/checkEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      return await authApi.checkEmail(email);
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
export const registrationAsync = createAsyncThunk(
  'app/registrationAsync',
  async (body: RegistrationRequest, { dispatch, rejectWithValue }) => {
    try {
      await authApi.registration(body);
      return await dispatch(getUserAsync()).unwrap();
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
export const loginAsync = createAsyncThunk(
  'app/loginAsync',
  async (body: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      await authApi.login(body);
      return await dispatch(getUserAsync()).unwrap();
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'app/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.logout();
      return data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  'app/getUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.getUser();
      return data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const initializeAsync = createAsyncThunk(
  'app/initialize',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const requests = [dispatch(getUserAsync())];
      await Promise.allSettled(requests);
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
