import HttpError from "http-errors";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import authHandler from "../middlewares/authHandler.js";

// const checkUserPassword = (req,res)

// const encrypt = (password)=>{
//     const saltRounds = 10;

//     return bcrypt.hash(password, saltRounds)
// }

const register = (req, res, next) => {

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {


            // const passwordHash = await encrypt(body.password);

            const user = { username: body.username, password: body.password };

            const result = userModel.createUser(user);

            if (result < 0)
                next(HttpError(400, { message: 'No se pudo registrar' }))

            res.status(201).json(result);
        }

    } catch (error) {
        next(error);
    }



}

const login = async (req, res, next) => {

    try {
        const body = req.body;

        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {
            const user = { username: body.username, password: body.password };

            const result = userModel.getUser(user);

            if (result === undefined) {
                next(HttpError(400, { message: 'Username or Password incorrect' }));
            } else {
                await bcrypt.compare(body.password, result.password);
                //GENERAMOS EL TOKEN
                const token = authHandler.generateToken(body.username);
                res.status(200).json({ token: token });
            }
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