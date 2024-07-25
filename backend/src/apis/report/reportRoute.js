import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createReportController from "./controllers/createReportController.js";
import getAllReportsController from "./controllers/getAllReportsController.js";
import deleteReportController from "./controllers/deleteReportController.js";

const reportRoute = Router();

reportRoute
  .route("/:commentId")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createReportController);

reportRoute
  .route("/")
  .all(verifyToken, verifyUser(["admin"]))
  .get(getAllReportsController);

reportRoute
  .route("/admin/:reportId")
  .all(verifyToken, verifyUser(["admin"]))
  .delete(deleteReportController);

export default reportRoute;
