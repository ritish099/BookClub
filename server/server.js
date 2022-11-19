import mongoose from "mongoose";
import config from "./config/config.js";

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

import app from "./app.js";

const DB = config.DB_URL.replace("<password>", config.DB_PASSWORD);

const options = {
    // autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose
    .connect(DB, options)
    .then(() => {
        console.log("database connected successfully!");
    })
    .catch((err) => console.log(err));

const port = config.PORT || 8080;
const ENV = process.env.NODE_ENV || "prod";
const server = app.listen(port, () => {
    console.log(
        `Server started on PORT: ${port} in ${ENV.trim().toUpperCase()} mode`
    );
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("Process terminated!");
    });
});