import { AsyncThunk } from '@reduxjs/toolkit';

export interface Vector2 {
  x: number;
  y: number;
}
export type Theme = 'light' | 'dark';

export interface Device {
  width: number;
  height: number;
  isMobileLayout: boolean;
}

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export interface StateBase {
  status: StateStatus;
}

export type StateStatus = 'idle' | 'loading' | 'failed';
