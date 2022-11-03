import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENV = process.env.NODE_ENV || "prod";

import configDev from "./configDev.js";
import configProd from "./configProd.js";

let config = {};

if (ENV.trim() === "dev") {
    config = { ...configDev };
} else {
    config = { ...configProd };
}

export default config;