import HttpError from "http-errors";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import authHandler from "../middlewares/authHandler.js";

// const checkUserPassword = (req,res)

// const encrypt = (password)=>{
//     const saltRounds = 10;

//     return bcrypt.hash(password, saltRounds)
// }

const register = async (req, res, next) => {

    try {
        const user = req.body;

        if (!user.username || !user.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {

            const result = await userModel.createUser(user);
            if (!result.length)
                next(HttpError(400, { message: 'No se pudo registrar' }))

            res.status(201).json(result);
        }

    } catch (error) {
        next(HttpError(400, { message: error.message }));
    }



}

const login = async (req, res, next) => {

    try {
        const user = req.body;

        if (!user.username || !user.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {

            const result = await userModel.login(user);

            const token = await authHandler.generateToken(result.userID);
            res.status(200).json({ token: token });
        }
    }

    catch (error) {
        next(error);
    }
}

export default {
    register,
    login
}