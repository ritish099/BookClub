import express from 'express';
import { body } from "express-validator";
import auth from "../middleware/jwtAuth.js";

const route = express.Router();

import {
    allBookController,
    addBookController
} from "../controllers/bookController.js";
import { errorHandler } from "../utils/errorHandler.js";

route.get("/all", errorHandler, allBookController);

route.post("/add",
    [
        body("ownerName").not().isEmpty().withMessage("invalid ownerName"),
        body("bookName").not().isEmpty().withMessage("invalid bookName"),
        body("subject").not().isEmpty().withMessage("invalid subject"),
        body("branch").not().isEmpty().withMessage("invalid branch"),
        body("price").not().isEmpty().withMessage("invalid price"),
        body("mrp").not().isEmpty().withMessage("invalid mrp"),
        body("author").not().isEmpty().withMessage("invalid author"),
        body("noOfPages").not().isEmpty().withMessage("invalid noOfPages")

    ], errorHandler, auth, addBookController);

export default route;