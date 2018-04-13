import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as md5 from 'md5';
import {
    Form,
    InputGroup,
    Input,
    Card,
    CardHeader,
    CardFooter,
    Nav, NavItem, NavLink,
} from 'reactstrap';
import {
    dynamicPropTypes,
    TComponentSate,
    TDispatchToPropsParams,
    TMapStateToProps,
    TPassedProps,
    TProps
} from '../store/channel/types';
import * as Selectors from '../store/channel/selectors';
import SocketService from '../services/socket.service';

import { getAllMessagesFromChannel, receiveNewMessage, updateCurrentChannel } from '../store/channel/action';

class ChannelPage extends Component<TProps, TComponentSate> {

    static propTypes = dynamicPropTypes;
    protected socket: SocketService;
    protected messagesContainer: any;

    public constructor(props: TProps) {
        super(props);

        this.state = {
            ...this.state,
            writeMessage: '',
        };

        this.socket = SocketService.getInst();
        this.refreshMessages();
    }

    /**
     * Get all message from channel
     */
    protected refreshMessages = (): void => {
        this.socket.refreshMessages(this.props.channel.id);
    }

    public componentDidMount() {
        this.scrollToBottom();
    }

    /**
     * Send message to server
     * @param e
     */
    protected postMessage = (e: any): void => {
        this.socket.postMessage(
            this.props.channel.id,
            this.state.writeMessage
        );
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
        if (messagesContainer) {
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
    public componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        this.scrollToBottom();

        if (this.props.channel !== prevProps.channel) {
            this.refreshMessages();
            this.setState({writeMessage: ''});
        }
        this.props.updateCurrentChannel(this.props.channel);
    }

    /**
     * Render channel page
     * @returns {any}
     */
    public render() {
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

                                            <img className={'avatar'} src={'https://www.gravatar.com/avatar/' + (message.user.email ? md5(message.user.email) : '00000000000000000000000000000000')}/>
                                            <div className={'message_body d-flex flex-column grow-1'}>
                                                <span className={'username m-0'}>
                                                    {message.user.nickname}
                                                    <small className={'text-muted ml-2'}>{message.timePretty}</small>
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
        currentChannel: Selectors.currentChannel(state),
        writeMessage: Selectors.writeMessage(state),
    }),
    {
        getAllMessagesFromChannel,
        receiveNewMessage,
        updateCurrentChannel,
    }
)(ChannelPage);