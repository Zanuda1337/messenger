import { User } from 'src/slices/app/app.types';
import { WithId } from 'src/types';

export interface IMessage extends WithId {
  creator: User;
  text: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface IDialogue {
  _id?: string;
  members: User[];
  createdAt: null | string;
  messages: IMessage[];
  companion: User;
}
