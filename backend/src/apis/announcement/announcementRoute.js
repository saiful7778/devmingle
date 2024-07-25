import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createAnnouncementController from "./controllers/createAnnouncementController.js";
import getAllAnnouncementController from "./controllers/getAllAnnouncementController.js";

const announcementRoute = Router();

announcementRoute
  .route("/")
  .all(verifyToken)
  .post(verifyUser(["admin"]), createAnnouncementController)
  .get(getAllAnnouncementController);

export default announcementRoute;
