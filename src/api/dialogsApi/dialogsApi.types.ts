import {
  IDialogue,
  IMessage,
} from 'src/slices/dialogs/dialogs.types';

export interface ChatResponse {
  dialogue: IDialogue;
}
export interface DialoguesResponse {
  dialogues: IDialogue[];
}
export interface CreateMessageRequest {
  message: Omit<IMessage, '_id'>;
  dialogueId: string;
}
