import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
  StateBase,
} from 'src/types';

export const stringToColor = (
  string: string,
  // saturation = 80,
  // lightness = 63,
  minSaturation = 50,
  maxSaturation = 60,
  minLightness = 50,
  maxLightness = 63
): string => {
  let hash = 5;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 6) - hash);
    hash = hash & hash;
  }
  const saturation =
    ((maxSaturation - minSaturation) / 100) * Math.abs(hash % 100) +
    minSaturation;
  const lightness =
    ((maxLightness - minLightness) / 100) * Math.abs(hash % 100) + minLightness;
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(min, value), max);

export const toggleArray = <T>(array: T[], item: T): T[] => {
  if (array.includes(item)) {
    return array.filter((i) => i !== item);
  }
  return [...array, item];
};

export const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith('/pending');
export const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith('/rejected');
export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => action.type.endsWith('/fulfilled');

export const createReducersHandler = <T extends StateBase>(
  builder: ActionReducerMapBuilder<T>
): void => {
  builder.addMatcher(isPendingAction, (state) => {
    state.status = 'loading';
  });
  builder.addMatcher(isRejectedAction, (state) => {
    state.status = 'failed';
  });
  builder.addMatcher(isFulfilledAction, (state) => {
    state.status = 'idle';
  });
};

export const dataUrlToFile = (
  dataUrl: string,
  filename: string,
  type = 'image/jpeg'
): File => {
  const blobBin = atob(dataUrl.split(',')[1]);
  const array = [];
  for (let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], {
    type,
  });
  return new File([blob], filename, {
    type,
  });
};
