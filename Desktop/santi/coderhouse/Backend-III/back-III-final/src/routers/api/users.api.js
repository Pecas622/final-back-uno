import { Router } from "express";
import isAuth from "../../middlewares/isAuth.mid.js"
import { readProfile, updateProfile, removeProfile } from "../../controllers/user.controller.js";

const router = Router();

router.get("/", isAuth, readProfile)
router.put("/", isAuth, updateProfile)
router.delete("/", isAuth, removeProfile)

export default router;