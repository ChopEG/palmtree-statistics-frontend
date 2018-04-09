export const CHANGE_NAME_EVENT = 'CHANGE_NAME_EVENT';
export const CREATE_CHANNEL_EVENT = 'CREATE_CHANNEL_EVENT';
export const GET_ALL_CHANNELS = 'GET_ALL_CHANNELS';
export const USER_CONNECT_TO_CHAT_ECHO = 'USER_CONNECT_TO_CHAT_ECHO';
export const USER_DISCONNECT_FROM_CHAT_ECHO = 'USER_DISCONNECT_FROM_CHAT_ECHO';
export const USER_SET_NEW_NAME_ANSWER = 'USER_SET_NEW_NAME_ANSWER';
export const USERS_ONLINE_ANSWER = 'USERS_ONLINE_ANSWER';
export const USER_ONLINE_ECHO = 'USER_ONLINE_ECHO';
export const USER_OFFLINE_ECHO = 'USER_OFFLINE_ECHO';

export const onChangeName = (name: string): any => {
    return {type: CHANGE_NAME_EVENT, newName: name};
};

export const createChannel = (data: any): any => {
    return {type: CREATE_CHANNEL_EVENT, data: data};
};

export const getAllChannels = (data: any): any => {
    return {type: GET_ALL_CHANNELS, data: data};
};

export const userConnectToChatEcho = (data: any): any => {
    return {type: USER_CONNECT_TO_CHAT_ECHO, data: data};
};

export const userDisconnectFromChatEcho  = (data: any): any => {
    return {type: USER_DISCONNECT_FROM_CHAT_ECHO, data: data};
};

export const getNewName = (data: any): any => {
    return {type: USER_SET_NEW_NAME_ANSWER, data: data};
};

export const getUsersOnline = (data: any): any => {
    return {type: USERS_ONLINE_ANSWER, data: data};
};
export const addUsersOnline = (data: any): any => {
    return {type: USER_ONLINE_ECHO, data: data};
};
export const addUsersOffline = (data: any): any => {
    return {type: USER_OFFLINE_ECHO, data: data};
};