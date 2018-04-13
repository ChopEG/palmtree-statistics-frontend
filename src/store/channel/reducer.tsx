import * as Actions from './action';
import { ChannelState } from './types';
import Channel from '../../models/Channel';

export const initialState = {
    messages: [],
    currentChannel: new Channel()
};

export default function channelReducer(state: ChannelState = initialState, action: any): ChannelState {
    console.log('Channel reducer', action.type, action, state, );
    switch (action.type) {
        case Actions.GET_ALL_MESSAGES_FROM_CHANNEL:
            return {
                ...state,
                messages: JSON.parse(action.data)
            };
        case Actions.RECEIVE_NEW_MESSAGE:
            let {channel, message} = JSON.parse(action.data);
            if (channel.id === state.currentChannel.id) {
                return {
                    ...state,
                    messages: [...state.messages, message],
                };
            } else {
                return {...state};
            }
        case Actions.UPDATE_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.data,
            };
        default:
            return {...state};
    }
}