import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { register, login } from "../../controllers/auth.controller.js";

const router = Router();

router.post(
    "/register",
    passport.authenticate("register", { session: false }),
    register
);
router.post(
    "/login",
    passport.authenticate("login", { session: false }),
    login
);

export default router;