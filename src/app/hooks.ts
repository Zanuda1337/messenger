import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { AppDispatch, BoundActions, RootState } from 'src/app/types';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';

export const useAppDispatch = (): ReturnType<typeof useDispatch<AppDispatch>> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useBoundActions = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
