import {
  LoginRequest,
  RegistrationRequest,
} from 'src/api/authApi/authApi.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/consts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' }),
  endpoints: (build) => ({
    checkEmail: build.mutation<{ isExist: boolean }, string>({
      query: (email) => `/auth/check_email/${email}`,
    }),
    registration: build.mutation<Record<any, unknown>, RegistrationRequest>({
      query: (body) => ({ url: '/auth/registration', body, method: 'POST' }),
    }),
    login: build.mutation<Record<any, unknown>, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'PUT',
        body,
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    logout: build.mutation<Record<any, unknown>, void>({
      query: () => ({ url: 'auth/logout', method: 'PUT' }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCheckEmailMutation,
  useLogoutMutation,
  useRegistrationMutation,
} = authApi;
