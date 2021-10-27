// import users from '../data/users.js';
import connection from '../mysql/dbManager.js';

const spy = jest.SpyOn(connection,'query').mockImplementation(()=>Promise.resolve([{insertId: 1}]))

class User{

    login(user){
        connection.query(
            `select check_user(?,?)`,
            [user.username, user,password])
    }
    

    async createUser(user){

        try {
            const result = await connection.query(
                `call insert_user(?,?,?)`,
                [user.username,user.password,user.role] 
            )
            // users.push(user);
            // return users.find(element => element.username == user.username);
            return result;
                
        } catch (error) {
            throw error;
        }
    }
    // getUser(user){
    //     return users.find(element => (element.username == user.username))
    // }
}

export default new User();