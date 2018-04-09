export const GET_ALL_MESSAGES_FROM_CHANNEL = '@chat/GET_ALL_MESSAGES_FROM_CHANNEL';
export const RECEIVE_NEW_MESSAGE = '@chat/RECEIVE_NEW_MESSAGE';

export const getAllMessagesFromChannel = (data: any) => {
    return {type: GET_ALL_MESSAGES_FROM_CHANNEL, data: data};
};

export const receiveNewMessage = (data: any) => {
    return {type: RECEIVE_NEW_MESSAGE, data: data};
};