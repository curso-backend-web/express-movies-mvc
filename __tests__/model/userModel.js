import model from '../../models/userModel.js';
import connection from '../../mysql/dbManager.js'
import {beforeEach, expect, jest, test} from '@jest/globals';



const mockUser = {
    username: 'mock',
    password: '1234',
    role: 'user'
}

describe('userModel testing',()=>{

    const spyConnectionQuery = jest.spyOn(connection,'query');

    beforeEach(()=>{
        jest.resetAllMocks();
    })
    describe('testing register method',()=>{
        const query = 'call insert_user(?,?,?)';
        test('should invoke query method with user parameter', async ()=>{
            spyConnectionQuery.mockImplementation(()=>Promise.resolve([]));
            const result = await model.createUser(mockUser);
            // console.log(result);
            expect(spyConnectionQuery).toBeCalledWith(query,
                                                [mockUser.username,
                                                mockUser.password,
                                                mockUser.role]);
        })
        test('should return inserted user_id when a valid user is set', async ()=>{
            spyConnectionQuery.mockImplementation(()=>Promise.resolve([{insertID: 1}]));
            const  result = await model.createUser(mockUser);
           
            expect(result[0].insertID).toBe(1);
        })

        test('should throw an error with message', async ()=>{
            spyConnectionQuery.mockImplementation(()=>Promise.reject([{}]));
            try {
                await model.createUser(mockUser);

            } catch (error) {
                expect(error).toBeTruthy();
            }
        })

    })

    describe('testing login method',()=>{
        const query = 'select check_user(?,?)';
        test('should invoke query method with user parameter', async ()=>{
            spyConnectionQuery.mockImplementation(()=>Promise.resolve([]));
            await model.login(mockUser);
            // console.log(result);
            expect(spyConnectionQuery).toBeCalledWith(query,
                                                [mockUser.username,
                                                mockUser.password]);
        })
        test('should return 1 when username and password are correct', async()=>{
            spyConnectionQuery.mockImplementation(()=>Promise.resolve(1));
            const result = await model.login(mockUser);
            expect(result).toBe(1);
        })
        test('should throw an error with message', async ()=>{
            spyConnectionQuery.mockImplementation(()=>Promise.reject([{}]));
            try {
                await model.login(mockUser);

            } catch (error) {
                expect(error).toBeTruthy();
            }
        })
    })

})
