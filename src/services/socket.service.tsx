import * as io from 'socket.io-client';

class SocketService {
    socket: any = null;

    readonly CHANNEL_CREATE: string = 'CHANNEL_CREATE';
    readonly CHANNEL_CREATED: string = 'CHANNEL_CREATED';

    readonly GET_ALL_CHANNELS: string = 'GET_ALL_CHANNELS';
    readonly GET_ALL_CHANNELS_ANSWER: string = 'GET_ALL_CHANNELS_ANSWER';

    readonly GET_ALL_MESSAGES_FROM_CHANNEL: string = 'GET_ALL_MESSAGES_FROM_CHANNEL';
    readonly GET_ALL_MESSAGES_FROM_CHANNEL_ANSWER: string = 'GET_ALL_MESSAGES_FROM_CHANNEL_ANSWER';

    readonly POST_MESSAGE: string = 'POST_MESSAGE';
    readonly POST_MESSAGE_ECHO: string = 'POST_MESSAGE_ECHO';

    readonly USER_CONNECT_TO_CHAT: string = 'USER_CONNECT_TO_CHAT';
    readonly USER_CONNECT_TO_CHAT_ECHO: string = 'USER_CONNECT_TO_CHAT_ECHO';
    readonly USER_DISCONNECT_FROM_CHAT: string = 'USER_DISCONNECT_FROM_CHAT';
    readonly USER_DISCONNECT_FROM_CHAT_ECHO: string = 'USER_DISCONNECT_FROM_CHAT_ECHO';

    readonly USER_SET_NEW_NAME: string = 'USER_SET_NEW_NAME';
    readonly USER_SET_NEW_NAME_ANSWER: string = 'USER_SET_NEW_NAME_ANSWER';

    readonly USERS_ONLINE_ANSWER: string = 'USERS_ONLINE_ANSWER';
    readonly USER_ONLINE_ECHO: string = 'USER_ONLINE_ECHO';
    readonly USER_OFFLINE_ECHO: string = 'USER_OFFLINE_ECHO';

    gerRandomUserId = () => ('user_' + (Math.floor(Math.random() * (1000001)) + 1000000));

    getSocketConnection = (user: any): SocketIOClientStatic|null => {
        if ( this.socket ) {
            return this.socket;
        }
        if (!user) {
            user = {};
        }
        if (!user.id) {
            user.id = user.nickname ? user.nickname : this.gerRandomUserId();
        }
        if (! user.nickname) {
            user.nickname = user.id;
        }
        this.socket = io('192.168.0.211:5000', {query: {user: JSON.stringify(user)}});
        return this.socket;
    }
}

export default new SocketService() ;