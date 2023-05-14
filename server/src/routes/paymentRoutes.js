import express, {Router} from "express";
import {body} from "express-validator";

const route = express.Router();

import {errorHandler} from "../utils/errorHandler.js";
import {
  acceptPayment
} from "../controllers/paymentController.js";

route.post('/create-checkout-session', errorHandler, acceptPayment);

export default route;
