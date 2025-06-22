import { usersManager } from "../dao/manager.mongo.js";

const readProfile = async (req, res, next) => {
    try {
        const { iat, exp, ...user } = req.user;
        return res.status(200).json({ message: "Success", response: user });
    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { user_id } = req.user;
        const data = req.body;
        const response = await usersManager.updateById(user_id, data);
        if (!response) {
            const error = new Error("Invalid data");
            error.statusCode = 400;
            throw error;
        }
        return res.status(200).json({ message: "Success", response });
    } catch (err) {
        next(err);
    }
};

const removeProfile = async (req, res, next) => {
    try {
        const { user_id } = req.user;
        const response = await usersManager.destroyById(user_id);
        if (!response) {
            const error = new Error("Invalid data");
            error.statusCode = 400;
            throw error;
        }
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        next(err);
    }
};

export { readProfile, updateProfile, removeProfile };