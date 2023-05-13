import express, { Router } from "express";

const router = express.Router();

import {errorHandler} from "../utils/errorHandler.js";
import { checkout,paymentVerification } from "../controllers/paymentController.js";

router.post("/checkout", errorHandler, checkout);
router.post("payment-verification", errorHandler, paymentVerification);

export default router;

