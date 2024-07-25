import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createAnnouncementController from "./controllers/createAnnouncementController.js";
import getAllAnnouncementController from "./controllers/getAllAnnouncementController.js";
import countAnnouncementController from "./controllers/countAnnouncementController.js";

const announcementRoute = Router();

announcementRoute
  .route("/")
  .all(verifyToken)
  .post(verifyUser(["admin"]), createAnnouncementController)
  .get(getAllAnnouncementController);

announcementRoute.get("/count", countAnnouncementController);

export default announcementRoute;
