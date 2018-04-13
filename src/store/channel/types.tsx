import * as PropTypes from 'prop-types';
import Channel from '../../models/Channel';
import User from '../../models/User';
import Message from '../../models/Message';

// Prop Types
export type TPassedProps = {
    channel: Channel;
    user: User
};

export type TMapStateToProps = {
    messages: Array<Message>;
    currentChannel: Channel;
    writeMessage: string;
};
export type TComponentSate = TMapStateToProps & {};

export type TDispatchToPropsParams = {
    getAllMessagesFromChannel: (data: any) => any;
    receiveNewMessage: (data: any) => any;
    updateCurrentChannel: (data: any) => any;
};

export type TProps = TComponentSate & TDispatchToPropsParams & TPassedProps;

// PropTypes dynamic check

export const dynamicPropTypes = {
    channel: PropTypes.any,
    user: PropTypes.any,
    getAllMessagesFromChannel: PropTypes.func
};

export class ChannelState {
    messages: Array<Message>;
    currentChannel: Channel;
}