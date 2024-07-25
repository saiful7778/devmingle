import { Router } from "express";
import createPaymentIntentController from "./controllers/createPaymentIntentController.js";
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
import badgeUpdateController from "./controllers/badgeUpdateController.js";

const paymentRoute = Router();

paymentRoute.post(
  "/create_intent",
  verifyToken,
  verifyUser(["user", "admin"]),
  createPaymentIntentController
);

paymentRoute.patch(
  "/update_badge",
  verifyToken,
  verifyUser(["user", "admin"]),
  badgeUpdateController
);

export default paymentRoute;
