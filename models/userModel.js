import users from '../data/users.js';

class User{
    createUser(user){
        users.push(user);
        return users.find(element => element.username == user.username);
    }
    getUser(user){
        return users.find(element => (element.username == user.username))
    }
}

export default new User();