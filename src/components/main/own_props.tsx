import * as PropTypes from 'prop-types';

// Prop Types
export type TPassedProps = {
};

export type  TMapStateToProps = {
    chats: Array<any>;
    user: {
        id: string,
        nickname: string,
        email: string
    }
    usersOnline: Array<{
        id: string,
        nickname: string,
        email?: string,
    }>
};

export type TComponentSate = TMapStateToProps & {
    newChannelName: string;
    newName: string;
    dropdownOpen: boolean;
    modalProfile: boolean;
    modalCreateChannel: boolean;
    currentChannel: any;
};

export type TDispatchToPropsParams = {
    createChannel: (data: any) => any;
    onChangeName: (name: string) => any;
    getAllChannels: (data: any)  => any;
    userConnectToChatEcho: (data: any)  => any;
    userDisconnectFromChatEcho: (data: any)  => any;
    getNewName: (data: any)  => any;
    getUsersOnline: (data: any)  => any;
    addUsersOnline: (data: any)  => any;
    addUsersOffline: (data: any)  => any;
};

export type TProps = TComponentSate & TDispatchToPropsParams & TPassedProps;

// PropTypes dynamic check

export const dynamicPropTypes = {
    nickname: PropTypes.string,
    newChannelName: PropTypes.string,
    chats: PropTypes.array,
    getContents: PropTypes.func
};