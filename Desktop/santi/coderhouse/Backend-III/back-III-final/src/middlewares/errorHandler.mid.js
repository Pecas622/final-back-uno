import errors from "../helpers/errors/errors.js";

const errorHandler = (err, req, res, next) => {
    console.error("🚨 Error capturado:", err);

    const { method, originalUrl: url } = req;
    const statusCode = err.statusCode || errors.fatal.statusCode;
    const message = err.message || errors.fatal.message;

    res.status(statusCode).json({
        error: message,
        method,
        url,
        timestamp: new Date().toISOString(), 
    });
};

export default errorHandler;
