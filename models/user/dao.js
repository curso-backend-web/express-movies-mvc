// import users from '../data/users.js';
import connection from '../mysql/dbManager.js';
import User from './pojo.js';

class UserDAO{

    userPojo = new User();
    async login(user){
        try {
            const result= await connection.query(
                `select check_user(?,?)`,
                [user.username, user.password]);
            console.log(result);
            console.log(result[0][0].userID);    
            return Object.values(result[0])[0];

        } catch (error) {
            throw error;
        }
    }
    

    async createUser(user){

        try {
            const result = await connection.query(
                `call insert_user(?,?,?)`,
                [user.username,user.password,user.role] 
            )
            return result;
                
        } catch (error) {
            throw error;
        }
    }
    getUser(id){
        try {
            
            return await connection.query(this.userPojo.selectUser(),[id])
        } catch (error) {
            throw error;
        }
    }
}

export default new User();