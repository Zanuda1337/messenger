import { User } from 'src/app/app.types';

export interface UserResponse {
  user: User;
}

export interface UpdateBody {
  name?: string;
  surname?: string;
  username?: string;
  bio?: string;
  password?: string;
  email?: string;
  photo?: File
}
