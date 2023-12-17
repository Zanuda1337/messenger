/* eslint-disable @typescript-eslint/promise-function-async */
import { instance } from 'src/api';
import {
  LoginRequest,
  RegistrationRequest,
} from 'src/api/authApi/authApi.types';

export const authApi = {
  checkEmail: (email: string) =>
    instance.get<{ isExist: boolean }>(`/auth/check_email/${email}`),
  registration: (body: RegistrationRequest) =>
    instance.post('/auth/registration', body),
  login: (body: LoginRequest) => instance.put('/auth/login', body),
  logout: () => instance.put('/auth/logout'),
};
