import express from 'express';
import { body } from "express-validator";

const route = express.Router();

import { signupController } from "../controllers/authController.js";
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

export default route;