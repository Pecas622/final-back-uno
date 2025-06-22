import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from "../dao/manager.mongo.js";
import { compareHash, createHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import errors from "../helpers/errors/errors.js";

passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email",
        },
        async (req, email, password, done) => {
            try {
                const one = await usersManager.readBy({ email });
                if (one) {
                    const error = new Error(errors.invalid.message);
                    error.statusCode = errors.invalid.statusCode;
                    throw error;
                }
                req.body.password = createHash(password);
                const user = await usersManager.createOne(req.body);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);
passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const user = await usersManager.readBy({ email });
                if (!user) {
                    const error = new Error(errors.invalid.message);
                    error.statusCode = errors.invalid.statusCode;
                    throw error;
                }
                const verifyPassword = compareHash(password, user.password);
                if (!verifyPassword) {
                    const error = new Error(errors.invalid.message);
                    error.statusCode = errors.invalid.statusCode;
                    throw error;
                }
                const token = createToken({
                    email: user.email,
                    role: user.role,
                    user_id: user._id,
                });
                req.token = token;
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

export default passport;