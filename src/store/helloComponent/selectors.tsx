import { createSelector } from 'reselect';

export const getMainState = (state: any) => state.helloComponentStore;

export const defaultState = createSelector(getMainState, (state) => state.defaultState);