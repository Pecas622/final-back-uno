import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import router from "./src/routers/index.router.js";
import swaggerSpec from "./src/helpers/swagger.helper.js";
import { serve, setup } from "swagger-ui-express";

const server = express();
const port = process.env.PORT || 8080;

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(morgan("dev"));

// Documentación Swagger
server.use("/api/docs", serve, setup(swaggerSpec));

// Rutas principales
server.use("/", router);

// Middleware de manejo de errores
server.use(errorHandler);

// Inicio del servidor y conexión a la base de datos
const startServer = async () => {
    try {
        await dbConnect(process.env.MONGO_URI);
        server.listen(port, () => {
            console.log("✅ Server ready on port " + port);
        });
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
        process.exit(1); // Finaliza el proceso si falla la conexión
    }
};

startServer();
