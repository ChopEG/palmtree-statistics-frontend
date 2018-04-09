import * as PropTypes from 'prop-types';

// Prop Types
export type TPassedProps = {
    channel: any;
    user: {
        id: string,
        nickname: string,
    }
};

export type TMapStateToProps = {
    messages: Array<any>;
    writeMessage: string;
};
export type TComponentSate = TMapStateToProps & {};

export type TDispatchToPropsParams = {
    getAllMessagesFromChannel: (data: any) => any;
    receiveNewMessage: (data: any) => any;
};

export type TProps = TComponentSate & TDispatchToPropsParams & TPassedProps;

// PropTypes dynamic check

export const dynamicPropTypes = {
    channel: PropTypes.any,
    user: PropTypes.any,
    getAllMessagesFromChannel: PropTypes.func
};