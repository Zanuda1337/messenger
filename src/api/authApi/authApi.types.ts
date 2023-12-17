export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegistrationRequest extends LoginRequest {
  confirmPassword: string;
  username: string;
}
