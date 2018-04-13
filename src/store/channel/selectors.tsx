import { createSelector } from 'reselect';

export const getMainState = (state: any) => state.channelStore;

export const messages = createSelector(getMainState, (state) => state.messages);
export const currentChannel = createSelector(getMainState, (state) => state.currentChannel);
export const writeMessage = createSelector(getMainState, (state) => state.writeMessage);