export default class User {

    id: string;
    nickname: string;
    email: string = '';

    public static getRandomId(): string {
        return 'user_' + (Math.floor(Math.random() * (1000001)) + 1000000);
    }

    public static getRandomUser(): User {
        let id = User.getRandomId();
        return new User({id: id, nickname: id});
    }

    constructor( { id, nickname, email }: { id: string, nickname: string, email?: string }) {
        this.id = id;
        this.nickname = nickname;
        this.email = email ? email : '';
    }
}