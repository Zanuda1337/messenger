export interface User {
  email: string;
  username: string;
  name: string;
  surname?: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}
