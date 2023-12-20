import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dialogsApi } from 'src/api/dialogsApi/dialogsApi';
import { createReducersHandler } from 'src/utils';
import { StateStatus } from 'src/types';
import { IDialogue } from 'src/slices/dialogs/dialogs.types';
import { CreateMessageRequest } from 'src/api/dialogsApi/dialogsApi.types';

interface DialogsState {
  status: StateStatus;
  dialogues: IDialogue[];
}

const initialState: DialogsState = {
  status: 'idle',
  dialogues: [],
};

const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChatAsync.fulfilled, (state, { payload }) => {
      const dialogue = state.dialogues.find(
        (dialogue) => payload.dialogue._id === dialogue._id
      );
      if (dialogue === undefined) {
        state.dialogues.push(payload.dialogue);
        return;
      }
      const index = state.dialogues.indexOf(dialogue);
      state.dialogues[index] = dialogue;
    });
    builder.addCase(fetchDialoguesAsync.fulfilled, (state, { payload }) => {
      state.dialogues = payload.dialogues;
    });
    builder.addCase(createMessageAsync.fulfilled, (state, { payload }) => {
      state.dialogues = state.dialogues.map((dialogue) =>
        payload.dialogue._id === dialogue._id
          ? { ...payload.dialogue }
          : dialogue
      );
    });
    builder.addCase(createDialogueAsync.fulfilled, (state, { payload }) => {
      state.dialogues = state.dialogues.filter(
        (dialogue) => dialogue.createdAt !== null
      );
      state.dialogues.push(payload.dialogue);
    });
    createReducersHandler(builder);
  },
});

export const fetchChatAsync = createAsyncThunk(
  'dialogs/fetchChatAsync',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await dialogsApi.fetchChat(id);
      return data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
export const fetchDialoguesAsync = createAsyncThunk(
  'dialogs/fetchDialoguesAsync',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await dialogsApi.fetchDialogs();
      return data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
export const createMessageAsync = createAsyncThunk(
  'dialogs/createMessageAsync',
  async (body: CreateMessageRequest, { rejectWithValue }) => {
    try {
      const { data } = await dialogsApi.createMessage(body);
      console.log('data', data);
      return data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
export const createDialogueAsync = createAsyncThunk(
  'dialogs/createDialogueAsync',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await dialogsApi.createDialogue(userId);
      return data;
    } catch (e: any) {
      console.error(e.message);
      return rejectWithValue(e.message);
    }
  }
);
export const { reducer: dialogsReducer, actions: dialogsActions } =
  dialogsSlice;
