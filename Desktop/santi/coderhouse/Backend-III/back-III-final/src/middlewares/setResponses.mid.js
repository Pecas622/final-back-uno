import CustomError from "../helpers/errors/CustomError.js";
import errors from "../helpers/errors/errors.js";

const setResponses = (req, res, next) => {
    const { method, originalUrl: url } = req;
    const successResponse = (statusCode, data) => {
        const response = { response: data, method, url };
        return res.status(statusCode).json(response);
    };
    const errorResponse = (error) => CustomError.new(error);
    res.json200 = (data) => successResponse(200, data);
    res.json201 = (data) => successResponse(201, data);
    res.json400 = (message) => errorResponse(message || errors.client);
    res.json401 = (message) => errorResponse(message || errors.auth);
    res.json403 = (message) => errorResponse(message || errors.forbidden);
    res.json404 = (message) => errorResponse(message || errors.notFound);
    res.json500 = (message) => errorResponse(message || errors.fatal);
    next()
};

export default setResponses;