import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createAnnouncementController from "./controllers/createAnnouncementController.js";
import getAllAnnouncementController from "./controllers/getAllAnnouncementController.js";
import countAnnouncementController from "./controllers/countAnnouncementController.js";
import deleteAnnouncementController from "./controllers/deleteAnnouncementController.js";

const announcementRoute = Router();

announcementRoute
  .route("/")
  .post(verifyToken, verifyUser(["admin"]), createAnnouncementController)
  .get(getAllAnnouncementController);

announcementRoute.get("/count", countAnnouncementController);

announcementRoute
  .route("/:announcementId")
  .all(verifyToken)
  .delete(verifyUser(["admin"]), deleteAnnouncementController);

export default announcementRoute;
