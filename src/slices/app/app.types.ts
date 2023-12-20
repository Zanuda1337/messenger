export interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  surname?: string;
  bio?: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  photos: string[] | null;
}
