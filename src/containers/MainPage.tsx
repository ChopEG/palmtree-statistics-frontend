import * as React from 'react';
import { connect } from 'react-redux';
import {
    Input, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Nav, NavItem, NavLink, Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, FormText
} from 'reactstrap';
import SocketService from '../services/socket.service';
import {
    createChannel,
    onChangeName,
    getAllChannels,
    userConnectToChannelEcho,
    userDisconnectFromChannelEcho,
    getNewName,
    getUsersOnline,
    addUsersOnline,
    addUsersOffline
} from '../store/main/action';
import * as Selectors from '../store/main/selectors';
import ChannelPage from './ChannelPage';
import HelloComponent from './HelloComponent';
import { Component } from 'react';
import {
    dynamicPropTypes,
    TComponentSate,
    TDispatchToPropsParams,
    TMapStateToProps,
    TPassedProps,
    TProps
} from '../store/main/types';

class MainPage extends Component<TProps, TComponentSate> {

    static propTypes = dynamicPropTypes;

    private socket: SocketService;

    constructor(props: TProps) {
        super(props);

        this.state = {
            ...this.state,
            newChannelName: '',
            user: props.user,
            dropdownOpen: false,
            newName: this.props.user.nickname,
            channels: [],
            currentChannel: null,
            modalProfile: false,
            modalCreateChannel: false
        };

        this.socket = SocketService.getInst();
        this.socket.getAllChannels();
    }

    protected createNewChannel = (): void => {

        this.setState({
            newChannelName: ''
        });
        this.socket.createChannel(this.state.newChannelName);
    }

    protected setNewChannel = ({target}: any): void => {
        this.setState({
            newChannelName: target.value
        });
    }

    protected setNewName = ({target}: any): void => {
        this.setState({
            newName: target.value
        });
    }

    protected setNewEmail = ({target}: any): void => {
        this.setState({
            newEmail: target.value
        });
    }

    protected applyNewName = (): void => {
        this.setState({
            currentChannel: null
        });
        this.socket.changeName(this.state.newName, this.state.newEmail);
    }

    protected toggle = (): void => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    protected toggleModalProfile = (): void => {
        this.setState({
            modalProfile: !this.state.modalProfile
        });
    }

    protected toggleModalCreateChannel = (): void => {
        this.setState({
            modalCreateChannel: !this.state.modalCreateChannel
        });
    }

    protected pickChannel = ({target}: any): void => {

        let id = target.getAttribute('current-channel-id');
        let channelPick = this.props.channels.find(channel => (channel.id.toString() === id.toString()));

        if ( this.state.currentChannel ) {
            this.socket.disconnectFromChannel(this.state.currentChannel.id);
        }

        this.setState({
            currentChannel: (channelPick) ? channelPick : null
        });

        if (channelPick) {
            this.socket.pickChannel(channelPick.id);
        }
    }

    protected filterChannels = ({target}: any): void => {
        this.props.channels.forEach((e) => {
            e.show = e.name.toLowerCase().indexOf(target.value.toLowerCase()) > -1;
        });
        this.setState({channels: this.props.channels});
    }

    public render() {
        return (
            <div className={'main_container d-flex flex-row grow-1'}>
                <Modal isOpen={this.state.modalProfile} toggle={this.toggleModalProfile}>
                    <Form onSubmit={(e: any) => {this.applyNewName(); this.toggleModalProfile(); e.preventDefault(); }}>
                        <ModalHeader toggle={this.toggleModalProfile}>Profile</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nickname">Nickname</Label>
                                <Input type="text" name="nickname" id="nickname" defaultValue={this.state.newName} onChange={this.setNewName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" defaultValue={this.state.newEmail} onChange={this.setNewEmail}/>
                                <FormText color="muted">
                                    Enter email address for user gravatar image
                                </FormText>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <FormGroup>
                                <Button color="primary" type={'submit'}>Save</Button>
                            </FormGroup>
                        </ModalFooter>
                    </Form>
                </Modal>

                <Modal isOpen={this.state.modalCreateChannel} toggle={this.toggleModalCreateChannel}>
                    <Form onSubmit={(e: any) => { this.createNewChannel(); this.toggleModalCreateChannel(); e.preventDefault(); }}>
                        <ModalHeader toggle={this.toggleModalCreateChannel}>Create new channel</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="cname">Channel name</Label>
                                <Input type="text" name="cname" defaultValue={this.state.newChannelName} onChange={this.setNewChannel}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <FormGroup>
                                <Button color="primary" type={'submit'}>Create</Button>
                            </FormGroup>
                        </ModalFooter>
                    </Form>
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

                    <Input placeholder="search" className={'search m-3'} onChange={this.filterChannels}/>

                    <Nav vertical={true} className={'mb-3 mt-2'}>
                        <NavItem>
                            <NavLink className={'d-flex justify-content-between align-items-center'} tag={'span'}>
                                <span>Channels</span>
                                <Button className={'add-channel'} outline={true} size={'sm'} onClick={this.toggleModalCreateChannel}>+</Button>
                            </NavLink>
                        </NavItem>
                        {
                            this.props.channels.filter((channel) => !channel.isDirected && (channel.show === undefined || channel.show)).map((channel: any, num: number): any => {
                                return (
                                    <NavItem key={'MainPage_channel_' + num}>
                                        <NavLink className={'d-flex justify-content-between align-items-center'} current-channel-id={channel.id} onClick={this.pickChannel} active={this.state.currentChannel && channel && channel.id === this.state.currentChannel.id}>
                                            # {channel.name} <Badge pill={true}>
                                            {
                                                (channel && channel.users) ? channel.users.length : '0'
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
                            this.props.channels.filter((channel) => channel.isDirected && (channel.show === undefined || channel.show)).map((channel: any, num: number): any => {
                                return (
                                    <NavItem key={'MainPage_channel_' + num}>
                                        <NavLink className={'d-flex justify-content-between align-items-center'} current-channel-id={channel.id} onClick={this.pickChannel}>
                                            * {channel.name} <Badge pill={true}>
                                            {
                                                (channel && channel.users) ? channel.users.length : '0'
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
                                        <NavLink className={'d-flex justify-content-between align-items-center'} current-channel-id={user.id} onClick={this.pickChannel}>
                                            -> {user.nickname}
                                        </NavLink>
                                    </NavItem>
                                );
                            })
                        }
                    </Nav>
                </div>

                <div className={'channel_container d-flex position-relative flex-column'}>
                    {
                        (() => {
                                if ( this.state.currentChannel && this.state.user ) {
                                    return (<ChannelPage channel={this.state.currentChannel} user={this.state.user}/>);
                                } else {
                                    return ( <HelloComponent />);
                                }
                            }
                        )()
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
        channels: Selectors.channels(state),
    }),
    {
        onChangeName,
        createChannel,
        getAllChannels,
        userConnectToChannelEcho,
        userDisconnectFromChannelEcho,
        getNewName,
        getUsersOnline,
        addUsersOnline,
        addUsersOffline,
    })
(MainPage);