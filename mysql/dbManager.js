import mysql from 'mysql2/promise';
import {config} from '../config.js';

class MySqlManager {
    //create connection

    constructor(config){
        this.db = config.db;
    }

    async _createConnection(db){
        try {
            
            this.connection = await mysql.createConnection(db);
        } catch (error) {
            throw error;
        }
    }

    //drop connection

    async _dropConnection(){
        this.connection.end();
    }
    //query

    async query(sql, params){
        try {
            await this._createConnection(this.db);
            const [results,field,error] = await this.connection.execute(sql,params);
            if(error) throw error;
            await this._dropConnection();

            return results;

        } catch (error) {
            throw error;
        }
    }

}

export default new MySqlManager(config);