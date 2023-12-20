/* eslint-disable @typescript-eslint/promise-function-async */
import { UpdateBody, UserResponse } from 'src/api/profileApi/profileApi.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/consts';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' }),
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getUser: build.mutation<UserResponse, void>({
      query: () => '/user',
    }),
    checkUsername: build.mutation<{ isTaken: boolean }, string>({
      query: (username) => `user/check_username/${username}`,
    }),
    updateProfile: build.mutation<UserResponse, UpdateBody>({
      query: (body) => {
        const form = new FormData();
        for (const [key, value] of Object.entries(body)) {
          form.append(key, value);
        }
        return { url: '/user', method: 'PATCH', body: form };
      },
    }),
    deletePhoto: build.mutation<Record<any, unknown>, string>({
      query: (src) => ({
        url: '/user/photos',
        params: { src },
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useCheckUsernameMutation,
  useUpdateProfileMutation,
  useDeletePhotoMutation,
} = profileApi;
