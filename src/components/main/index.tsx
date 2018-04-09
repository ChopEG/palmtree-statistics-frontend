import * as React from 'react';
import { connect } from 'react-redux';
import {
    Input, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    // InputGroup,
    Nav, NavItem, NavLink, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, FormText
} from 'reactstrap';
import socketService from '../../services/socket.service';
import { createChannel, onChangeName, getAllChannels, userConnectToChatEcho, userDisconnectFromChatEcho, getNewName, getUsersOnline, addUsersOnline, addUsersOffline } from './action';
import * as Selectors from './selectors';
import ChannelPage from './../chat';
import { Component } from 'react';
import {
    dynamicPropTypes,
    TComponentSate,
    TDispatchToPropsParams,
    TMapStateToProps,
    TPassedProps,
    TProps
} from './own_props';

class MainPage extends Component<TProps, TComponentSate> {

    static propTypes = dynamicPropTypes;

    socket: any;

    protected socketListeners: Array<{event: string, callback: (data: any) => any}> = [
        {
            event: socketService.CHANNEL_CREATED,
            callback: (data: any) => {
                this.props.createChannel(data);
            }
        },
        {
            event: socketService.GET_ALL_CHANNELS_ANSWER,
            callback: (data: any) => {
                this.props.getAllChannels(data);
            }
        },
        {
            event: socketService.USER_CONNECT_TO_CHAT_ECHO,
            callback: (data: any) => {
                this.props.userConnectToChatEcho(data);
            }
        },
        {
            event: socketService.USER_DISCONNECT_FROM_CHAT_ECHO,
            callback: (data: any) => {
                this.props.userDisconnectFromChatEcho(data);
            }
        },
        {
            event: socketService.USER_SET_NEW_NAME_ANSWER,
            callback: (data: any) => {
                this.props.getNewName(data);
            }
        },
        {
            event: socketService.USERS_ONLINE_ANSWER,
            callback: (data: any) => {
                this.props.getUsersOnline(data);
            }
        },
        {
            event: socketService.USER_ONLINE_ECHO,
            callback: (data: any) => {
                this.props.addUsersOnline(data);
            }
        },
        {
            event: socketService.USER_OFFLINE_ECHO,
            callback: (data: any) => {
                this.props.addUsersOffline(data);
            }
        },
    ];

    constructor(props: TProps) {
        super(props);

        this.state = {
            ...this.state,
            newChannelName: '',
            user: props.user,
            dropdownOpen: false,
            newName: this.props.user.nickname,
            chats: [],
            currentChannel: null,
            modalProfile: false,
            modalCreateChannel: false
        };

        // this.handleChange = this.handleChange.bind(this);
        //
        // this.toggle = this.toggle.bind(this);
        // this.toggleModalProfile = this.toggleModalProfile.bind(this);
        // this.toggleModalCreateChannel = this.toggleModalCreateChannel.bind(this);
        // this.filterChannels = this.filterChannels.bind(this);
    }

    initSocketConnect = (): void => {
        // get socket
        this.socket = socketService.getSocketConnection(this.state.user);

        // subscribe on events
        this.socketListeners.map( (e: {event: string, callback: (data: any) => any}) => this.socket.on(e.event, e.callback) );

        // init requests
        this.socket.emit(socketService.GET_ALL_CHANNELS);
    }

    protected unInitSocketConnect = (): void => {
        // subscribe on "get all messages from channel" events
        this.socketListeners.map( (e: {event: string, callback: (data: any) => any}) => this.socket.removeListener(e.event, e.callback) );
    }

    createNewChannel = (event: any): void => {
        this.socket.emit(socketService.CHANNEL_CREATE, {
            name: this.state.newChannelName
        });

        this.setState({
            newChannelName: ''
        });
        // console.log(this.props);
        event.preventDefault();
        this.toggleModalCreateChannel();
        // return;
    }

    componentDidMount() {
        this.initSocketConnect();
    }

    componentWillUnmount() {
        this.unInitSocketConnect();
    }

    // onChangeName = ({target: {value}}: any): void => {
    //     this.setState({user: {...this.state.user, nickname: value}});
    //     this.props.onChangeName(value);
    // }

    setNewChannel = ({target}: any): void => {
        this.setState({
            newChannelName: target.value
        });
    }

    setNewName = ({target}: any): void => {
        this.setState({
            newName: target.value
        });
    }

    applyNewName = (): void => {
        this.setState({currentChannel: null});
        this.socket.emit(socketService.USER_SET_NEW_NAME, {nickname: this.state.newName});
    }

    toggle = (): void => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleModalProfile = (): void => {
        this.setState({
            modalProfile: !this.state.modalProfile
        });
    }

    toggleModalCreateChannel = (): void => {
        this.setState({
            modalCreateChannel: !this.state.modalCreateChannel
        });
    }

    pickChannel = ({target}: any): void => {
        let id = target.getAttribute('current-chat-id');
        let channel = this.props.chats.find(chat => (chat.id.toString() === id.toString()));
        if ( this.state.currentChannel ) {
            this.socket.emit(socketService.USER_DISCONNECT_FROM_CHAT, {chat_id: this.state.currentChannel.id});
        }
        this.setState({currentChannel: (channel) ? channel : null});
        if ( channel ) {
            this.socket.emit(socketService.USER_CONNECT_TO_CHAT, {chat_id: channel.id} );
        }
    }

    filterChannels = ({target}: any): void => {
        this.props.chats.forEach((e) => {
            e.show = e.name.toLowerCase().indexOf(target.value.toLowerCase()) > -1;
        });
        this.setState({chats: this.props.chats});
    }

    render() {
        // const store = this.props;
        return (
            <div className={'main_container d-flex flex-row grow-1'}>
                <Modal isOpen={this.state.modalProfile} toggle={this.toggleModalProfile}>
                    <ModalHeader toggle={this.toggleModalProfile}>Profile</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.applyNewName}>
                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input type="text" name="nickname" id="nickname" defaultValue={this.state.newName} onChange={this.setNewName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email"/>
                                <FormText color="muted">
                                    Enter email address for user gravatar image
                                </FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e: any) => { this.applyNewName(); return this.toggleModalProfile(); }} >Save</Button>
                        {/*<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>*/}
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalCreateChannel} toggle={this.toggleModalCreateChannel}>
                    <ModalHeader toggle={this.toggleModalCreateChannel}>Create new channel</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="cname">Channel name</Label>
                                <Input type="text" name="cname" defaultValue={this.state.newChannelName} onChange={this.setNewChannel}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createNewChannel}>Create</Button>
                    </ModalFooter>
                </Modal>

                <div className={'channels_list_container d-flex position-relative flex-column'}>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className={'m-3'}>
                        <DropdownToggle caret={true} className={'btn-block'}>
                            {this.props.user.nickname}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header={true}>Set a status</DropdownItem>
                            <DropdownItem>On Line</DropdownItem>
                            <DropdownItem>Off Line</DropdownItem>
                            <DropdownItem divider={true}/>
                            <DropdownItem onClick={this.toggleModalProfile}>Profile</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    {/*<InputGroup className={'m-3'}>*/}
                    <Input placeholder="search" className={'search m-3'} onChange={this.filterChannels}/>
                    {/*</InputGroup>*/}

                        <Nav vertical={true} className={'mb-3 mt-2'}>
                            <NavItem>
                                <NavLink className={'d-flex justify-content-between align-items-center'} tag={'span'}>
                                    <span>Channels</span>
                                    <Button className={'add-channel'} outline={true} size={'sm'} onClick={this.toggleModalCreateChannel}>+</Button>
                                </NavLink>
                            </NavItem>
                            {
                                this.props.chats.filter((chat) => !chat.isDirected && (chat.show === undefined || chat.show)).map((chat: any, num: number): any => {
                                    return (
                                        <NavItem key={'MainPage_chat_' + num} >
                                            <NavLink className={'d-flex justify-content-between align-items-center'} current-chat-id={chat.id} onClick={this.pickChannel} active={this.state.currentChannel && chat.id === this.state.currentChannel.id}>
                                                # {chat.name} <Badge pill={true}>
                                                {
                                                    (chat && chat.users) ? chat.users.length : '0'
                                                }
                                            </Badge>
                                            </NavLink>
                                        </NavItem>
                                    );
                                })
                            }
                        </Nav>

                        <Nav vertical={true} className={'mb-3 mt-2'}>
                            <NavLink className={'d-flex justify-content-between align-items-center'} tag={'span'}>
                                <span>Direct Message</span>
                            </NavLink>
                            {
                                this.props.chats.filter((chat) => chat.isDirected && (chat.show === undefined || chat.show)).map((chat: any, num: number): any => {
                                    return (
                                        <NavItem key={'MainPage_chat_' + num}>
                                            <NavLink className={'d-flex justify-content-between align-items-center'} current-chat-id={chat.id} onClick={this.pickChannel}>
                                                * {chat.name} <Badge pill={true}>
                                                {
                                                    (chat && chat.users) ? chat.users.length : '0'
                                                }
                                            </Badge>
                                            </NavLink>
                                        </NavItem>
                                    );
                                })
                            }
                        </Nav>

                        <Nav vertical={true} className={'mb-3 mt-2'}>
                            <NavLink className={'d-flex justify-content-between align-items-center'} tag={'span'}>
                                <span>Users Online</span>
                            </NavLink>
                            {
                                this.props.usersOnline.map((user: any, num: number): any => {
                                    return (
                                        <NavItem key={'MainPage_OnlineUser_' + num}>
                                            <NavLink className={'d-flex justify-content-between align-items-center'} current-chat-id={user.id} onClick={this.pickChannel}>
                                                -> {user.nickname}
                                            </NavLink>
                                        </NavItem>
                                    );
                                })
                            }
                        </Nav>
                </div>
                <div className={'chat_container d-flex position-relative flex-column'}>
                    {
                        this.state.currentChannel && this.state.user
                        && <ChannelPage channel={this.state.currentChannel} user={this.state.user}/>
                    }
                </div>
            </div>
        );
    }
}

export default connect<TMapStateToProps, TDispatchToPropsParams, TPassedProps>(
    (state) => ({
        user: Selectors.user(state),
        usersOnline: Selectors.usersOnline(state),
        chats: Selectors.chats(state),
    }),
    {
        onChangeName,
        createChannel,
        getAllChannels,
        userConnectToChatEcho,
        userDisconnectFromChatEcho,
        getNewName,
        getUsersOnline,
        addUsersOnline,
        addUsersOffline,
    })
(MainPage);