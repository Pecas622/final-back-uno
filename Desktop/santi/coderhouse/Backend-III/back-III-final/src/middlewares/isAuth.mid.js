import errors from "../helpers/errors/errors.js";
import { verifyToken } from "../helpers/token.helper.js";

function isAuth(req, res, next) {
    try {
        const token = req?.cookies?.token;
        if (!token) {
            const error = new Error(errors.invalid.message);
            error.statusCode = errors.invalid.statusCode;
            throw error;
        }
        const data = verifyToken(token);
        if (!data) {
            const error = new Error(errors.forbidden.message);
            error.statusCode = errors.forbidden.statusCode;
            throw error;
        }
        req.user = data;
        next();
    } catch (error) {
        next(error);
    }
}

export default isAuth;