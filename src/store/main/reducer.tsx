import * as Actions from './action';
import { MainState } from './types';
import Auth from '../../services/auth.service';
import User from '../../models/User';

let savedUser: User | null = Auth.getUser();

export const initialState = {
    user: (savedUser !== null) ? savedUser : Auth.initUser(),
    channels: [],
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
            let newChannels = [...state.channels, channel];
            return {
                ...state,
                channels: newChannels
            };

        case Actions.GET_ALL_CHANNELS:
            return {
                ...state,
                channels: JSON.parse(action.data)
            };

        case Actions.USER_CONNECT_TO_CHANNEL_ECHO:
            let {user: user1, channel: dataChannel1}: any = JSON.parse(action.data);
            let channel1 = state.channels.find(ch => ch.id === dataChannel1.id);
            if (channel1 && !channel1.users.find((u: any) => u.id === user1.id)) {
                channel1.users.push(user1);
            }
            let newChannels1 = [...state.channels];
            return {
                ...state,
                channels: newChannels1
            };

        case Actions.USER_DISCONNECT_FROM_CHANNEL_ECHO:
            let {user: user2, channel: dataChannel2}: any = JSON.parse(action.data);
            let channel2 = state.channels.find(ch => ch.id === dataChannel2.id);
            if (channel2) {
                channel2.users = channel2.users.filter((u: any) => u.id !== user2.id);
            }
            let newChannels2 = [...state.channels];
            return {
                ...state,
                channels: newChannels2
            };

        case Actions.USER_SET_NEW_NAME_ANSWER:
            console.log('JSON.parse(action.data)', JSON.parse(action.data));
            let user = new User(JSON.parse(action.data));
            Auth.setUser(user);
            return {
                ...state,
                user: user
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