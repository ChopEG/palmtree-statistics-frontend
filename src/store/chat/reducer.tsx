import * as Actions from './action';
import { ChatState } from './types';

export const initialState = {
    messages: [],
    channel: {}
};

export default function chatReducer(state: ChatState = initialState, action: any): ChatState {
    console.log('Chat reducer', action, state, );
    switch (action.type) {
        case Actions.GET_ALL_MESSAGES_FROM_CHANNEL:
            return {
                ...state,
                messages: JSON.parse(action.data)
            };
        case Actions.RECEIVE_NEW_MESSAGE:
            let { channel, message} = JSON.parse(action.data);
            if (channel.id !== state.channel.id) {
                return {
                    ...state,
                    messages: [...state.messages, message],
                };
            } else {
                return {...state};
            }
        default:
            return {...state};
    }
}