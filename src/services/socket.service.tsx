import * as io from 'socket.io-client';
import {
    addUsersOffline,
    addUsersOnline, createChannel,
    getAllChannels,
    getNewName, getUsersOnline,
    userConnectToChatEcho,
    userDisconnectFromChatEcho
} from '../store/main/action';
import { getAllMessagesFromChannel, receiveNewMessage } from '../store/chat/action';

class SocketService {
    public static self: any = null;
    public static _store: any = null;

    public socket: any = null;

    public readonly CHANNEL_CREATE: string = 'CHANNEL_CREATE';
    public readonly CHANNEL_CREATE_ECHO: string = 'CHANNEL_CREATE_ECHO';

    public readonly GET_ALL_CHANNELS: string = 'GET_ALL_CHANNELS';
    public readonly GET_ALL_CHANNELS_ANSWER: string = 'GET_ALL_CHANNELS_ANSWER';

    public readonly GET_ALL_MESSAGES_FROM_CHANNEL: string = 'GET_ALL_MESSAGES_FROM_CHANNEL';
    public readonly GET_ALL_MESSAGES_FROM_CHANNEL_ANSWER: string = 'GET_ALL_MESSAGES_FROM_CHANNEL_ANSWER';

    public readonly POST_MESSAGE: string = 'POST_MESSAGE';
    public readonly POST_MESSAGE_ECHO: string = 'POST_MESSAGE_ECHO';

    public readonly USER_CONNECT_TO_CHAT: string = 'USER_CONNECT_TO_CHAT';
    public readonly USER_CONNECT_TO_CHAT_ECHO: string = 'USER_CONNECT_TO_CHAT_ECHO';
    public readonly USER_DISCONNECT_FROM_CHAT: string = 'USER_DISCONNECT_FROM_CHAT';
    public readonly USER_DISCONNECT_FROM_CHAT_ECHO: string = 'USER_DISCONNECT_FROM_CHAT_ECHO';

    public readonly USER_SET_NEW_NAME: string = 'USER_SET_NEW_NAME';
    public readonly USER_SET_NEW_NAME_ANSWER: string = 'USER_SET_NEW_NAME_ANSWER';

    public readonly USERS_ONLINE_ANSWER: string = 'USERS_ONLINE_ANSWER';
    public readonly USER_ONLINE_ECHO: string = 'USER_ONLINE_ECHO';
    public readonly USER_OFFLINE_ECHO: string = 'USER_OFFLINE_ECHO';

    public static getInst() {
        if (!SocketService.self) {
            SocketService.self = new SocketService();
        }

        return SocketService.self;
    }

    protected constructor() {
    }

    public gerRandomUserId = () => ('user_' + (Math.floor(Math.random() * (1000001)) + 1000000));

    public store = (): any => {
        return SocketService._store;
    }

    public getSocketConnection = (user?: any): SocketIOClientStatic | null => {
        if (this.socket) {
            return this.socket;
        }
        if (!user) {
            user = {};
        }
        if (!user.id) {
            user.id = user.nickname || this.gerRandomUserId();
        }
        if (!user.nickname) {
            user.nickname = user.id;
        }

        this.socket = io(
            process.env.REACT_APP_WS || 'localhost:5000',
            {
                query: {
                    user: JSON.stringify(user)
                }
            }
        );

        this.socket.on(this.CHANNEL_CREATE_ECHO, (data: any) => this.store().dispatch(createChannel(data)));
        this.socket.on(this.GET_ALL_CHANNELS_ANSWER, (data: any) => this.store().dispatch(getAllChannels(data)));
        this.socket.on(this.USER_CONNECT_TO_CHAT_ECHO, (data: any) => this.store().dispatch(userConnectToChatEcho(data)));
        this.socket.on(this.USER_DISCONNECT_FROM_CHAT_ECHO, (data: any) => this.store().dispatch(userDisconnectFromChatEcho(data)));
        this.socket.on(this.USER_SET_NEW_NAME_ANSWER, (data: any) => this.store().dispatch(getNewName(data)));
        this.socket.on(this.USERS_ONLINE_ANSWER, (data: any) => this.store().dispatch(getUsersOnline(data)));
        this.socket.on(this.USER_ONLINE_ECHO, (data: any) => this.store().dispatch(addUsersOnline(data)));
        this.socket.on(this.USER_OFFLINE_ECHO, (data: any) => this.store().dispatch(addUsersOffline(data)));

        this.socket.on(this.GET_ALL_MESSAGES_FROM_CHANNEL_ANSWER, (data: any) => this.store().dispatch(getAllMessagesFromChannel(data)));
        this.socket.on(this.POST_MESSAGE_ECHO, (data: any) => this.store().dispatch(receiveNewMessage(data)));

        return this.socket;
    }

    public getAllChannels = (): void => {
        this.socket.emit(this.GET_ALL_CHANNELS);
    }

    public pickChannel(chatId: any): void {
        this.socket.emit(this.USER_CONNECT_TO_CHAT, {
            chat_id: chatId
        });
    }

    public disconnectFromChat = (id: any): void => {
        this.socket.emit(this.USER_DISCONNECT_FROM_CHAT, {
            chat_id: id
        });
    }

    public refreshMessages = (id: any): void => {
        this.socket.emit(this.GET_ALL_MESSAGES_FROM_CHANNEL, {
            chat_id: id
        });
    }

    public postMessage = (id: any, writeMessage: any): void => {
        this.socket.emit(this.POST_MESSAGE, {
            chat_id: id,
            message: writeMessage
        });
    }

    public createChannel = (name: string): void => {
        this.socket.emit(this.CHANNEL_CREATE, {
            name: name,
        });
    }

    public changeName = (name: string, email: string): void => {
        this.socket.emit(this.USER_SET_NEW_NAME, {
            nickname: name,
            email: email
        });
    }
}

export default SocketService;