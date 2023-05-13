import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENV = process.env.NODE_ENV || "prod";

const configDev = {
    PORT: process.env.DEV_PORT,
    DB_NAME: process.env.DEV_DB_NAME,
    DB_URL: process.env.DEV_DB_URL,
    DB_PASSWORD: process.env.DEV_DB_PASSWORD,
    EMAIL: process.env.DEV_EMAIL,
    PASSWORD: process.env.DEV_PASSWORD,
    JWT_ACTIVATE: process.env.DEV_JWT_ACTIVATE,
    EMAIL_API_KEY: process.env.DEV_EMAIL_API_KEY,
    HOST: process.env.DEV_HOST,
    SERVICE: process.env.DEV_SERVICE,
    FRONTEND_URL: process.env.DEV_FRONTEND_URL,
    SOCKET_PORT: process.env.DEV_SOCKET_PORT,
    RAZORPAY_API_KEY: process.env.DEV_RAZORPAY_API_KEY,
    RAZORPAY_API_SECRET: process.env.DEV_RAZORPAY_API_SECRET
};

export default configDev;