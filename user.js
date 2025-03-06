// user-creditials module

    export const users = {
        "user1": "password123",
        "admin": "adminpass",
        "guest": "guestpass"
    };

    export function authenticate(username, password) {
        return users[username] && users[username] === password;
    }