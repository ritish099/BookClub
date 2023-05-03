import express from 'express';

const router = express.Router();

import {
    addMessageController,
    getMessageController
} from "../controllers/messageController.js";

import { errorHandler } from "../utils/errorHandler.js";

//add

router.post("/", errorHandler, addMessageController);

//get

router.get("/:conversationId", errorHandler, getMessageController);

export default router;