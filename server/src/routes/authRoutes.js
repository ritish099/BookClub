import express from 'express';
import { body } from "express-validator";

const route = express.Router();

import {
    signupController,
    confirmEmailController,
    loginController,
    validateUserController,
    checkValidUserController,
    sendResetPasswordEmailController,
    resetPasswordController
} from "../controllers/authController.js";
import { errorHandler } from "../utils/errorHandler.js";

route.post("/signup",
    [
        body("userName")
            .trim()
            .isAlphanumeric()
            .isLength({ min: 3, max: 20 })
            .withMessage("minimum 3 characters and maximum 20 characters required"),
        body("firstName")
            .trim()
            .isLength({ min: 3, max: 20 })
            .withMessage("minimum 3 characters and maximum 20 characters required"),
        body("lastName")
            .trim()
            .isLength({ min: 3, max: 20 })
            .withMessage("minimum 3 characters and maximum 20 characters required"),
        body("email")
            .trim()
            .normalizeEmail()
            .isEmail()
            .withMessage("please enter valid email"),
        body("password")
            .trim()
            .isStrongPassword()
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
            .withMessage("please enter strong password"),
        body("location")
            .isLength({ min: 3, max: 20 })
            .withMessage("minimum 3 characters and maximum 20 characters required"),
    ],
    errorHandler,
    signupController
);

route.get("/verify-email/:id/:token", errorHandler, confirmEmailController);

route.post("/login",
    [
        body("email")
            .normalizeEmail()
            .isEmail()
            .withMessage("please enter valid email"),
        body("password")
            .isStrongPassword()
            .withMessage("invalid password")
    ],
    errorHandler,
    loginController
);

route.post("/validate-user", errorHandler, validateUserController);

route.post("/token-check", errorHandler, checkValidUserController);

route.post("/forget-password",
    [
        body("email")
            .normalizeEmail()
            .isEmail()
            .withMessage("please enter valid email")
    ],
    errorHandler,
    sendResetPasswordEmailController
);

route.post("/reset-password",
    [
        body("password")
            .trim()
            .isStrongPassword()
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
            .withMessage("please enter strong password")
    ],
    errorHandler,
    resetPasswordController
)

export default route;