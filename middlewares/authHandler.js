import HttpError from "http-errors";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";



const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        
        return authorization.substring(7);
    } else {
        return null;
    }
}


const tokenVerify = token => jwt.verify(token, process.env.SECRET);

const authUser = async (req, res, next) => {

    const token = getTokenFrom(req);

    const decodedToken = await tokenVerify(token);

    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({username:decodedToken.username});
        user === undefined ? next(HttpError(401, { message: 'El token no es correcto' })) :
            next();
    }

}

const generateToken = id => {

    return jwt.sign({sub: id},process.env.SECRET);
  

}


export default {
    authUser,
    encryptPassword,
    generateToken
};