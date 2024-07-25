import { Router } from "express";
import createPaymentIntentController from "./controllers/createPaymentIntentController.js";
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";

const paymentRoute = Router();

paymentRoute.post(
  "/create_intent",
  verifyToken,
  verifyUser(["user", "admin"]),
  createPaymentIntentController
);

export default paymentRoute;
