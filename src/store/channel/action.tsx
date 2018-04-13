export const GET_ALL_MESSAGES_FROM_CHANNEL = '@channel/GET_ALL_MESSAGES_FROM_CHANNEL';
export const RECEIVE_NEW_MESSAGE = '@channel/RECEIVE_NEW_MESSAGE';
export const UPDATE_CURRENT_CHANNEL = 'UPDATE_CURRENT_CHANNEL';

export const getAllMessagesFromChannel = (data: any) => {
    return {type: GET_ALL_MESSAGES_FROM_CHANNEL, data: data};
};

export const receiveNewMessage = (data: any) => {
    return {type: RECEIVE_NEW_MESSAGE, data: data};
};

export const updateCurrentChannel = (data: any) => {
    console.log('updateCurrentChannel', data);
    return {type: UPDATE_CURRENT_CHANNEL, data: data};
};