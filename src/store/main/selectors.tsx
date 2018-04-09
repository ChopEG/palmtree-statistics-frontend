import { createSelector } from 'reselect';

export const getMainState = (state: any) => state.mainStore;

export const user = createSelector(getMainState, (state) => state.user);
export const usersOnline = createSelector(getMainState, (state) => state.usersOnline);
export const chats = createSelector(getMainState, (state) => state.chats);