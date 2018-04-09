import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
    Form,
    InputGroup,
    Input,
    Card,
    CardHeader,
    CardFooter,
    // CardBody,
    Nav, NavItem, NavLink,
} from 'reactstrap';
import {
    dynamicPropTypes,
    TComponentSate,
    TDispatchToPropsParams,
    TMapStateToProps,
    TPassedProps,
    TProps
} from './own_props';
import socketService from '../../services/socket.service';
import * as Selectors from './selectors';

import { getAllMessagesFromChannel, receiveNewMessage } from './action';

class ChannelPage extends Component<TProps, TComponentSate> {

    static propTypes = dynamicPropTypes;
    protected socket: any;
    protected messagesContainer: any;

    protected socketListeners: Array<{event: string, callback: (data: any) => any}> = [
        {
            event: socketService.GET_ALL_MESSAGES_FROM_CHANNEL_ANSWER,
            callback: (data: any) => {
                this.props.getAllMessagesFromChannel(data);
                this.scrollToBottom();
            }
        },
        {
            event: socketService.POST_MESSAGE_ECHO,
            callback: (data: any) => {
                this.props.receiveNewMessage(data);
                this.scrollToBottom();
            }
        },
    ];

    constructor(props: TProps) {
        super(props);

        this.state = {
            ...this.state,
            writeMessage: '',
        };
    }

    /**
     * Get all message from channel
     */
    protected refreshMessages = (): void => {
        this.socket.emit(socketService.GET_ALL_MESSAGES_FROM_CHANNEL, {
            chat_id: this.props.channel.id
        });
    }

    /**
     * Set actions for socket event
     */
    protected initSocketConnect = (): void => {
        // get socket
        this.socket = socketService.getSocketConnection(this.props.user);

        // subscribe on "get all messages from channel" events
        this.socketListeners.map( (e: {event: string, callback: (data: any) => any}) => this.socket.on(e.event, e.callback) );

        // init requests
        this.refreshMessages();
    }

    protected unInitSocketConnect = (): void => {
        // subscribe on "get all messages from channel" events
        this.socketListeners.map( (e: {event: string, callback: (data: any) => any}) => this.socket.removeListener(e.event, e.callback) );
    }

    componentDidMount() {
        this.initSocketConnect();
    }

    componentWillUnmount() {
        this.unInitSocketConnect();
    }

    /**
     * Send message to server
     * @param e
     */
    protected postMessage = (e: any): void => {
        this.socket.emit(socketService.POST_MESSAGE, {
            chat_id: this.props.channel.id,
            message: this.state.writeMessage
        });
        this.setState({writeMessage: ''});
        e.preventDefault();
    }

    /**
     * Set message to state
     * @param {any} value
     */
    protected onMessageChange = ({target: {value}}: any): void => {
        this.setState({writeMessage: value});
    }

    /**
     * Scroll card body to bottom
     */
    protected scrollToBottom = (): void => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        if ( messagesContainer ) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    /**
     * Save massages container
     * @param el
     */
    protected refContainer = (el: any): void => {
        this.messagesContainer = el;
    }

    /**
     * Ipdate info by component update
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.channel !== prevProps.channel) {
            this.refreshMessages();
            this.setState({writeMessage: ''});
        }
    }

    /**
     * Render channel page
     * @returns {any}
     */
    render() {
        return (
            <Card className={'channel_container grow-1'}>
                <CardHeader>
                    <h5># {this.props.channel.name}</h5>
                </CardHeader>
                <div className={'card-body pl-0 pr-0'} ref={this.refContainer}>
                    <Nav vertical={true} className={'mb-3 mt-2'}>
                        {
                            this.props.messages && this.props.messages.map((message: any, num: number): any => {
                                return (
                                    <NavItem key={'message_' + num} className={'message_container mb-2'}>
                                        <NavLink className={'d-flex'}>
                                            <div className={'avatar'}>0_o</div>
                                            <div className={'message_body d-flex flex-column grow-1'}>
                                                <span className={'username m-0'}>
                                                    {message.user.nickname}
                                                    <small className={'text-muted ml-2'}>{message.timePrity}</small>
                                                </span>
                                                <span className={'message_text'}>{message.text}</span>
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                );
                            })
                        }
                    </Nav>
                </div>
                <CardFooter>
                    <Form onSubmit={this.postMessage}>
                        <InputGroup>
                            <Input placeholder={'message # ' + this.props.channel.name} value={this.state.writeMessage} onChange={this.onMessageChange}/>
                        </InputGroup>
                    </Form>
                </CardFooter>
            </Card>
        );
    }
}

export default connect<TMapStateToProps, TDispatchToPropsParams, TPassedProps>(
    (state) => ({
        messages: Selectors.messages(state),
        writeMessage: Selectors.writeMessage(state),
    }),
    {
        getAllMessagesFromChannel,
        receiveNewMessage,
    }
)(ChannelPage);