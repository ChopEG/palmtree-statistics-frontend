import * as Actions from './action';
import { MainState } from './types';

let id = 'user_' + (Math.floor(Math.random() * (1000001)) + 1000000);
export const initialState = {
    advertId: 0,
    user: {
        id: id,
        nickname: id,
    },
    chats: [],
    usersOnline: []
};

export default function mainReducer(state: MainState = initialState, action: any): MainState {
    console.log('Main reducer', action, JSON.stringify(state));

    switch (action.type) {
        case Actions.CHANGE_NAME_EVENT:
            // Actions.onChangeName(name);
            return {
                ...state,
                user: {...state.user, nickname: action.newName}
            };

        case Actions.CREATE_CHANNEL_EVENT:
            let channel = JSON.parse(action.data);
            let newChats = [...state.chats, channel];
            return {
                ...state,
                chats: newChats
            };

        case Actions.GET_ALL_CHANNELS:
            return {
                ...state,
                chats: JSON.parse(action.data)
            };

        case Actions.USER_CONNECT_TO_CHAT_ECHO:
            let {user: user1, chat: chat1} = JSON.parse(action.data);
            let channel1 = state.chats.find(ch => ch.id === chat1.id);
            if (!channel1.users.find((u: any) => u.id === user1.id)) {
                channel1.users.push(user1);
            }
            let newChats1 = [...state.chats];
            return {
                ...state,
                chats: newChats1
            };

        case Actions.USER_DISCONNECT_FROM_CHAT_ECHO:
            let {user: user2, chat: chat2} = JSON.parse(action.data);
            let channel2 = state.chats.find(ch => ch.id === chat2.id);
            channel2.users = channel2.users.filter((u: any) => u.id !== user2.id);
            let newChats2 = [...state.chats];
            return {
                ...state,
                chats: newChats2
            };

        case Actions.USER_SET_NEW_NAME_ANSWER:
            console.log('JSON.parse(action.data)', JSON.parse(action.data));
            return {
                ...state,
                user: JSON.parse(action.data)
            };

        case Actions.USERS_ONLINE_ANSWER:
            return {
                ...state,
                usersOnline: JSON.parse(action.data)
            };

        case Actions.USER_ONLINE_ECHO:
            return {
                ...state,
                usersOnline: [...state.usersOnline, JSON.parse(action.data)]
            };

        case Actions.USER_OFFLINE_ECHO:
            let offlineUser = JSON.parse(action.data);
            return {
                ...state,
                usersOnline: state.usersOnline.filter(us => us.id !== offlineUser.id)
            };

        default:
            return state;
    }
}