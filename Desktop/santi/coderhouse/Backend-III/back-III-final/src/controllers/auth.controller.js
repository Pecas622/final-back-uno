import { response } from "express";

const register = async (req, res, next) => {
    try {
        return res.status(201).json({ message: "Registered", response: req.user.user_id });
    } catch (err) {
        next(err);
    }
};
const login = async (req, res, next) => {
    try {
        const { token, user } = req;
        const opts = { maxAge: 60 * 60 * 24 * 7 * 1000 };
        return res
            .cookie("token", token, opts)
            .status(200)
            .json({ message: "Logged in" });
    } catch (err) {
        next(err);
    }
};

export { register, login };