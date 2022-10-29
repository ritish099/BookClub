import { validationResult } from "express-validator";

const ENV = process.env.NODE_ENV;

// parameter errors 
const errorHandler = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(200).json({
                type: 0,
                status: false,
                message: "invalid inputs",
                errors: errors.array().map(({ msg, param }) => {
                    return {
                        msg,
                        param,
                    };
                }),
            });
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: "server error",
        });
    }
};

// logical errors
const sendErrorDev = (err, req, res) => {
    return res.status(err.statusCode).json({
        error: err,
        message: err.message,
        data: err.data,
        status: err.status,
        stack: err.stack,
    });
};

const sendErrorProd = (err, req, res) => {
    return res.status(err.statusCode).json({
        message: err.message,
        data: err.data,
        status: err.status,
    });
};

const globalErrorHandler = (err, req, res, next) => {
    console.log(err);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || false;
    err.data = err.data || [];

    if (ENV === "dev") {
        sendErrorDev(err, req, res);
    } else {
        sendErrorProd(err, req, res);
    };
};

export { globalErrorHandler, errorHandler };