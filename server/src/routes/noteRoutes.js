import express, {Router} from "express";
import {body} from "express-validator";
import auth from "../middleware/jwtAuth.js";

const route = express.Router();

import {errorHandler} from "../utils/errorHandler.js";
import { allNotesController, addNotesController } from "../controllers/notesController.js";

route.get("/all", errorHandler, allNotesController);

route.post(
  "/add",
  [
    body("ownerName").not().isEmpty().withMessage("invalid ownerName"),
    body("notesTitle").not().isEmpty().withMessage("invalid notes title"),
    body("subject").not().isEmpty().withMessage("invalid subject"),
    body("branch").not().isEmpty().withMessage("invalid branch"),
  ],
  errorHandler,
  auth,
  addNotesController
);

export default route;
