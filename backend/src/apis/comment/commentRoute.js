import { Router } from "express";
// middlewares
import verifyToken from "../../middleware/verifyToken.js";
import verifyUser from "../../middleware/verifyUser.js";
// controllers
import createCommentController from "./controllers/createCommentController.js";
import createReportController from "./controllers/createReportController.js";
import getCommentController from "./controllers/getCommentController.js";

const commentRoute = Router();

commentRoute
  .route("/:postId")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createCommentController)
  .get(getCommentController);

commentRoute
  .route("/reports/:commentId")
  .all(verifyToken)
  .post(verifyUser(["user", "admin"]), createReportController);

export default commentRoute;
