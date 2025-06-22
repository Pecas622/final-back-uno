import { config } from "dotenv";
import argsv from "./arguments.helper.js";

const { mode } = argsv;

const path = ".env." + mode;
config({ path });

const env = {
    PORT: process.env.PORT,
    LINK_DB: process.env.LINK_DB,
};

export default env;