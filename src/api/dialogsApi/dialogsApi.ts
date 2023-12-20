/* eslint-disable @typescript-eslint/promise-function-async */
import { instance } from 'src/api';
import {
  ChatResponse,
  CreateMessageRequest,
  DialoguesResponse,
} from 'src/api/dialogsApi/dialogsApi.types';

export const dialogsApi = {
  fetchChat: (id: string) => instance.get<ChatResponse>(`/dialogues/${id}`),
  fetchDialogs: () => instance.get<DialoguesResponse>('/dialogues'),
  createMessage: (body: CreateMessageRequest) =>
    instance.post<ChatResponse>(
      `/dialogues/${body.dialogueId}/message`,
      body.message
    ),
  createDialogue: (userId: string) =>
    instance.post<ChatResponse>(`/dialogues/${userId}`),
};
