import { Router } from "express";
import productsRouter from "./api/products.api.js";
import cartsRouter from "./api/carts.api.js";
import usersRouter from "./api/users.api.js";
import authRouter from "./api/auth.api.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

export default router;