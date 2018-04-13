import User from './User';
import Message from './Message';

export default class Channel {
    id: number;
    name: string;
    isDirected: boolean;
    mesages: Array<Message>;
    users: Array<User>;

    show: boolean = true;
}