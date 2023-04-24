import express from 'express';

const router = express.Router();

import {
    newConversationController,
    getConversationController,
    getConversationTwoUserController
} from "../controllers/conversationController.js";
import { errorHandler } from "../utils/errorHandler.js";

//new conv

router.post("/", errorHandler, newConversationController);

//get conv of a user

router.get("/:userId", errorHandler, getConversationController);

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", errorHandler, getConversationTwoUserController);

export default router;