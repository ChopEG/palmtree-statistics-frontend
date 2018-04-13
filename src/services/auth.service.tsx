import User from '../models/User';

class Auth {

    protected static user: User|null;
    protected static storageUserKey = 'savedUser';

    protected static getSavedUser(): User|null {
        let userData = localStorage.getItem(Auth.storageUserKey);
        if (!userData) {
            return null;
        }
        return new User(JSON.parse(userData));
    }

    public static getUser(): User|null {
        return Auth.user ? Auth.user : Auth.getSavedUser();
    }

    public static setUser(user: User): void {
        Auth.user = user;
        localStorage.setItem(Auth.storageUserKey, JSON.stringify(Auth.user));
    }

    public static initUser(): User {
        let user = User.getRandomUser();
        Auth.setUser(user);
        return user;
    }
}

export default Auth;