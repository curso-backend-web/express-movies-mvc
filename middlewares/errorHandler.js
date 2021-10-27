import HttpError from "http-errors"
import mysql from 'mysql2';

export default {
    clientError(error, req, res, next) {
        if (error instanceof HttpError.HttpError)
            res.status(error.statusCode).json({ ERROR: error.message })
        if (error.sqlMessage == error.message)
            res.status(400).json({ ERROR: error.message })
        if (error.name === "JsonWebTokenError")
            res.status(400).json({ ERROR: error.message })
        next(error);
    },

    genericError(error, req, res, next) {
        if (res.headersSent) {
            return next(error);
        }
        res.status(error.statusCode).json({
            error: 'Se ha producido un error',
            name: 'error.name'
        })

    }
}