import * as PropTypes from 'prop-types';
import Channel from '../../models/Channel';
import User from '../../models/User';

// Prop Types
export type TPassedProps = {
};

export type  TMapStateToProps = {
    channels: Array<Channel>;
    user: User
    usersOnline: Array<User>
};

export type TComponentSate = TMapStateToProps & {
    newChannelName: string;
    newName: string;
    newEmail: string;
    dropdownOpen: boolean;
    modalProfile: boolean;
    modalCreateChannel: boolean;
    currentChannel: Channel|null;
};

export type TDispatchToPropsParams = {
    createChannel: (data: any) => any;
    onChangeName: (name: string) => any;
    getAllChannels: (data: any)  => any;
    userConnectToChannelEcho: (data: any)  => any;
    userDisconnectFromChannelEcho: (data: any)  => any;
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
    channels: PropTypes.array,
    getContents: PropTypes.func
};

export class MainState {
    user: User;
    channels: Array<Channel> = [];
    usersOnline: Array<User>;
}