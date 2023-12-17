/* eslint-disable @typescript-eslint/promise-function-async */
import { instance } from 'src/api';
import { UserResponse } from 'src/api/profileApi/profileApi.types';

export const profileApi = {
  getUser: () => instance.get<UserResponse>('/user'),
  updateProfile: (form: FormData) =>
    instance.patch<UserResponse>('/user', form),
  checkUsername: (username: string) =>
    instance.get<{ isTaken: boolean }>(`user/check_username/${username}`),
  deletePhoto: (src: string) => instance.delete(`user/photos?src=${src}`),
};
