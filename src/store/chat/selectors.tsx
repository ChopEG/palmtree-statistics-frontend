import { createSelector } from 'reselect';

export const getMainState = (state: any) => state.chatStore;

export const messages = createSelector(getMainState, (state) => state.messages);
export const writeMessage = createSelector(getMainState, (state) => state.writeMessage);