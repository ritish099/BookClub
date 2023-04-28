import express from "express";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import { fileURLToPath } from "url";
import path, { dirname } from "node:path";

import { globalErrorHandler } from "./src/utils/errorHandler.js";
import Message from "./src/models/Message.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import testApi from "./src/routes/testRoute.js";
import authApi from "./src/routes/authRoutes.js";
import bookApi from "./src/routes/bookRoutes.js";
import conversationApi from "./src/routes/conversationRoute.js";
import messagesApi from "./src/routes/messageRoute.js";

// app and middleware
const app = express();
app.use(cors());

app.use(helmet());
app.use(
    express.static(path.join(__dirname, "public"), {
        setHeaders: function (res, path, stat) {
            res.set("x-timestamp", Date.now().toString());
        },
    })
);
app.use(logger("dev"));
app.use(express.json({ limit: "80mb", extended: true }));
app.use(express.urlencoded({ limit: "80mb", extended: true }));

// data sanitization against NoSQL query injection
app.use(
    mongoSanitize({
        onSanitize: ({ req, key }) => {
            console.warn(`This request[${key}] is sanitized`, req);
        },
    })
);

// data sanitization against XSS
app.use(xss());

// prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            "duration",
            "ratingsQuantity",
            "ratingsAverage",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

app.use(compression());

// limit requests from same api
const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use(limiter);

app.use("/test", testApi);
app.use("/auth", authApi);
app.use("/book", bookApi);
app.use("/conversations", conversationApi);
app.use("/messages", messagesApi);

// error handling middleware
app.use(globalErrorHandler);

// 404 middleware
app.use((req, res, next) => {
    res.status(404).json({
        message: "resource not found",
    });
});


//import { createServer } from "http";
import { Server } from "socket.io";

//const httpServer = createServer();

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    console.log(users);
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    console.log(users);
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        //io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text, conversationId}) => {
      const user = getUser(receiverId);

      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

export default app;