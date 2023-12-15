import { User } from 'src/app/app.types';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegistrationRequest extends LoginRequest {
  confirmPassword: string;
  username: string;
}

export interface UserRequest {
  user: User;
}
